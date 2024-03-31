
import { app } from 'anypay'

import config from './config'

const anypay = app(config.get('walletbot_auth_token'))

export default anypay
