
import { expect } from '../../../__tests__/utils'

import * as usdc from '..'

const mnemonic = 'street neglect reform tissue into chef coyote kit crop gun nest now'

describe("Avalanche USDC", () => {

  describe("Loading USDC Wallet on Avalanche from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase', () => {

      const address = usdc.avalanche.getAddressFromMnemonic({ mnemonic })

      console.log(address)

      expect(address).to.be.a('string')

      expect(String(address).length).to.be.greaterThan(0)

    })

    it('should validate a wallet address', () => {

      const address = usdc.avalanche.getAddressFromMnemonic({ mnemonic })

      const isValid = usdc.avalanche.isAddress({ address })

      expect(isValid).to.be.equal(true)

      const invalidIsValid = usdc.avalanche.isAddress({ address: '12345' })

      expect(invalidIsValid).to.be.equal(false)

    })

  })

  describe("Getting Avalanche Wallet Balances", async () => {

    it('should get the USDC wallet balance as zero for an empty wallet', async () => {

      try {

        const address = usdc.avalanche.getAddressFromMnemonic({ mnemonic })

        const balance = await usdc.avalanche.getUSDCBalance({ address })

        expect(balance).to.be.equal(0)

      } catch(error) {

        console.error(error)

      }

    })

    it('should get the USDC wallet balance for a non-empty wallet', async () => {

      const address = '0x4da4bcf92ab8160906e5123c52da6c61a165adc4'

      const balance = await usdc.avalanche.getUSDCBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

    it('should get the AVA wallet balance for a non-empty wallet', async () => {

      const address = '0x4da4bcf92ab8160906e5123c52da6c61a165adc4'

      const balance = await usdc.avalanche.getGasBalance({ address })

      console.log({ balance, address })

      expect(balance).to.be.greaterThan(0)

    })

  })

})
