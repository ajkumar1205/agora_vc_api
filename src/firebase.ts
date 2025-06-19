import fire from "firebase-admin";

const serviceAccount = JSON.parse(
    await Bun.file(import.meta.dir + "/../agora-vc-test.json").text()
);

export const admin = fire.initializeApp({
    credential: fire.credential.cert(serviceAccount)
});


