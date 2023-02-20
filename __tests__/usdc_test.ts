
describe("Sending USDC Payments", () => {

  describe("Sending USDC Payment on Polygon", () => {

    it('sending 1 USDC should reduce the USDC balance by 1') 

    it('#buildPayment should output a signed txhex but not transmit it') 

    it('sending 1 USDC should reduce the MATIC balance by paying for gas') 

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

    it('#getBalance should get the USDC balance and MATIC gas balance')

  })

  describe('Getting USDC Balance for Solana Wallet', () => {

    it('#getBalance should get the USDC balance and SOL gas balance')

  })

  describe('Getting USDC Balance for Ethereum Wallet', () => {

    it('#getBalance should get the USDC balance and ETH gas balance')

  })

  describe('Getting USDC Balance for Bitcoin Wallet', () => {

    it('#getBalance should get the USDC balance and bits gas balance')
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

