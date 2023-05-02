
/* Before running this program ensure you have intialized a new node.js
   program and installed the dotenv and anypay npm packages:

   $ mkdir my-payments-proejct
   $ cd my-payments-project
   $ npm init -f
   $ npm install --save anypay dotenv

  Then once you have installed these dependencies, create a main.js file
  with the contents of this file, then execute 'node main.js' to run it.
*/

require('dotenv').config()

const { app } = require('anypay')

async function main() {
  /*
   * First get the wallet bot api key from your anypay account dashboard
   *
   * https://anypayx.com/apps/wallet-bot/
   *
   * Then set that in your .env file using your text editor or by running:
   * $ echo anypay_access_token=PASTE_YOUR_ACCESS_TOKEN
   *
  */

  const anypay = app({
    // Here you provide the Anypay API key from your wallet bot dashboard.
    apiKey: process.env.anypay_access_token
  })


  // Make sure you only request a single payment option, using this format:
  let paymentRequest = await anypay.request({

    chain: 'MATIC',

    currency: 'USDC',

    // For testing purposes simply set the address as your own
    address: '0xA77547a3fB82a5Fa4DB408144870B69c70906989',

    amount: 5.00

  }, {

    webhook_url: 'https://api.next.anypayx.com/api/v1/webhooks'

  })
  // The above function will add a payment for $5 USDC to your wallet bot'
  //  queue of outgoing payments, and will be sent in order received.

  console.log(paymentRequest)

  process.exit(0)

}

main()

