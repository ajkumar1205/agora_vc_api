import { Elysia, t } from "elysia";
import { admin } from "./firebase";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia();

// Agora configuration - replace with your actual values
const APP_ID = process.env.APP_ID || "your_agora_app_id";
const APP_CERTIFICATE = process.env.APP_CERTIFICATE || "your_agora_app_certificate";

app.use(swagger({ path: "/" }));

app.post("/token", async ({ body, set }) => {
  try {
    const { channelName, uid, role, expireTime } = body;

    // Set role based on string input
    const agoraRole = role === "publisher" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    // Generate token (expires in 1 hour by default, or use provided expireTime)
    const expirationTimeInSeconds = expireTime || Math.floor(Date.now() / 1000) + 3600;

    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      agoraRole,
      expirationTimeInSeconds
    );

    return {
      success: true,
      token,
      uid,
      channelName,
      role,
      expireTime: expirationTimeInSeconds
    };
  } catch (error) {
    set.status = 500;
    return {
      success: false,
      error: "Failed to generate token",
      message: error as any,
    };
  }
}, {
  body: t.Object({
    channelName: t.String(),
    uid: t.Number(),
    role: t.Union([t.Literal("publisher"), t.Literal("subscriber")]),
    expireTime: t.Optional(t.Number())
  }),
  response: {
    200: t.Object({
      success: t.Boolean(),
      token: t.String(),
      uid: t.Union([t.String(), t.Number()]),
      channelName: t.String(),
      role: t.String(),
      expireTime: t.Number()
    }),
    500: t.Object({
      success: t.Boolean(),
      error: t.String(),
      message: t.String()
    })
  }
});

app.post("/call", async ({ body, set }) => {
  try {
    const { callerUid, calleeUid, channelName } = body;

    // Get callee's FCM token from Firestore using uid field
    const calleeQuery = await admin.firestore()
      .collection("users")
      .where("uid", "==", calleeUid)
      .limit(1)
      .get();

    if (calleeQuery.empty) {
      set.status = 404;
      return {
        success: false,
        error: "Callee not found"
      };
    }

    const calleeDoc = calleeQuery.docs[0];
    const calleeData = calleeDoc.data();
    const fcmToken = calleeData?.fcmToken;

    if (!fcmToken) {
      set.status = 400;
      return {
        success: false,
        error: "Callee FCM token not found"
      };
    }

    // Get caller's information for the notification using uid field
    const callerQuery = await admin.firestore()
      .collection("users")
      .where("uid", "==", callerUid)
      .limit(1)
      .get();

    const callerData = !callerQuery.empty ? callerQuery.docs[0].data() : null;
    const callerName = callerData?.displayName || callerData?.name || "Unknown User";

    // Prepare FCM message
    const message = {
      token: fcmToken,
      notification: {
        title: "Incoming video call",
        body: `${callerName} is calling you`
      },
      data: {
        type: "incoming_call",
        callerUid: callerUid,
        calleeUid: calleeUid,
        channelName: channelName,
        callerName: callerName,
        timestamp: Date.now().toString()
      },
      android: {
        priority: "high" as const,
        notification: {
          priority: "high" as const,
          defaultSound: true,
          defaultVibrateTimings: true,
          channelId: "call_notifications"
        }
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: "Incoming video call",
              body: `${callerName} is calling you`
            },
            sound: "default",
            badge: 1,
            "content-available": 1
          }
        },
        headers: {
          "apns-priority": "10"
        }
      }
    };

    // Send FCM notification
    const response = await admin.messaging().send(message);

    return {
      success: true,
      message: "Call notification sent successfully",
      fcmResponse: response,
      callDetails: {
        callerUid,
        calleeUid,
        channelName,
        callerName
      }
    };

  } catch (error) {
    console.error("Error sending call notification:", error);
    set.status = 500;
    return {
      success: false,
      error: "Failed to send call notification",
      message: error as any
    };
  }
}, {
  body: t.Object({
    callerUid: t.String(),
    calleeUid: t.String(),
    channelName: t.String()
  }),
  response: {
    200: t.Object({
      success: t.Boolean(),
      message: t.String(),
      fcmResponse: t.String(),
      callDetails: t.Object({
        callerUid: t.String(),
        calleeUid: t.String(),
        channelName: t.String(),
        callerName: t.String()
      })
    }),
    400: t.Object({
      success: t.Boolean(),
      error: t.String()
    }),
    404: t.Object({
      success: t.Boolean(),
      error: t.String()
    }),
    500: t.Object({
      success: t.Boolean(),
      error: t.String(),
      message: t.String()
    })
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);