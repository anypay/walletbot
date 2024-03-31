![](https://doge.bitcoinfiles.org/ea8205469186c12f6b23866d3ef50ab84f6f6b82dab43075e0229ab32ca6f5bc)

# Wallet Bot

Self-custody, headless wallet service that runs as a daemon process within your data center. It manages your software operation's private keys so that your apps can securely send payments on any peer to peer payments network.

## Installation and Setup

The application runs as a long-running process which should be managed by k8s, docker, or your system service manager such as systemd or similar. It may be run in a node.js environment or as an isolated docker container. The single process requires no additional services such as database servers to be run.

## Installation with Homebrew for Mac (AMD64 and x86_64)

```
> brew tap anypay/walletbot
> brew install walletbot
```

```
> walletbot
Usage: walletbot [options] [command]

Options:
  -V, --version                     output the version number
  -s --seed-phrase <seed_phrase>    seed phrase for wallet bot
  -t --auth-token <auth_token>  anypay token for wallet bot
  -h, --help                        display help for command

Commands:
  start
  seed-phrase
  help [command]                    display help for command
```

### Generating a 12-Word Seed Phrase

```
> walletbot seed-phrase
```

### Starting Wallet Bot

```
> walletbot start \
  --seed-phrase="replace this with your twelve word seed phrase to start sending payments" \
  --auth-token=replacewith-your-anypay-apiauthtoken
```

### Configuring with Environment Variables
In the same terminal shell tab or shell script first export the required environment variables,
then you can run walletbot without providing the equivalent command line arguments.

```
export walletbot_seed_phrase="replace this with your twelve word seed phrase to start sending payments"
export walletbot_auth_token=replacewith-your-anypay-apiauthtoken

walletbot start
```

## Running in Nodejs (Typescript)

```
import { WalletBot } from '@anypay/walletbot'

const walletBot = new WalletBot({
  seed_phrase: "replace this with your twelve word seed phrase to start sending payments",
  auth_token: "replacewith-your-anypay-apiauthtoken"
})

walletBot.start()

```

### Running with Docker

`docker run anypay/walletbot`

## Testing

To run tests run `npm run test`

## Development

To commit new code run `npm run commit`


