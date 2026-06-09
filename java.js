const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.verifyAndExecuteDelete = functions.https.onCall(async (data, context) => {
  const { postId, accessKey } = data;
  
  // The actual password lives safely hidden on Google's Cloud platform
  if (accessKey !== "mmusecrets2024") {
    return { success: false, message: "Invalid credentials." };
  }

  try {
    await admin.firestore().collection('secrets').doc(postId).delete();
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
