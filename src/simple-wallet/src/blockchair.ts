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

import axios from "axios"

import { v4 as uuid } from "uuid"

import log from "./log"

import { Balance } from "./wallet"

import config from "./config"

const currencies: {
  [key: string]: string
} = {
  BCH: "bitcoin-cash",
  BSV: "bitcoin-sv",
  BTC: "bitcoin",
  DASH: "dash",
  LTC: "litecoin",
  DOGE: "dogecoin",
}

const key = config.get("blockchair_api_key")

export class BlockchairApiError extends Error {}

export async function getAddress(coin: string, address: string) {
  const trace = uuid()

  try {
    log.debug("blockchair.api.dashboards.address", { address, coin, trace })

    const { data } = await axios.get(
      `https://api.blockchair.com/${coin.toLowerCase()}/dashboards/address/${address}`,
    )

    log.debug("blockchair.api.dashboards.address.result", { trace, data })

    return data
  } catch (err) {
    const { message } = err as any

    const error = new BlockchairApiError(message)

    log.error("blockchair.api.dashboards", error)

    throw error
  }
}

export async function getBalance(
  asset: string,
  address: string,
): Promise<Balance> {
  try {
    log.info("blockchair.getBalance", { asset, address })

    const currency: string = currencies[asset]

    const url = `https://api.blockchair.com/${currency}/dashboards/address/${address}?key=${key}`

    const response = await axios.get(url)

    const { data } = response

    log.debug("blockchair.getBalance.result", data)

    const { balance: value, balance_usd: value_usd } =
      data["data"][address]["address"]

    const utxos = data["data"][address]["utxo"]

    return {
      asset,
      address,
      value: parseFloat(value),
      value_usd: parseFloat(value_usd.toFixed(2)),
    }
  } catch (err) {
    const { message } = err as any

    const error = new BlockchairApiError(message)

    log.error("blockchair.api.getBalance.error", error)

    throw error
  }
}

export interface BlockchairUtxo {
  block_id: number
  transaction_hash: string
  index: number
  value: number
}

interface Utxo {
  txid: string
  vout: number
  value: number
}

export async function listUnspent(
  asset: string,
  address: string,
): Promise<Utxo[]> {
  try {
    log.info("blockchair.listUnspent", { asset, address })

    const currency = currencies[asset]

    const { data } = await axios.get(
      `https://api.blockchair.com/${currency}/dashboards/address/${address}?key=${key}`,
    )

    log.debug("blockchair.listUnspent.result", data)

    const utxos: BlockchairUtxo[] = data["data"][address]["utxo"]

    return utxos.map((utxo) => {
      return {
        txid: utxo.transaction_hash,
        vout: utxo.index,
        value: utxo.value,
      }
    })
  } catch (err) {
    const { message } = err as any

    const error = new BlockchairApiError(message)

    log.error("blockchair.api.listUnspent.error", error)

    throw error
  }
}

export async function getRawTx(asset: string, txid: string): Promise<any> {
  try {
    const currency = currencies[asset]

    const { data } = await axios.get(
      `https://api.blockchair.com/${currency}/raw/transaction/${txid}?key=${key}`,
    )

    log.info("blockchair.rawTx.result", { data, asset, txid })

    return data["data"][txid]["decoded_raw_transaction"]
  } catch (err) {
    const { message } = err as any

    const error = new BlockchairApiError(message)

    log.error("blockchair.api.getRawTx.error", error)

    throw error
  }
}
