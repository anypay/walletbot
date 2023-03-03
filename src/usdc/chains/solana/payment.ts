
import * as _ from 'underscore'

import { Connection, SystemInstruction, TransactionInstruction, Transaction, PublicKey, sendAndConfirmRawTransaction } from '@solana/web3.js'

import { establishConnection } from './establishConnection'

import { decodeTransferInstruction, decodeInstruction } from '@solana/spl-token'

import { BigNumber } from 'bignumber.js'

interface Output {
  address: string;
  currency: string;
  amount: number;
}

const TOKEN_PROGRAM = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
const SYSTEM_PROGRAM = '11111111111111111111111111111111'

const SPL_TOKENS = {
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
  'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': 'USDT'
}

export class SolanaPayment {

  buffer: Buffer;
  transaction: Transaction;
  record: any;
  txid: string;

  constructor(hex: string) {

    this.buffer = Buffer.from(hex, 'hex')

    this.transaction = Transaction.from(this.buffer)

  }

  static fromHex(hex: string): SolanaPayment {

    return new SolanaPayment(hex)

  }

  doesReference(reference: string): boolean {

    return this.references.map(ref => ref.toBase58()).includes(reference)

  }

  includesOutput(address: string, amount: number): boolean {

    let outputs = this.outputs.filter(output => {
      return output.address === address && output.amount === amount
    })

    return outputs.length === 1

  }

  get outputs(): Output[] {

    //@ts-ignore
    return this.transfers.map(instruction => {

      let program = instruction.programId.toString()

      if (program === TOKEN_PROGRAM) {

        let {data}: any = decodeInstruction(instruction)

        if (data.instruction != 12) { return } // not transfer instruction

        let [source, mint, address] = instruction.keys.map(key => {
          return key.pubkey.toBase58()
        })

        let currency = SPL_TOKENS[mint]

        let decimals = new BigNumber(Math.pow(10, -1*data.decimals))

        let amount = new BigNumber(Number(data.amount)).times(decimals).toNumber()

        console.log({ source, mint, address, currency, amount})

        return { source, mint, address, currency, amount }

      } else {

        return null
      }

    })
    .filter(output => output !== null && output !== undefined)

  }

  get transfers(): TransactionInstruction[] {

    return this.transaction.instructions.filter(instruction => {
  
      let program = instruction.programId.toString()

      if (program === SYSTEM_PROGRAM) {

        let instructionType = SystemInstruction.decodeInstructionType(instruction)

        return instructionType === 'Transfer';

      } else if (program === TOKEN_PROGRAM) {

        return true

      } else {

        false;

      }

    })

  }

  get references(): PublicKey[] {

    let instructions: any[] = this.transaction.instructions.map(instruction => {

      return instruction.keys.filter(key => {

        return !key.isWritable && !key.isSigner

      }).map(key => {

        return key.pubkey

      })

    })

    return _.flatten(instructions)

  }

  async sendAndConfirm(): Promise<string> {

    console.log('solana.payment.sendandconfirm', {transaction: this.buffer.toString('hex')})

    let connection: Connection = await establishConnection()

    let txid = await sendAndConfirmRawTransaction(connection, this.buffer)

    console.log('solana.payment.confirmed', {txid})

    this.txid = txid

    return txid

  }
 
}

