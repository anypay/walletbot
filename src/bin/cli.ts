#!/usr/bin/env ts-node

require('dotenv').config()

const { Command } = require('commander');

const program = new Command();

const { version } = require('../../package')

/*import config from '../config'

import log from '../log'
*/

//import { listBalances } from '../balances'
/*

import { createInvoice } from '../invoices'

import { start } from '../main'

import { existsSync, writeFileSync } from 'fs'

import { getBitcore } from '../wallet'


*/

import axios from 'axios'

import { initWalletFromMnemonic } from '..'

program
  .version(version)

program
  .command('start')
  .action(async () => {

    //start()
  console.log('start')

  })

program
  .command('list-addresses')
  .action(async () => {

    //console.log('list-addresses')
    //let balances = await listBalances()

    let wallet = await initWalletFromMnemonic()

    console.log(wallet)

    let balances = await wallet.balances()

    console.log(balances)

  })

program
  .command('pay-invoice <uid> <chain> <currency>')
  .action(async (uid, chain, currency) => {


    let wallet = await initWalletFromMnemonic()

    console.log(wallet)

    //let balances = await wallet.balances()

    //console.log(balances)

    let result = await wallet.payInvoice(uid, `${chain}.${currency}`)

    console.log(result)

  })



program
  .command('list-address-balance-history')
  .action(async () => {

    //start()
  console.log('start')

  })

program
  .command('add-payment')
  .option('--chain <string>')
  .option('--currency <string>')
  .option('--uri <uri>')
  .action(async () => {

    //start()
  console.log('add-payment', program)

  })

program
  .command('start')
  .action(async () => {

    //start()
  console.log('start')

  })
/*

program
  .command('balances')
  .action(async () => {

    try {

      const wallet = await initWalletFromMnemonic()

      let balances = await wallet.balances()

      console.log(balances)

      process.exit(0)

    } catch(error) {

      log.error('cli.listbalances', error)

      process.exit(1)

    }

  })

program
  .command('payinvoice <uri> <currency>')
  .action(async (uri, currency) => {

    try {

      const wallet = await initWalletFromMnemonic()

      //await wallet.balances

      const result = await wallet.payUri(uri, currency)

      console.log(result)

    } catch(error) {

      console.error(error)

    }

  })

program
  .command('balance <currency>')
  .action(async (currency) => {

    console.log(`show ${currency} balance`)

    const wallet = await initWalletFromMnemonic()

    console.log(wallet.balances)

    process.exit(0)

  })

program
  .command('newinvoice')
  .requiredOption('-c, --currency <currency>', 'coin to collect')
  .requiredOption('-a, --address <address>', 'crypto receiving address')
  .requiredOption('-v, --value <value>', 'amount to collect', (value) => parseFloat(value))
  .option('-d, --denomination <currency>', 'base currency for value ie USD, EUR, JPY, BRL', 'USD')
  .action(async (options) => {

    const { currency ,address, value, denomination } = options

    const invoice = await createInvoice({

      currency, address, value, denomination

    })

    console.log(invoice)

    process.exit(0)

  })



import { connect } from '../socket.io'

program
  .command('socket.io [token]')
  .action(async (token) => {

    try {

      let socket = await connect(token)

    } catch(error) {

      console.log('error', error)

    }

  })



program
  .command('new_wallet [filepath]')
  .action((filepath) => {


    const json = {
      "anypay_api_token": config.get('anypay_api_token'),
      "cards": [{
        "asset": "BSV",
        "privatekey": getBitcore('BSV').PrivateKey().toWIF()
      }, {
        "asset": "BTC",
        "privatekey": getBitcore('BTC').PrivateKey().toWIF()
      }, {
        "asset": "BCH",
        "privatekey": getBitcore('BCH').PrivateKey().toWIF()
      }, {
        "asset": "DASH",
        "privatekey": getBitcore('DASH').PrivateKey().toWIF()
      }, {
        "asset": "LTC",
        "privatekey": getBitcore('LTC').PrivateKey().toWIF()
      }, {
        "asset": "DOGE",
        "privatekey": getBitcore('DOGE').PrivateKey().toWIF()
      }]
    }

    if (filepath) {

      if (existsSync(filepath)) {

        console.error(`file at ${filepath} already exists`)

        process.exit(1)

      }

      writeFileSync(filepath, JSON.stringify(json, null, 2))

      console.log(`New wallet config json written to ${filepath}`)

    } else {

      console.log(JSON.stringify(json, null, 2))

    }

    process.exit(0)

  })
*/

program.parse(process.argv)

