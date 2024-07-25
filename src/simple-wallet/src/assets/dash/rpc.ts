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
import axios from "axios"

export interface UTXO {
  txid: string
  vout: number
  address: string
  account: string
  scriptPubKey: string
  amount: number
  confirmations: number
  spendable: boolean
  solvable: boolean
  safe: boolean
}

interface RpcOptions {
  url: string
  username?: string
  password?: string
}

export class RpcClient {
  url: string
  username: string
  password: string

  constructor(params: RpcOptions) {
    this.url = params.url
    this.username = String(params.username || process.env.DASH_RPC_USER)
    this.password = String(params.password || process.env.DASH_RPC_PASSWORD)
  }

  async listUnspent(address: string): Promise<UTXO[]> {
    let method = "listunspent"

    let params = [0, 9999999, [`${address}`]]

    let response = await axios.post(
      this.url,
      { method, params },
      {
        auth: {
          username: this.username,
          password: this.password,
        },
      },
    )

    return response.data.result
  }
}
