import { MnemonicWallet } from './mnemonic_wallet'

export { MnemonicWallet } from './mnemonic_wallet'

export { connect } from './websockets'

import config from './config'

import { log } from './log'

export { log } from './log'

import { loadWallet, Wallet } from './simple-wallet/src'

export { Card } from './wallet'

export { config }

export { Wallet, loadWallet }

export async function initWalletFromMnemonic(): Promise<Wallet> {

  const mnemonic = config.get('WALLETBOT_SEED_PHRASE')

  if (!mnemonic) {

    const error = new Error('no WALLETBOT_SEED_PHRASE config variable set')

    log.error('config.env.invalid', error)

    throw error

  }

  const { wallets } = MnemonicWallet.init(mnemonic)

  const wallet: Wallet = await loadWallet(wallets)

  return wallet

}