require('dotenv').config()

import { getRPC } from './rpc'

import config from './config'

import BigNumber from 'bignumber.js'

import { getBitcore, toSatoshis } from './bitcore'

import { Invoice, Payment } from './invoice'

import { Client } from './client'

import * as blockchair from '../../blockchair'

import axios from 'axios'

export class UnsufficientFundsError extends Error {
  currency: string;
  address: string;
  paymentRequest: any;
  balance: number;
  required: number;

  constructor({
    currency,
    address,
    paymentRequest,
    balance,
    required
  }: {
    currency: string,
    address: string,
    paymentRequest: any,
    balance: number,
    required: number})
  {
    super()

    this.currency = currency;
    this.address = address;
    this.balance = balance;
    this.required = required;
    this.paymentRequest = paymentRequest

    this.message = `Insufficient ${currency} Balance of ${balance} in ${address}: ${required} required`
  }

}

var assets = require('require-all')({
  dirname  :  __dirname + '/assets',
  recursive: true,
  filter      :  /(.+)\.ts$/,
  map: (name) => name.toUpperCase()
});

const XMR = require('./assets/xmr')

import { getRecommendedFees } from './mempool.space'

export interface Utxo {
  txid: string;
  vout: number;
  value: number;
  scriptPubKey?: string;
}

interface PaymentTx {
  tx_hex: string;
  tx_hash?: string;
  tx_key?: string;
}

export interface Balance {
  asset: string;
  address: string;
  value: number;
  value_usd?: number;
}

interface LoadCard {
  asset: string;
  privatekey: string;
}

export class Wallet {
  cards: Card[]

  constructor(params: {
    cards: Card[]
  }) {
    this.cards = params.cards
  }

  static async load(cards: LoadCard[]): Promise<Wallet> {

    return new Wallet({ cards: cards.map(card => new Card(card)) })

  }

  async balances(): Promise<Balance[]> {

    let balances = await Promise.all(this.cards.map(async card => {

      if (card.asset === 'DOGE') { return }
 
      try {

        let balance = await card.balance()

        return balance

      } catch(error) {

        console.error(error)

        return null

      }

    }))

    return balances.filter(balance => balance !== null)

  }


  async payInvoice(invoice_uid: string, asset:string, {transmit}:{transmit: boolean}={transmit:true}): Promise<PaymentTx> {

    return this.payUri(`${config.get('API_BASE')}/i/${invoice_uid}`, asset, { transmit })
  }

  async payUri(uri: string, asset:string, {transmit}:{transmit: boolean}={transmit:true}): Promise<PaymentTx> {

    let client = new Client(uri)

    let paymentRequest = await client.selectPaymentOption({
      chain: asset,
      currency: asset
    })

    var payment;

    var options: any;

    if (asset === 'XMR') {

      options = await XMR.buildPayment(paymentRequest)

      payment = options.tx_blob

    } else {

      payment = await this.buildPayment(paymentRequest, asset)

    }

    if (!transmit) return payment;

    let response = await client.transmitPayment(paymentRequest, payment, options)

    return payment

  }

  asset(asset: string) {
    return this.cards.filter(card => card.asset === asset)[0]
  }

  async newInvoice(newInvoice: { amount: number, currency: string }): Promise<Invoice> {
    return new Invoice()
  }


  async buildPayment(paymentRequest, asset) {

    let { instructions } = paymentRequest

    let wallet = this.asset(asset)

    let balance = await wallet.balance()

    let bitcore = getBitcore(asset)

    let privatekey = new bitcore.PrivateKey(wallet.privatekey)

    var tx, totalInput, totalOutput = 0;

    if (asset === 'LTC') {

      let inputs = wallet.unspent.map((output: any) => {

        let satoshis = new BigNumber(output.amount).times(100000000).toNumber()

        return {
          txId: output.txid,
          outputIndex: output.vout,
          address: output.address,
          script: output.redeemScript,
          scriptPubKey: output.scriptPubKey,
          satoshis
        }
      })


      tx = new bitcore.Transaction()
        .from(inputs)
        .change(wallet.address)

    } else {

      const unspent = await Promise.all(wallet.unspent.map(async utxo => {

        if (utxo.scriptPubKey) {
          return utxo
        }

        const raw_transaction = await blockchair.getRawTx(wallet.asset, utxo.txid)

        return Object.assign(utxo, {
          scriptPubKey: raw_transaction['vout'][utxo.vout].scriptPubKey.hex,
        })
      }))

      try {

        tx = new bitcore.Transaction()
          .from(unspent.map(utxo => {
            const result = {
              txId: utxo.txid,
              outputIndex: utxo.vout,
              satoshis: utxo.value,
              scriptPubKey: utxo.scriptPubKey
            }

            return result
          }))
          .change(wallet.address)

      } catch(error) {

        console.error(error)
      }

    }

    totalInput = wallet.unspent.reduce((sum, input) => {

      let satoshis = new BigNumber(input.value).times(100000000).toNumber()

      return sum.plus(satoshis)

    }, new BigNumber(0)).toNumber()

    for (let output of instructions[0].outputs) {

      let address = bitcore.Address.fromString(output.address)

      let script = bitcore.Script.fromAddress(address)

      tx.addOutput(
        bitcore.Transaction.Output({
          satoshis: output.amount,
          script: script.toHex()
        })
      )

      totalOutput += output.amount

    }

    if (asset === 'BTC') {

      let { fastestFee } = await getRecommendedFees()

      const fee = fastestFee * tx._estimateSize()

      totalOutput  += fee;

      tx.fee(fee)

      let change = totalInput - totalOutput
      
    }

    if (totalOutput > totalInput) {

      throw new UnsufficientFundsError({
        currency: wallet.asset,
        address: wallet.address,
        paymentRequest,
        balance: totalInput,
        required: totalOutput
      })

    }

    tx.sign(privatekey)

    return tx.toString('hex')

  }


  async pay(uri: string, asset: string): Promise<Payment> {
    return new Payment()
  }

  async getInvoice(uid: string): Promise<any> {

    let { data } = await axios.get(`${config.get('API_BASE')}/invoices/${uid}`)

    return data

  }
}

export class Card {

  asset: string;
  privatekey: string;
  address: string;
  unspent: Utxo[];

  constructor(params: {
    asset: string,
    privatekey: string,
    address?: string;
  }) {
    this.unspent = []
    this.asset = params.asset
    this.privatekey = params.privatekey
    this.address = params.address

    let bitcore = getBitcore(this.asset)

    if (bitcore.PrivateKey) {
      this.address = new bitcore.PrivateKey(this.privatekey).toAddress().toString();
    }
    
  }
  
  async getUnspent() {

    const blockchairUnspent = await blockchair.listUnspent(this.asset, this.address)

    this.unspent = blockchairUnspent
  }

  async balance(): Promise<Balance> {

    const asset = this.asset

    let rpc = getRPC(this.asset)

    var value;

    if (rpc['getBalance']) {

      value = await rpc['getBalance'](this.address)

    } else {

      value = await blockchair.getBalance(this.asset, this.address)
    }

    if (rpc['listUnspent']) {

      this.unspent = await rpc['listUnspent'](this.address)

    } else {

      this.unspent = await blockchair.listUnspent(this.asset, this.address)
      
    }

    if (!value) {

      value = this.unspent.reduce((sum, output) => {

        return sum.plus(output.value)
  
      }, new BigNumber(0)).toNumber()

    }

    return {
      asset: this.asset,
      value: value,
      address: this.address
    }

  }

}

export async function loadWallet(loadCards?: LoadCard[]) {

  let cards: Card[] = []

  if (loadCards) {

    for (let loadCard of loadCards) {

      cards.push(new Card(loadCard))

    }
    
  } else {

    if (process.env.LTC_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'LTC',
        privatekey: process.env.LTC_PRIVATE_KEY
      }))
    }
  
    if (process.env.DOGE_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'DOGE',
        privatekey: process.env.DOGE_PRIVATE_KEY
      }))
    }
  
    if (process.env.DASH_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'DASH',
        privatekey: process.env.DASH_PRIVATE_KEY
      }))
    }
  
    if (process.env.BCH_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'BCH',
        privatekey: process.env.BCH_PRIVATE_KEY
      }))
    }
  
    if (process.env.BTC_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'BTC',
        privatekey: process.env.BTC_PRIVATE_KEY
      }))
    }
  
    if (process.env.BSV_PRIVATE_KEY) {
      cards.push(new Card({
        asset: 'BSV',
        privatekey: process.env.BSV_PRIVATE_KEY
      }))
    }

  }

  /*if (process.env.XMR_SIMPLE_WALLET_SEED) {
    cards.push(new Card({
      asset: 'XMR',
      privatekey: process.env.XMR_SIMPLE_WALLET_SEED
    }))
  }
  */

  if (process.env.XRP_PRIVATE_KEY) {
    cards.push(new Card({
      asset: 'XRP',
      privatekey: process.env.XRP_PRIVATE_KEY
    }))
  }

  return new Wallet({ cards })

}

