
import config from './config'

import { load as loadWallet } from './wallet'

import { log } from './log'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import * as cron from 'node-cron'

import { listUnpaid } from './invoices'

import { connect as connectWebsocket } from './socket.io'

import { listBalances } from './balances'

export async function start() {

  const wallet = await loadWallet()

  // Connect Websocket to Anypay via Socket.io
  // Will display Status = 'connected' at https://anypayx.com/apps/wallet-bot
  connectWebsocket()
  
  try {

    let balances = await listBalances()

    console.log(balances)

  } catch(error) {
 
    console.error('__list balances error', error)

  }


  cron.schedule('* * * * * ', async () => { // every minute

    let balances = await listBalances()

    console.log(balances)

    log.info('wallet.balances.update')

    log.error('wallet.balances.update.notimplemented')

  })

  cron.schedule('*/5 * * * * * ', async () => {

    let unpaid = await listUnpaid()

    log.info('invoices.unpaid.list', { count: unpaid.length })

    for (let invoice of unpaid) {

      log.info('invoice.unpaid', invoice)

    }

  })

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

}

if (require.main === module) {

  start()

}
