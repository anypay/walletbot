
import * as dash from '@dashevo/dashcore-lib';

export { dash as bitcore }

import axios from 'axios'

const insight = 'https://insight.dash.org/insight-api'

import { Utxo } from '../../wallet'

interface InsightUtxo {
    address: string;
    txid: string;
    vout: number;
    scriptPubKey: string;
    amount: number;
    satoshis: number;
    height: number;
    confirmations: number;
}

export const rpc = {

    listUnspent: async (address: string): Promise<Utxo[]> => {

        const response = await axios.get(`${insight}/addr/${address}/utxo`)

        const utxos: InsightUtxo[] = response.data

        return utxos.map(utxo => {
            return {
                scriptPubKey: utxo.scriptPubKey,
                value: utxo.satoshis,
                txid: utxo.txid,
                vout: utxo.vout
            }
        })

    },

    getBalance: async (address) => {

        const utxos: Utxo[] = await rpc.listUnspent(address)

        return utxos.reduce((sum, utxo) => {

            return sum + utxo.value

        }, 0)
        
    }
}

