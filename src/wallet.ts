
import { loadWallet, getBitcore } from './simple-wallet/src'

export { getBitcore } 

export var wallet;

var isLoading = false

import config from './config'

export async function load() {

  const cards = config.get('cards')

  if (cards) {

    return loadWallet(cards)

  } else {

    return loadWallet()

  }

}

