
import { Mnemonic } from "@hashgraph/sdk";

/**
 * 
 * Hedera Hashgraph Resources:
 *
 * - https://app.lworks.io/api-access-tokens
 * - https://docs.hedera.com/hedera/sdks-and-apis/sdks/tokens/transfer-tokens
 *
 */


/**
 * Fetches the token balances from a Hedera blockchain provider. It is designed to support
 * native assets on Hedera, specificially USDC.
 *
 */
export async function getTokenBalance(params: {address: string, asset: string}): Promise<number> {

  let balance: number = 0

  return balance; // TODO: Actually get balance

}

/** 
 * # USD Coin (Hedera Asset) (USDC)
 *
 * USD Coin is astablecoin brought to you by Circle and Coinbase. It is issued by regulated and licensed financial institutions that maintain full reserves of the equivalent fiat currency.
 *
 * Hedera is an institutional-grade public network that’s built for processing large transaction volumes with incredible speed and low costs — with greater energy efficiency than other blockchains. It’s handled more than 1.6 billion in transactions and grown to more than 410,000 accounts since its launch in 2018. With governance input from major global companies, extremely low carbon usage and native access to the leading dollar digital currency, Hedera is poised to continue its strong growth.
 *
 * The token id for USDC on Hedera is 0.0.456858 and more information may be
 * found on the [Hedera USDC Blockchain
 * Explorer](https://app.dragonglass.me/hedera/tokens/0.0.456858)
 *
 * - https://app.dragonglass.me/hedera/tokens/0.0.456858
 * - https://www.circle.com/en/usdc-multichain/hedera
 * - https://hedera.com/users/usdc
 *
 */
export async function getUSDCBalance(params: {address: string}): Promise<number> {

  return getTokenBalance({
    asset: '0.0.456858',
    address: params.address
  })

}

/**
 * Fetches the HBAR balance from a Hedera blockchain provider. 
 *
 */
export async function getGasBalance(params: {address: string}): Promise<number> {

  let balance: number = 0;

  return balance; // TODO: Actually get balance

}

export async function newRandomAddress(): Promise<string> {
    // generate a 24-word mnemonic
    const mnemonic = await Mnemonic.generate();

    console.log(`mnemonic = ${mnemonic.toString()}`);

    // convert to a new root key
    const rootKey = await mnemonic.toEd25519PrivateKey();

    // derive index #0
    // WARN: don't hand out your root key
    const key = await rootKey.derive(0);

    console.log(`private key = ${key.toString()}`);
    console.log(`public key = ${key.publicKey.toString()}`);

    return ''
}


