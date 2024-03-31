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

interface ProtocolMessage {}

export interface PaymentOptionsHeaders {
  Accept: string;
  'x-paypro-version': number;
}

export interface PaymentOption {
  chain: string;
  currency: string;
  network: string;
  estimatedAmount: number;
  requiredFeeRate: number;
  minerFee: number;
  decimals: number;
  selected: boolean;
}

export interface PaymentOptions extends ProtocolMessage {
  time: string;
  expires: string;
  memo: string;
  paymentUrl: string;
  paymentId: string;
  paymentOptions: PaymentOption[];
}

export interface SelectPaymentRequestHeaders {
  'Content-Type': string;
  'x-paypro-version': 2;
}

export interface SelectPaymentRequest extends ProtocolMessage {
  chain: string;
  currency: string;
}

export interface Output {
  amount: number;
  address: string;
}

export interface XrpOutput extends Output {
  invoiceID: string;
}

export interface UtxoInstruction {
  type: string;
  requiredFeeRate: number;
  outputs: Output[];
}

export interface XrpInstruction {
  type: string;
  outputs: XrpOutput[];
}

export type Instruction = UtxoInstruction | XrpInstruction

export interface PaymentRequest extends ProtocolMessage {
  time: string;
  expires: string;
  memo: string;
  paymentUrl: string;
  paymentId: string;
  chain: string;
  network: string;
  instructions: Instruction[];
}

export interface PaymentVerificationRequest {
  chain: string;
  currency: string;
  transactions: Transaction[];
}

export interface SendPayment {
  chain: string;
  currency: string;
  transactions: Transaction[];
}

export interface PaymentVerification {
  payment: Payment;
  memo: string;
}

export interface Transaction {
  tx: string;
  weightedSize?: number;
  tx_key?: string;
  tx_hash?: string;
}

export interface Payment {
  chain: string;
  currency: string;
  transactions: Transaction[];
}

export interface PaymentResponse {
  payment: Payment;
  memo: string;
}

