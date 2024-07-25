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

//@ts-ignore
import { Client } from "payment-protocol"

import { log } from "../../../.."

const bitcore = {}

export { bitcore }

import * as rpc from "./rpc"

export { rpc }

interface Instruction {
  outputs: Destination[]
}

export interface PaymentRequest {
  paymentUrl: string
  instructions: Instruction[]
}

export interface BuiltPayment {
  tx_blob: string
  tx_key: string
  tx_hash: string
}

export const wallet_rpc_config: any = {}

export const wallet_rpc_url = `http://${wallet_rpc_config.host}:${wallet_rpc_config.port}/json_rpc`

export async function buildPaymentFromURL(
  paymentRequest: PaymentRequest,
): Promise<BuiltPayment> {
  let client = new Client(paymentRequest.paymentUrl)

  let result = await client.paymentRequest({
    chain: "XMR",
    currency: "XMR",
  })

  return buildPayment(result)
}

export async function buildPayment(
  paymentRequest: PaymentRequest,
): Promise<BuiltPayment> {
  let destinations = paymentRequest.instructions[0].outputs

  try {
    const transferResult = await transfer(destinations)

    let { tx_blob, tx_key, tx_hash } = transferResult

    log.info("xmr.buildPayment.result", transferResult)

    return { tx_blob, tx_key, tx_hash }
  } catch (error) {
    log.error("xmr.transfer.error", error)

    throw error
  }
}

export async function call(method: string, params: any): Promise<any> {
  console.log("__CALL", { method, params })

  let { data } = await axios.post(
    `http://localhost:18082/json_rpc`,
    {
      jsonrpc: "2.0",
      id: "0",
      method,
      params,
    } /*, {
    auth: {
      username: process.env.XMR_RPC_USER,
      password: process.env.XMR_RPC_PASSWORD
    }
  }*/,
  )

  if (data.error) {
    log.error("xmr.rpc.call.error", data.error)

    throw new Error(data.error)
  }

  if (data.result) {
    return data.result
  } else {
    return data
  }
}

interface Destination {
  address: string
  amount: number
}

export async function transfer(destinations: Destination[]) {
  let result = await call("transfer", {
    get_tx_hex: true,
    get_tx_key: true,
    get_tx_metadata: true,
    do_not_relay: true,
    unlock_time: 0,
    destinations,
  })

  return result
}
