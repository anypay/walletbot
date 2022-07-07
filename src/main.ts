
import config from './config'

import { log } from './log'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import * as cron from 'node-cron'

import { listUnpaid } from './invoices'

export async function start() {

  cron.schedule('* * * * * ', () => { // every minute

    log.info('wallet.balances.update')
    log.error('wallet.balances.update.notimplemented')

  })

  cron.schedule('*/5 * * * * * ', async () => {

    let unpaid = await listUnpaid()

    console.log(unpaid)

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

  log.error('profit.required', { amount: 'more' })

}

if (require.main === module) {

  start()

}
