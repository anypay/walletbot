
const bip39 = require('bip39');

import * as btc from 'bitcore-lib'

import * as dash from '@dashevo/dashcore-lib'

import * as doge from 'dogecore-lib'

import * as ltc from 'litecore-lib'

import * as bch from 'bitcore-lib-cash'

import * as bsv from 'bsv'

export class MnemonicWallet {

    mnemonic: SelectionMode;

    btchdprivatekey: btc.HDPrivateKey;

    dashhdprivatekey: dash.HDPrivateKey;

    bsvhdprivatekey: bsv.HDPrivateKey;

    ltchdprivatekey: ltc.HDPrivateKey;

    dogehdprivatekey: doge.HDPrivateKey;

    bchhdprivatekey: bch.HDPrivateKey;


    constructor(mnemonic) {
  
      this.mnemonic = mnemonic

      this.init()
  
    }
  
    init() {
  
      const seed = bip39.mnemonicToSeedSync(this.mnemonic).toString('hex')
  
      this.btchdprivatekey = btc.HDPrivateKey.fromSeed(seed)
  
      this.dashhdprivatekey = dash.HDPrivateKey.fromSeed(seed)
  
      this.bsvhdprivatekey = bsv.HDPrivateKey.fromSeed(seed)
  
      this.ltchdprivatekey = ltc.HDPrivateKey.fromSeed(seed)
  
      this.dogehdprivatekey = doge.HDPrivateKey.fromSeed(seed)

      this.bchhdprivatekey = bch.HDPrivateKey.fromSeed(seed)
  
    }
  
    get wallets() {
  
      const wallets = [{
        currency: 'BTC',
        address: this.btchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.btchdprivatekey.privateKey.toWIF()
      }, {
        currency: 'DASH',
        address: this.dashhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dashhdprivatekey.privateKey.toWIF()
      }, {
        currency: 'BSV',
        address: this.bsvhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.bsvhdprivatekey.privateKey.toWIF()
      }, {
        currency: 'LTC',
        address: this.ltchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.ltchdprivatekey.privateKey.toWIF()
      }, {
        currency: 'DOGE',
        address: this.dogehdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dogehdprivatekey.privateKey.toWIF()
      }]
  
      return wallets
    }
  
  }
  