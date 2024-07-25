import { app } from "anypay"

import config from "./config"

const anypay = app(config.get("WALLETBOT_AUTH_TOKEN"))

export default anypay
