require('dotenv').config()

import { polygon } from 'usdc'

export const bitcore = {

}

import { v4 as uuid } from 'uuid'

const bitcore_io = 'https://api.bitcore.io/api'

import axios from 'axios'

import { log } from '../../log'

import { Utxo } from '../../wallet'

import { BitcoreIoUtxo } from '../../bitcore_io'


export const rpc = {

    listUnspent: async (address: string, trace?: string): Promise<Utxo[]> => {

        trace =  trace || uuid()
 
        try {

            log.debug('bch.listUnspent.bitcore_io', { address, trace })

            if (address.match(/:/)) {
                address = address.split(':')[1]
            }

            const url = `${bitcore_io}/BCH/mainnet/address/${address}/?unspent=true`

            const response = await axios.get(url)

            const { data } = response

            log.debug('bch.listUnspent.bitcore_io.response', { address, trace, data: data })

            const utxos: BitcoreIoUtxo[] = data

            return utxos.map(utxo => {
                return {
                    scriptPubKey: utxo.script,
                    value: utxo.value,
                    txid: utxo.mintTxid,
                    vout: utxo.mintIndex
                }
            })

        } catch(error) {

            error.trace = trace

            log.error('bch.listUnspent.error', error)
            
            throw error

        }


    },

    getBalance

}

export async function getBalance(address) {

  console.log(address, 'matic.usdc.getUSDCBalance')

  try {

    const usdc_balance = await polygon.getUSDCBalance({address})

    return usdc_balance

  } catch(error) {

    console.error(error.message, `matic.getBalance.error.${address}`)
    console.error(error)

    return 0

  }

}
