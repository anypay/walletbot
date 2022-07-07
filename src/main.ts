
import config from './config'

import { log } from './log'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'

import * as cron from 'node-cron'

export async function start() {

  cron.schedule('* * * * * ', () => { // every minute

    log.info('wallet.balances.update')
    log.error('wallet.balances.update.notimplemented')

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
