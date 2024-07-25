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

import * as protocol from "./protocol"

import { Wallet } from "./wallet"

interface TestClientOptions {
  headers?: any
}

export class TestClient {
  url: string

  supertest: any

  headers: any

  constructor(supertest: any, url: string, options: TestClientOptions = {}) {
    this.supertest = supertest

    this.url = url

    this.headers = options.headers || {}
  }

  async getPaymentOptions(): Promise<protocol.PaymentOptions> {
    let { result } = await this.supertest.inject({
      method: "GET",
      url: this.url,
      headers: Object.assign(this.headers, {
        "x-paypro-version": 2,
        accept: "application/payment-options",
      }),
    })

    return result
  }

  async selectPaymentOption(
    params: protocol.SelectPaymentRequest,
  ): Promise<protocol.PaymentRequest> {
    let { result } = await this.supertest.inject({
      method: "POST",
      url: this.url,
      payload: params,
      headers: Object.assign(this.headers, {
        "x-paypro-version": 2,
        "content-type": "application/payment-request",
      }),
    })

    return result
  }

  async verifyPayment(
    params: protocol.PaymentVerificationRequest,
  ): Promise<protocol.PaymentVerification> {
    let { result } = await this.supertest.inject({
      method: "POST",
      url: this.url,
      payload: params,
      headers: Object.assign(this.headers, {
        "x-paypro-version": 2,
        "content-type": "application/payment-verification",
      }),
    })

    return result
  }

  async sendPayment(
    wallet: Wallet,

    params: protocol.PaymentRequest,
  ): Promise<protocol.PaymentResponse> {
    let transaction: any = await wallet.buildPayment(
      params.instructions[0].outputs as any,
      params.chain,
    )

    const payment: protocol.SendPayment = {
      chain: params.chain,

      currency: params.chain,

      transactions: [{ tx: transaction }],
    }

    let { result } = await this.supertest({
      method: "POST",
      url: this.url,
      payload: payment,
      headers: Object.assign(this.headers, {
        "x-paypro-version": 2,
        "content-type": "application/payment",
      }),
    })

    return result
  }
}
