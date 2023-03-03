
require('dotenv').config()

import axios from "axios"

export async function getTransaction(txid: string): Promise<any> {

    const url = `https://api.covalenthq.com/v1/avalanche-mainnet/transaction_v2/${txid}/`

    const { data } = await axios.get(url, {
        auth: {
            username: String(process.env.covalent_api_key),
            password: ''
        }
    })

    return data

}