import * as fire from "firebase-admin";

const serviceAccount = JSON.parse(
    await Bun.file(import.meta.dir + "/../serviceAccountKey.json").text()
);

export const admin = fire.initializeApp({
    credential: fire.credential.cert(serviceAccount)
});


