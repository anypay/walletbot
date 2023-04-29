
import { connect, MnemonicWallet, config, log } from './'

import { listUnpaid } from './invoices'

import * as delay from 'delay'

import { loadWallet } from './simple-wallet/src'

import { shuffle } from './utils'

import axios from 'axios'

import { listBalances } from './websockets'

import { listBalances as _listBalances } from './balances'

import { start as server } from './server'

export async function start() {

  if (config.get('http_api_enabled')) {

    log.info('http_api_enabled')

    server()

  } else {

    log.info('http_api_disabled')

  }

  const token = config.get('anypay_access_token')

  if (!token) {

    log.error(`anypay_access_token config variable not set`)

    log.error(`Please visit https://anypayx.com/dashboard/apps/wallet-bot to get your token`)

    process.exit(1)

  }

  const socket = await connect(token)

  const mnemonic = config.get('wallet_bot_backup_seed_phrase')

  if (!mnemonic) {

    log.error('no wallet_bot_backup_seed_phrase config variable set')

    log.error("Please run `echo wallet_bot_backup_seed_phrase=$(npx seed-phrase) >> .env` to generate a new empty wallet")

    process.exit(1)

  }

  const { wallets } = MnemonicWallet.init(mnemonic)

  const wallet = await loadWallet(wallets)

  while (true) {

    var length = 0;

    try {

      let unpaid = await listUnpaid()

      for (let invoice of shuffle<any>(unpaid)) {
        console.log(invoice, 'unpaid')

        try {
          console.log(`${config.get('api_base')}/r/${invoice.uid}`, 'get')

          const { data: options } = await axios.get(`${config.get('api_base')}/r/${invoice.uid}`, {
            headers: {
              'Accept': 'application/payment-options',
              'X-Paypro-Version': 2
            }
          })

          if (options.paymentOptions.length > 1) {

            const result = await cancelPaymentRequest(invoice.uid, token)

            log.info('payment-request.cancelled', result)

            continue;
          }

          const {chain, currency} = options.paymentOptions[0]

          if (currency === 'XMR') {

            const result = await cancelPaymentRequest(invoice.uid, token)

            log.info('payment-request.cancelled', result)

            continue;
            
          }

          console.log('invoice.pay', options.paymentOptions[0])

          let result = await wallet.payUri(`${config.get('api_base')}/r/${invoice.uid}`, `${chain}.${currency}`)

          log.info('wallet.payInvoice.result', { uid: invoice.uid, result })

          listBalances(socket)

        } catch(error) {
          
          log.error('wallet.payInvoice.error', error.response.data)

          /*const result = await cancelPaymentRequest(invoice.uid, token)

          log.info('payment-request.cancelled', result)*/

        }

      }
    
    } catch(error) {

      log.error(error)

    }

    await delay(length > 0 ? 1000 : 5200)

  }



}

async function cancelPaymentRequest(uid: string, token: string): Promise<any> {

  const { data } = await axios.delete(`${config.get('api_base')}/r/${uid}`, {
    auth: {
      username: token,
      password: ''
    }
  }) 

  return data
}

if (require.main === module) {

  start()

}
