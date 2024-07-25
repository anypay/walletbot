import log from "../../log"

import { badRequest } from "@hapi/boom"

import { listBalances, Balance } from "../../balances"

export async function index() {
  try {
    let balances: Balance[] = await listBalances()

    return {
      balances,
    }

    log.debug("api.handlers.Balances.index.result", balances)
  } catch (error) {
    const { message } = error as Error

    log.error("api.handlers.Balances.index", error)

    return badRequest(message)
  }
}
