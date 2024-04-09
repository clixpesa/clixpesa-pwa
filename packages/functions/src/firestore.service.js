const admin = require('firebase-admin');

async function addUserData(userData) {
  console.log('Adding User Data');
  if (!userData.uid || !userData.token) {
    throw new Error('User Data is incomplete');
  }
  try {
    await admin.firestore()
      .collection('Users')
      .doc(userData.uid)
      .set({ token: userData.token, wallet: userData.wallet});
  } catch (error) {
    console.log('Error adding user data', error);
  }
}

async function getUserData(uid) {
  console.log('Getting User Data');
  if (!uid) {
    throw new Error('User ID is required');
  }
  try {
    const user = await admin.firestore()
      .collection('Users')
      .doc(uid)
      .get();
    return user.data();
  } catch (error) {
    console.log('Error getting user data', error);
  }
}

module.exports = {  addUserData, getUserData };