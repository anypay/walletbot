
import { models } from '../../models'

import { logError } from '../logger'

import * as uuid from 'uuid'

import { Keypair, PublicKey } from '@solana/web3.js'

import { SolanaPayment } from './payment'

import Ajv from "ajv"

import { getAssociatedTokenAddress } from '@solana/spl-token'

const SPL_TOKENS = {
  'USDC': 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  'USDT': 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'
}

const ajv = new Ajv()

interface Output {
  currency: string;
  amount: number;
  address: string;
}

const outputSchema = {
  type: "object",
  properties: {
    currency: {type: "string", nullable: false},
    amount: {type: "number", nullable: false},
    address: {type: "string", nullable: false}
  },
  required: ["currency", "amount", "address"]
}

const outputsSchema = {
  type: "array",
  minItems: 1,
  items: outputSchema
}

const validateOutput = ajv.compile(outputSchema)
const validateOutputs = ajv.compile(outputsSchema)

export class SolanaPaymentRequestValidationError extends Error {
  name = 'solana.paymentrequest.validation.error'
}

export class SolanaPaymentRequest {

  record: any;
  order: any;

  get uid(): string {
    return this.record.uid
  }
  get order_id(): number {
    return this.record.order_id
  }
  get status(): string {
    return this.record.status
  }
  get txid(): string {
    return this.record.txid
  }
  get memo(): string {
    return this.record.memo
  }
  get outputs(): Output[] {
    return this.record.outputs
  }

  constructor(record, order) {
    this.record = record
    this.order = order
  }

  static async create(params) {

    var order;

    let uid = Keypair.generate().publicKey.toBase58()

    if (!params.memo) {
      throw new SolanaPaymentRequestValidationError('memo must be provided as a string')

    }

    if (!validateOutputs(params.outputs)) {

        const error = new SolanaPaymentRequestValidationError(`outputs ${validateOutputs.errors[0].message}`)

        logError(error.name, error.message)

        throw error
    }

    if (params.order_id) {
      order = models.Order.findOne({ where: { id: params.order_id }})

      if (!order) {
        throw new Error(`order ${params.order_id} not found`)
      }
    }

    let record = await models.SolanaPaymentRequest.create(Object.assign(params, { uid }))

    return new SolanaPaymentRequest(record, order)
  }

  static async forOrder(order): Promise<SolanaPaymentRequest> {

    let record = await models.SolanaPaymentRequest.findOne({
      where: { order_id: order.id }
    })

    if (record) {

      return new SolanaPaymentRequest(record, order)

    } else {

      let product = await models.Product.findOne({ where: { product_id: order.product_id }})

      if (!product) { throw new Error(`Product ${order.product_id} not found`) }

      return SolanaPaymentRequest.create({
        outputs: [{
          address: 'Ef9ca7Uwkw9rrbdaWnUrrdMZJqPYykZ1dPLEv9yMpEjB',  // steven phantom
          amount: order.amount,
          currency: 'USDC'
        }],
        order_id: order.id,
        memo: `$${order.amount} ${product.details.name} Gift Card from Paypow.com`
      })

    }

  }

  async validatePayment(payment: SolanaPayment): Promise<boolean> {

    if (!payment.doesReference(this.uid)) {

      console.log(`payment does not reference ${this.uid}`)
      return false

    } else {
      console.log(`payment does reference ${this.uid}`)

    }

    for (let output of this.outputs) {

      let splToken = new PublicKey(SPL_TOKENS[output.currency])

      let tokenAddress = await getAssociatedTokenAddress(splToken, new PublicKey(output.address))

      if (!payment.includesOutput(tokenAddress.toBase58(), output.amount)) { return false }

    }

    return true

  }

  async markAsPaid(): Promise<void> {

    this.record.status = 'paid'

    await this.record.save()

  }

  toJSON() {
    return {
      uid: this.uid,
      status: this.status,
      outputs: this.outputs,
      order_id: this.order_id,
      memo: this.memo
    }
  }

}

