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

import { program } from "commander"

import { loadWallet } from "../wallet"

//@ts-ignore
import * as btc from "bitcore-lib"
//@ts-ignore
import { Client } from "payment-protocol"

program.command("balances").action(async () => {
  try {
    let wallet = await loadWallet()

    let balances = await wallet.balances()

    console.log({ balances })
  } catch (error) {
    console.error(error)
  }
})

program.command("balance <asset>").action(async (asset) => {
  try {
    let wallets = await loadWallet()

    let wallet = wallets.asset(asset)

    let balance = await wallet.balance()

    console.log({ balance })
  } catch (error) {
    console.error(error)
  }
})

program.command("payuri <uri> <asset>").action(async (invoice_uid, asset) => {
  try {
    let wallet = await loadWallet()

    let payment = await wallet.payUri(invoice_uid, asset, { transmit: true })

    console.log({ payment })
  } catch (error) {
    console.error(error)
  }
})

program
  .command("pay <invoice_uid> <asset>")
  .action(async (invoice_uid, asset) => {
    try {
      let wallet = await loadWallet()

      let payment = await wallet.payInvoice(invoice_uid, asset)

      console.log({ payment })
    } catch (error) {
      console.error(error)
    }
  })

program
  .command("buildpayment <invoice_uid> <asset>")
  .action(async (invoice_uid, asset) => {
    try {
      let wallet = await loadWallet()

      let payment = await wallet.payInvoice(invoice_uid, asset, {
        transmit: false,
      })
      console.log({ payment })
    } catch (error) {
      console.error(error)
    }
  })

program
  .command("receive <value> <currency>")
  .action(async (value, currency) => {
    try {
      let wallet = await loadWallet()

      /*let invoice = await wallet.receive({
        currency, value
      })

      console.log({ invoice })
      */
    } catch (error) {
      console.error(error)
    }
  })

program
  .command("paymentrequest <uri> <currency>")
  .action(async (uri, currency) => {
    let client: any = new Client(uri)

    try {
      let { paymentOptions } = await client.getPaymentOptions()

      let paymentRequest = await client.selectPaymentOption({
        chain: currency,
        currency: currency,
      })

      console.log(JSON.stringify(paymentRequest))
    } catch (error) {
      console.error(error)
    }
  })

program.parse(process.argv)
