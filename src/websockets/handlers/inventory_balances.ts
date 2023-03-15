
import { Socket } from 'socket.io-client'

import { listBalances, updateAddressBalance } from '../../balances'

import { log } from '../../log'


export default async function (socket: Socket, json?: any) {

    log.info(`wallet-bot.websocket.handlers.inventory.balances`, json)

    const balances = await listBalances()

    for (let balance of balances) {

        log.info('wallet-bot.balance', balance)

        try {

            await updateAddressBalance({
                address: balance.address,
                currency: balance.asset,
                chain: balance.asset,
                balance: balance.value
            })

        } catch(error) {

            log.error('wallet-bot.updateAddressBalance.error', error)
        }


    }

    socket.emit('inventory.balances', balances)

    return balances

}
