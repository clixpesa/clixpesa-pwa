import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase.config';

const usersRef = collection(firestore, 'Users');

export async function getUserWallet() {
  console.log('Getting User Wallet');
  try {
    const user = await getDoc(doc(usersRef, auth.currentUser.uid));
    return user.data().wallet;
  } catch (error) {
    console.log('Error getting user wallet', error);
  }
}

export async function getUserToken() {
  console.log('Getting User Token');
  try {
    //const user = await firestore().collection('Users').doc(auth.currentUser.uid).get();
    const user = await getDoc(doc(usersRef, auth.currentUser.uid));
    return user.data().token;
  } catch (error) {
    console.log('Error getting user token', error);
  }
}
