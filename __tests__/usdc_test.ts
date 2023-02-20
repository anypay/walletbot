
import * as usdc from '../src/usdc'

import { expect } from './utils'

describe("Sending USDC Payments", () => {

  describe("Sending USDC Payment on Polygon", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the MATIC balance by paying for gas') 

  })

  describe("Sending USDC Payment on Tron", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the TRON balance by paying for gas') 

  })

  describe("Sending USDC Payment on Ethereum", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the ETH balance by paying for gas') 

  })

  describe("Sending USDC Payment on Solana", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the SOL balance by paying for gas') 

  })

  describe("Sending USDC Payment on Bitcoin", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the satoshi balance by paying for gas') 

  })

})

describe("Loading USDC Wallets", () => {

  describe("Loading USDC Wallet on Polygon from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase')

  })

  describe("Loading USDC Wallet on Tron from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase')

  })


  describe("Loading USDC Wallet on Ethereum from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase')

  })

  describe("Loading USDC Wallet on Solana from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase')

  })

  describe("Loading USDC Wallet on Bitcoin from Seed Phrase", () => {

    it('should return the wallet address given a mnemonic phrase')

  })

})

describe("Getting USDC Balances", () => {

  describe('Getting USDC Balance for Polgyon Wallet', () => {

    it('#getBalance should get the USDC balance and MATIC gas balance', async () => {

      const address = usdc.polygon.newRandomAddress()

      const balance: number = await usdc.polygon.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Tron Wallet', () => {

    it('#getBalance should get the USDC balance and TRON gas balance', async () => {

      const address = usdc.tron.newRandomAddress()

      const balance: number = await usdc.tron.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Hedera Wallet', () => {

    it('#getBalance should get the USDC balance and HBAR gas balance', async () => {

      const address = await usdc.hedera.newRandomAddress()

      const balance: number = await usdc.hedera.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Solana Wallet', () => {

    it('#getBalance should get the USDC balance and SOL gas balance', async () => {

      const address = await usdc.solana.newRandomAddress()

      const balance: number = await usdc.solana.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Stellar Wallet', () => {

    it('#getBalance should get the USDC balance and XLM gas balance', async () => {

      const address = await usdc.stellar.newRandomAddress()

      const balance: number = await usdc.stellar.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Flow Wallet', () => {

    it('#getBalance should get the USDC balance and FLOW gas balance', async () => {

      const address = await usdc.flow.newRandomAddress()

      const balance: number = await usdc.flow.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Ethereum Wallet', () => {

    it('#getBalance should get the USDC balance and ETH gas balance', async () => {

      const address = await usdc.ethereum.newRandomAddress()

      const balance: number = await usdc.ethereum.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Algorand Wallet', () => {

    it('#getBalance should get the USDC balance and ALGO gas balance', async () => {

      const address = await usdc.algorand.newRandomAddress()

      const balance: number = await usdc.algorand.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

  describe('Getting USDC Balance for Avalanche Wallet', () => {

    it('#getBalance should get the USDC balance and AVA gas balance', async () => {

      const address = await usdc.avalanche.newRandomAddress()

      const balance: number = await usdc.avalanche.getUSDCBalance({ address })

      expect(balance).to.be.a('number')

      expect(balance).to.be.equal(0)

    })

  })

})

describe("Creating USDC Payment Requests", () => {

  describe("Creating Anypay Payment Request for all 4 USDC options", () => {

    it('should generate a valid pay: protocol payment request url')

  })

  describe("Creating Anypay Payment Request for USDC on Polygon", () => {

    describe("Single Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

    describe("Multi Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

  })

  describe("Creating Anypay Payment Request for USDC on Tron", () => {

    describe("Single Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

    describe("Multi Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

  })

  describe("Creating Anypay Payment Request for USDC on Solana", () => {

    describe("Single Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

    describe("Multi Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

  })

  describe("Creating Anypay Payment Request for USDC on Ethereum", () => {

    describe("Single Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

    describe("Multi Ouptut Payment Request", () => {

      it('should not allow for multiple outputs in one transaction')

    })

  })

  describe("Creating Anypay Payment Request for USDC on Bitcoin", () => {

    describe("Single Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

    describe("Multi Ouptut Payment Request", () => {

      it('should generate a valid pay: protocol payment request url')

    })

  })

})

