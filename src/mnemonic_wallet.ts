
import { ethers } from 'ethers'


const bip39 = require('bip39');

import * as btc from 'bitcore-lib'

import * as dash from '@dashevo/dashcore-lib'

import * as doge from 'bitcore-lib-doge'

import * as ltc from 'litecore-lib'

import * as bch from 'bitcore-lib-cash'

import * as bsv from 'bsv'

export class MnemonicWallet {

    mnemonic: string;

    btchdprivatekey: any;//btc.HDPrivateKey;

    dashhdprivatekey: any;//dash.HDPrivateKey;

    bsvhdprivatekey: any;//bsv.HDPrivateKey;

    ltchdprivatekey: any;//ltc.HDPrivateKey;

    dogehdprivatekey: any;//doge.HDPrivateKey;

    bchhdprivatekey: any;//bch.HDPrivateKey;

    ethersWallet: any;

    matic_privatekey: any;

    ethereum_privatekey: any;

    avalanche_privatekey: any;

    static init(mnemonic: string): MnemonicWallet {

      let wallet = new MnemonicWallet(mnemonic)

      wallet.init()

      return wallet

    }

    constructor(mnemonic) {
  
      this.mnemonic = mnemonic

      this.init()
  
    }
  
    init() {
  
      const seed = bip39.mnemonicToSeedSync(this.mnemonic).toString('hex')

      console.log(seed, 'SEED')
  
      this.btchdprivatekey = btc.HDPrivateKey.fromSeed(seed)
  
      this.dashhdprivatekey = dash.HDPrivateKey.fromSeed(seed)
  
      this.bsvhdprivatekey = bsv.HDPrivateKey.fromSeed(seed)
  
      this.ltchdprivatekey = ltc.HDPrivateKey.fromSeed(seed)
  
      this.dogehdprivatekey = doge.HDPrivateKey.fromSeed(seed)

      this.bchhdprivatekey = bch.HDPrivateKey.fromSeed(seed)

      this.ethersWallet = ethers.Wallet.fromMnemonic(this.mnemonic);

      return this
  
    }
  
    get wallets() {
  
      const wallets = [{
        asset: 'BTC',
        address: this.btchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.btchdprivatekey.privateKey.toWIF()
      }, {
        asset: 'BCH',
        address: this.bchhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.bchhdprivatekey.privateKey.toWIF()
      }, {
        asset: 'DASH',
        address: this.dashhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dashhdprivatekey.privateKey.toWIF()
      }, {
        asset: 'BSV',
        address: this.bsvhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.bsvhdprivatekey.privateKey.toWIF()
      }, {
        asset: 'LTC',
        address: this.ltchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.ltchdprivatekey.privateKey.toWIF()
      }, {
        asset: 'DOGE',
        address: this.dogehdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dogehdprivatekey.privateKey.toWIF()
      }, {
        asset: 'MATIC',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'ETH',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'AVAX',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'MATIC.USDC',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'ETH.USDC',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'AVAX.USDC',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'MATIC.USDT',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'ETH.USDT',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }, {
        asset: 'AVAX.USDT',
        address: this.ethersWallet.address,
        privatekey: this.ethersWallet
      }]
  
      return wallets
    }
  
  }
  
