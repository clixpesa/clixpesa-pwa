import { Wallet } from 'ethers';
import { DERIVATION_PATH } from '../config';

let pendingWallet = null;

export async function generateWalletFromMnemonic(mnemonic) {
  const wallet = Wallet.fromMnemonic(mnemonic, DERIVATION_PATH);
  pendingWallet = {
    address: wallet.address,
    mnemonic: wallet.mnemonic.phrase,
  };
  console.log('Pending wallet set', pendingWallet.address);
}

export async function getPendingWallet() {
  pending = pendingWallet;
  pendingWallet = null;
  return pending;
}
