#!/usr/bin/env ts-node

require('dotenv').config()

const { version } = require('../../package')

import config from '../config'

import log from '../log'

import { program } from 'commander'

import { listBalances } from '../balances'

import { start } from '../main'

import { existsSync, writeFileSync } from 'fs'

import { getBitcore } from '../wallet'

program
  .version(version)
  .option('--config <path>')
  .option('--host <ipaddress>')
  .option('--port <integer>')
  .option('--prometheus_enabled <boolean>')
  .option('--amqp_enabled <boolean>')
  .option('--http_api_enabled <boolean>')
  .option('--swagger_enabled <boolean>')
  .option('--postgres_enabled <boolean>')
  .option('--database_url <connection_string>')
  .option('--amqp_url <connection_string>')
  .option('--amqp_exchange <name>')
  .option('--amqp_enabled <boolean>')

program
  .command('start')
  .action(async () => {

    start()

  })



program
  .command('balances')
  .action(async () => {

    try {

      let balances = await listBalances()

      console.log(balances)

      process.exit(0)

    } catch(error) {

      log.error('cli.listbalances', error)

      process.exit(1)

    }

  })

program
  .command('balance <currency>')
  .action((currency) => {

    console.log(`show ${currency} balance`)

    process.exit(0)

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


program.parse(process.argv)

