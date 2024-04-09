const { httpsCallable } = require('firebase/functions');
const { functions, auth } = require('./firebase.config');
const { signInWithCustomToken } = require('firebase/auth');

const checkUserByPhone = httpsCallable(functions, 'checkUserByPhone')
const createUserToken = httpsCallable(functions, 'createUserToken')
const createUser = httpsCallable(functions, 'createUser')
const updateUserToken = httpsCallable(functions, 'updateUserToken')
const createUserWallet = httpsCallable(functions, 'createUserWallet')
const importUserWallet = httpsCallable(functions, 'importUserWallet')



// createUserWallet({
//   uid: '12345',
//   passcode: "123456"
// }).then((result) => console.log(result.data));

importUserWallet({
  uid: '12345',
  mnemonic: "join exile know annual emotion chaos raw grain virtual legend link addict neutral access deer ozone scrub then mixture march profit zebra smooth churn",
  passcode: "12367"
}).then((result) => console.log(result.data));



//loginUser()
//createUser().then((result) => console.log(result.data));
//updateUserToken().then((result) => console.log(result.data));}