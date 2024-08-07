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
}

export class RpcClient {
  url: string

  constructor(params: RpcOptions) {
    this.url = params.url
  }

  async listUnspent(address: string): Promise<UTXO[]> {
    let method = "listunspent"

    //let params = [0, 9999999, `["${address}"]`]
    let params = [0, 9999999, [address]]

    let { data } = await axios.post(
      this.url,
      { method, params },
      {
        auth: {
          username: String(process.env.BSV_RPC_USER),
          password: String(process.env.BSV_RPC_PASSWORD),
        },
      },
    )

    return data.result
  }
}

export async function listUnspent(address: string): Promise<Utxo[]> {
  var confirmed: any, unconfirmed: any

  try {
    const result = await axios.get<{
      address: string
      script: string
      result: {
        height: number
        tx_pos: number
        tx_hash: string
        value: number
      }[]
    }>(
      `https://api.whatsonchain.com/v1/bsv/main/address/${address}/confirmed/unspent`,
    )

    confirmed = result.data.result
  } catch (error) {
    confirmed = []
  }

  try {
    const result = await axios.get<{
      result: {
        hex: string
        tx_pos: number
        tx_hash: string
        value: number
      }[]
    }>(
      `https://api.whatsonchain.com/v1/bsv/main/address/${address}/unconfirmed/unspent`,
    )

    unconfirmed = result.data.result
  } catch (error) {
    unconfirmed = []
  }

  return [
    ...confirmed.map((utxo: { tx_hash: any; tx_pos: any; value: any }) => {
      return {
        txid: utxo.tx_hash,
        vout: utxo.tx_pos,
        value: utxo.value,
        confirmed: true,
        spendable: true,
      }
    }),
    ...unconfirmed.map((utxo: { tx_hash: any; tx_pos: any; value: any }) => {
      return {
        txid: utxo.tx_hash,
        vout: utxo.tx_pos,
        value: utxo.value,
        confirmed: false,
        spendable: true,
      }
    }),
  ]
  // TODO: Replace RUN here with TAAL or other
  /*const utxos: RunUtxo[]  = await run.blockchain.utxos(address)

  return utxos.map(utxo => {
    return {
      txid: utxo.txid,
      vout: utxo.vout,
      value: utxo.satoshis,
      scriptPubKey: utxo.script
    }
  })
  */
}

import { Utxo } from "../../wallet"

export async function getBalance(address: string): Promise<number> {
  const utxos: Utxo[] = await listUnspent(address)

  return utxos.reduce((sum, { value }) => sum + value, 0)
}
