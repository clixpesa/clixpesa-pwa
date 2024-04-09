const  Crypto = require('crypto-js');
const { SALT } = require('../functions.config.js');

function encryptData(data, passcode) {
  const saltedPasscode = saltyPasscode(passcode);
  return Crypto.AES.encrypt(data, saltedPasscode).toString();
}

function decryptDataWpasscode(encryptedData, passcode) {
  const saltedPasscode = saltyPasscode(passcode);
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), saltedPasscode);
  return bytes.toString(Crypto.enc.Utf8);
}
function encryptDataWToken(data, token) {
  return Crypto.AES.encrypt(data, token).toString();
}

function decryptDataWtoken(encryptedData, token) {
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), token);
  return bytes.toString(Crypto.enc.Utf8);
}

function saltyPasscode(passcode) {
  return Crypto.PBKDF2(passcode, SALT, { keySize: 8 }).toString();
}

module.exports = {
  encryptData,
  decryptDataWpasscode,
  encryptDataWToken,
  decryptDataWtoken,
  saltyPasscode
}
