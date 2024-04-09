const { Wallet, utils } = require('ethers');
const { DERIVATION_PATH } = require('../functions.config');

let pendingWallet = null;
async function generateWallet() {
  const entropy = utils.randomBytes(32);
  const mnemonic = utils.entropyToMnemonic(entropy);
  const wallet = Wallet.fromMnemonic(mnemonic, DERIVATION_PATH);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
  //console.log('Pending wallet set');
}

async function generateWalletFromMnemonic(mnemonic) {
  const wallet = Wallet.fromMnemonic(mnemonic, DERIVATION_PATH);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
  //console.log('Pending wallet set');
}

 function getPendingWallet() {
  const pending = pendingWallet;
  pendingWallet = null; // clear the pending wallet on read
  return pending;
}

module.exports = {
  generateWallet,
  generateWalletFromMnemonic,
  getPendingWallet,
};