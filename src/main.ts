
import { connect, MnemonicWallet, config, log } from './'

import { listUnpaid } from './invoices'

import * as delay from 'delay'

import { loadWallet } from './simple-wallet/src'

import { shuffle } from './utils'

import axios from 'axios'
import { listBalances } from './websockets'

export async function start() {

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

    log.error("Please run `docker run wallet-bot seed-phrase` to generate a new empty wallet")

    process.exit(1)

  }

  const { wallets } = new MnemonicWallet(mnemonic)

  //const card: Card = wallets.filter(wallet => wallet.currency === 'DASH').filter(w => !!w)[0]

  const wallet = await loadWallet()

  while (true) {

    try {

      let unpaid = await listUnpaid()

      log.debug('invoices.unpaid.list', { count: unpaid.length })

      for (let invoice of shuffle<any>(unpaid)) {

        try {

          const { data: options } = await axios.get(`${config.get('api_base')}/r/${invoice.uid}`, {
            headers: {
              'Accept': 'application/payment-options',
              'X-Paypro-Version': 2
            }
          })

          if (options.paymentOptions.length > 1) {

            /*
            const result = await cancelPaymentRequest(invoice.uid, token)

            console.log('payment-request.cancelled', result)

            continue;
            */
            
          }

          const currency = options.paymentOptions[0].currency

          log.info('invoice.pay', options.paymentOptions[0])

          let result = await wallet.payUri(`https://api.anypayx.com/r/${invoice.uid}`, currency)

          log.info('wallet.payInvoice.result', { uid: invoice.uid, result })

          listBalances(socket)

        } catch(error) {

          console.log("wallet.payInvoice.error", error.message)

          log.error('wallet.payInvoice.error', error)

          const result = await cancelPaymentRequest(invoice.uid, token)

          console.log('payment-request.cancelled', result)

        }

      }
    
    } catch(error) {

      log.error(error)

    }

    await delay(5000)

  }

}

async function cancelPaymentRequest(uid: string, token: string): Promise<any> {

  const { data } = await axios.delete(`https://api.anypayx.com/r/${uid}`, {
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
