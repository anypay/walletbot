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
  -t --anypay-token <anypay_token>  anypay token for wallet bot
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
  --seed-phrase="$SEED_PHRASE" \
  --anypay-token=$ANYPAY_API_TOKEN
```

## Running in Nodejs (Typescript)

```
import { WalletBot } from '@anypay/walletbot'

const walletBot = new WalletBot({
  seed_phrase: process.env.WALLET_BOT_BACKUP_SEED_PHRASE,
  anypay_token: process.env.ANYPAY_ACCESS_TOKEN
})

walletBot.start()

```

### Running with Docker

`docker run anypay/walletbot`

## Testing

To run tests run `npm run test`

## Development

To commit new code run `npm run commit`


