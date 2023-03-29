import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

export const createUserDoc = functions.auth.user().onCreate((user) => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
