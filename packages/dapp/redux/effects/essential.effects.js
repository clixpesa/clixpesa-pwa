import { login, setHasAccount, setUserToken } from '../slices/essential.slice';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from '../../firebase.config';
import { getUserToken, getUserWallet } from '../../services/firestore.service';
import { saltyPasscode } from '../../utils';
import { getPendingWallet } from '../../services/wallet.service';

export const essentialListeners = (startListening) => {
  startListening({
    actionCreator: setUserToken,
    effect: async (action, listenerApi) => {
      const { code, state } = action.payload;
      console.log('Token:', code, state);
      if (state === 'create') {
        //create user account

        const userUID = listenerApi.getState().essential.userDetails.uid;
        const createUserWallet = httpsCallable(functions, 'createUserWallet');
        const result = await createUserWallet({ uid: userUID, passcode: code });
        if (result.data.message === 'Wallet created') {
          console.log('Wallet created:', result.data.wallet);
          console.log(auth.currentUser);
          listenerApi.dispatch(
            login({
              uid: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              phone: auth.currentUser.phoneNumber,
            }),
          );
          listenerApi.dispatch(setHasAccount({ state: true, address: result.data.wallet }));
        }
      } else if (state === 'import') {
        console.log('Importing wallet');
        const userUID = listenerApi.getState().essential.userDetails.uid;
        const wallet = await getPendingWallet();
        const importUserWallet = httpsCallable(functions, 'importUserWallet');
        const result = await importUserWallet({
          uid: userUID,
          mnemonic: wallet.mnemonic,
          passcode: code,
        });
        console.log('Import result:', result);
        if (result.data.message === 'Wallet imported') {
          console.log('Wallet imported:', result.data.wallet);
          listenerApi.dispatch(
            login({
              uid: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              phone: auth.currentUser.phoneNumber,
            }),
          );
          listenerApi.dispatch(setHasAccount({ state: true, address: result.data.wallet }));
        }
      } else if (state === 'change') {
        //change token and encryption
      } else {
        //login user account
        const userWallet = await getUserWallet();
        listenerApi.dispatch(
          login({
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName,
            phone: auth.currentUser.phoneNumber,
          }),
        );
        listenerApi.dispatch(setHasAccount({ state: true, address: userWallet.address }));
      }
    },
  });
};
