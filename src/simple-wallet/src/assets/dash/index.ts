#!/usr/bin/env ts-node
/*
    This file is part of Wallet Bot: https://github.com/anypay/walletbot
    Copyright (c) 2022 Anypay Inc, Steven Zeiler

    Permission to use, copy, modify, and/or distribute this software for any
    purpose  with  or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE  SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH  REGARD  TO  THIS  SOFTWARE  INCLUDING  ALL  IMPLIED  WARRANTIES  OF
    MERCHANTABILITY  AND  FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY  SPECIAL ,  DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER  RESULTING  FROM  LOSS  OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION  OF  CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
//==============================================================================
import { log } from '../../log'

import { v4 as uuid } from 'uuid'

//@ts-ignore
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

    listUnspent: async (address: string, trace?: string): Promise<Utxo[]> => {

        trace =  trace || uuid()

        log.debug('dash.listUnspent.insight', { address, trace })

        const response = await axios.get(`${insight}/addr/${address}/utxo`)

        log.debug('dash.listUnspent.insight.response', { address, trace, data: response.data })

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

    getBalance: async (address: string) => {

        const trace = uuid()

        log.debug('dash.getBalance', { address, trace })

        const utxos: Utxo[] = await rpc.listUnspent(address, trace)

        return utxos.reduce((sum, utxo) => {

            return sum + utxo.value

        }, 0)
        
    }
}

