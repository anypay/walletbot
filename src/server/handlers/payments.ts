
import { badRequest } from '@hapi/boom'

import { listPayments, Payment } from '../../payments'

export async function index() {

  try {

    let payments: Payment[] = await listPayments()

    return {

      payments

    }

  } catch(error) {

    const { message } = error as Error

    return badRequest(message)

  }

}
