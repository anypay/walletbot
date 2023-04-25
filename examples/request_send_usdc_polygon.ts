#!/usr/bin/env ts-node

require('dotenv').config()

import axios from 'axios'

import { polygon } from 'usdc'

const uid = 'eALM2Kd5m'

export async function main() {

  const destination = '0x029b705658D7De7c98176F0290cd282a0b9D1486'

  const { data } = await axios.post(`https://api.anypayx.com/v1/api/apps/wallet-bot/invoices`, {
    currency: 'USDC',
    chain: 'MATIC',
    to: {
      address: destination,
      amount: 0.05,
      currency: 'USD'
    } 
  }, { 
    auth: {
      username: process.env.walletbot_api_key,
      password: ''
    }
  })


  console.log(data, 'walletbot.invoice.created')

  const { data: option } = await axios.post(`https://api.next.anypayx.com/r/${uid}`, {
  //const { data: option } = await axios.post(`https://api.next.anypayx.com/r/${data.invoice_uid}`, {
    chain: 'MATIC',
    currency: 'USDC'
  }, {
    headers: {
      'content-type': 'application/payment-request'
   }
  })

  console.log(option, 'paymentRequest')

  const { amount, address } = option.instructions[0].outputs[0]

  console.log({ amount, address }, 'output')

  const {txhex, txid } = await polygon.buildUSDCTransfer({
    mnemonic: process.env.wallet_bot_backup_seed_phrase,
    amount,
    to: address,
    transmit: false
  })

  console.log({ txhex, txid })
  
  const { data: paymentResponse } = await axios.post(`https://api.next.anypayx.com/r/${uid}`, {
  //const { data: paymentResponse } = await axios.post(`https://api.next.anypayx.com/r/${data.invoice_uid}`, {
    transactions: [{
      tx: txid
    }],
    currency: 'USDC',
    chain: 'MATIC'
  }, {
    headers: {
      'content-type': 'application/payment'
    }
  })

  console.log(paymentResponse)

}

main()

