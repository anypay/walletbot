
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider = require("@truffle/hdwallet-provider")

// install web3 plugin
use(Web3ClientPlugin);

var initialized = false;

export const posClient = new POSClient();

export async function getPosClient({ mnemonic, address }: {mnemonic?: string, address: string}) {

    if (!initialized) {  

        await posClient.init({
            network: 'mainnet',
            version: 'v1',
            parent: {
              provider: new HDWalletProvider({
                mnemonic,
                providerOrUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
              }),
              defaultConfig: {
                from : address
              }
            },
            child: {
              provider: new HDWalletProvider({
                mnemonic
              }),
              defaultConfig: {
                from : address
              }
            }
        })

        initialized = true

    }

    return posClient

}
