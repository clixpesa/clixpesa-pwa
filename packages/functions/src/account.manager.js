const functions = require('firebase-functions');
const { getAuth } = require('firebase-admin/auth');
const { saltyPasscode, encryptData, decryptDataWtoken, encryptDataWToken } = require('../utils/encryption');
const { generateWallet, generateWalletFromMnemonic } = require('./wallet.service');
const { addUserData, getUserData } = require('./firestore.service');


//const auth = require('firebase-admin/auth');

exports.checkUserByPhone = functions.https.onCall(async (phoneNo) => {
  console.log('checkUserByPhone', phoneNo);
  try {
    const user = await getAuth().getUserByPhoneNumber(phoneNo)
    console.log('Successfully fetched user data:', user.uid);
    return {
      user: user,
      message: 'User found'
    }
  }catch (error) {
    return {
      message: 'User not found',
      error: error }
  }
})

exports.createUserWallet = functions.https.onCall( async (params) => {
  console.log('createUserWallet', params.uid, params.passcode);
  
  try {
    const wallet = await generateWallet();
    const token = saltyPasscode(params.passcode);
    const enWallet = {
      address: wallet.address,
      enPrivateKey: encryptData(wallet.privateKey, params.passcode),
      enMnemonic: encryptData(wallet.mnemonic, params.passcode)
    }
    await addUserData({token: token, wallet: enWallet, uid: params.uid});
    console.log('Successfully created a wallet:', params.uid);
    return {
      wallet: wallet.address,
      message: 'Wallet created'
    }
  }catch (error) {
    return {
      message: 'Wallet not created',
      error: error }
  }
})

exports.importUserWallet = functions.https.onCall( async (params) => {
  console.log('importUserWallet', params.uid, params.mnemonic, params.passcode);
  
  try {
    const token = saltyPasscode(params.passcode);
    const wallet = await generateWalletFromMnemonic(params.mnemonic);
    
    const enWallet = {
      address: wallet.address,
      enPrivateKey: encryptData(wallet.privateKey, params.passcode),
      enMnemonic: encryptData(wallet.mnemonic, params.passcode)
    }
    await addUserData({token: token, wallet: enWallet, uid: params.uid});
    console.log('Successfully imported a wallet:', params.uid);
    return {
      wallet: wallet.address,
      message: 'Wallet imported'
    }
  }catch (error) {
    return {
      message: 'Wallet not imported',
      error: error }
  }
})


exports.updateUserToken = functions.https.onCall(async (params) => {
  console.log('updateUserToken', params.uid, params.passcode);
  try {
    const data = await getUserData(params.uid);
    
    const newToken = saltyPasscode(params.passcode);
    const wallet = {
      address: data.wallet.address,
      privateKey: decryptDataWtoken(data.wallet.enPrivateKey, data.token),
      mnemonic: decryptDataWtoken(data.wallet.enMnemonic, data.token)
    }
    const enWallet = {
      address: wallet.address,
      enPrivateKey: encryptDataWToken(wallet.privateKey, newToken),
      enMnemonic: encryptDataWToken(wallet.mnemonic, newToken)}

    addUserData({token: newToken, wallet: enWallet, uid: params.uid});
    console.log('Successfully updated user data:', params.uid);
    return {

      message: 'User data updated'
    }

  }
  
  catch (error) {
    console.log('Error updating user data:', error);
    return {
      message: 'User data not updated',
      error: error
    };
  }
})


  