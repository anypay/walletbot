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

import { Currency, Currencies } from "./currency"

import config from "./config"

import BigNumber from "bignumber.js"

export interface Balance {
  currency: Currency

  amount: number
}

export async function convertBalance(
  balance: Balance,
  currency: Currency,
): Promise<Balance> {
  const api = config.get("api_base")

  if (balance.currency === Currencies.Satoshis) {
    balance.amount = new BigNumber(balance.amount)
      .dividedBy(100000000)
      .toNumber()

    balance.currency = Currencies.BSV
  }

  let { data } = await axios.get(
    `${api}/convert/${balance.amount}-${balance.currency}/to-${currency}`,
  )

  let amount = data.conversion.output.value

  return {
    amount,

    currency,
  }
}
