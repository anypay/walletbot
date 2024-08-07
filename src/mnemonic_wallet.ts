import * as bip39 from "bip39"
//@ts-ignore
import * as btc from "bitcore-lib"
//@ts-ignore
import * as dash from "@dashevo/dashcore-lib"
//@ts-ignore
import * as doge from "bitcore-lib-doge"
//@ts-ignore
import * as ltc from "litecore-lib"
//@ts-ignore
import * as bch from "bitcore-lib-cash"

import { bsv } from "scrypt-ts"

export class MnemonicWallet {
  mnemonic: string

  btchdprivatekey: any //btc.HDPrivateKey;

  dashhdprivatekey: any //dash.HDPrivateKey;

  bsvhdprivatekey: any //bsv.HDPrivateKey;

  ltchdprivatekey: any //ltc.HDPrivateKey;

  dogehdprivatekey: any //doge.HDPrivateKey;

  bchhdprivatekey: any //bch.HDPrivateKey;

  static init(mnemonic: string): MnemonicWallet {
    let wallet = new MnemonicWallet(mnemonic)

    wallet.init()

    return wallet
  }

  constructor(mnemonic: string) {
    this.mnemonic = mnemonic

    this.init()
  }

  init() {
    const seed = bip39.mnemonicToSeedSync(this.mnemonic).toString("hex")

    this.btchdprivatekey = btc.HDPrivateKey["fromSeed"](seed)

    this.dashhdprivatekey = dash.HDPrivateKey.fromSeed(seed)

    this.bsvhdprivatekey = bsv.HDPrivateKey.fromSeed(seed, bsv.Networks.livenet)

    this.ltchdprivatekey = ltc.HDPrivateKey.fromSeed(seed)

    this.dogehdprivatekey = doge.HDPrivateKey.fromSeed(seed)

    this.bchhdprivatekey = bch.HDPrivateKey.fromSeed(seed)

    return this
  }

  get wallets() {
    const wallets = [
      {
        asset: "BTC",
        address: this.btchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.btchdprivatekey.privateKey.toWIF(),
      },
      {
        asset: "BCH",
        address: this.bchhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.bchhdprivatekey.privateKey.toWIF(),
      },
      {
        asset: "DASH",
        address: this.dashhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dashhdprivatekey.privateKey.toWIF(),
      },
      {
        asset: "BSV",
        address: this.bsvhdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.bsvhdprivatekey.privateKey.toWIF(),
      },
      {
        asset: "LTC",
        address: this.ltchdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.ltchdprivatekey.privateKey.toWIF(),
      },
      {
        asset: "DOGE",
        address: this.dogehdprivatekey.privateKey.toAddress().toString(),
        privatekey: this.dogehdprivatekey.privateKey.toWIF(),
      },
    ]

    return wallets
  }
}
