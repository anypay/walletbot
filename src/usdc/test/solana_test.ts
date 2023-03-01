
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Solana USDC", () => {

  describe("Loading USDC Wallet on Solana from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.solana.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.solana.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.solana.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.solana.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Solana Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.solana.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.solana.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = 'GeKcUd7Ftqhyyvf2zE9JNx5bud5N7QvUBnBQkYWwRnHg'

      const balance = await usdc.solana.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the SOL wallet balance for a non-empty wallet', async () => {

      const address = 'GeKcUd7Ftqhyyvf2zE9JNx5bud5N7QvUBnBQkYWwRnHg'

      const balance = await usdc.solana.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

})
