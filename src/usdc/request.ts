
import * as moment from 'moment'

interface PaymentRequest {
  time: Date;
  expires: Date;
  memo: string;
  paymentUrl: string;
  paymentId: string;
  paymentOptions: {
    chain: string;
    currency: string;
    network: string;
    estimatedAmount: number;
    requiredFeeRate: number;
    minerFee?: number;
    decimals?: number;
    selected?: boolean;
  }[]
}

type PaymentRequestTemplate = {
  chain: string;
  currency: string;
  to: {
    address: string;
    amount: number;
  }[];
}[]

interface PaymentOptionSelected {
  instructions: {
    type: 'transaction',
    value: number,
    to: string;
    data: string;
    gasPrice?: number;
  }[];
}

export async function create({ template }:{ template: PaymentRequestTemplate}): Promise<PaymentRequest> {

  const time = new Date()
  const expires = moment().add(15, 'minutes').toDate()
  const memo = ''
  const paymentUrl = ''
  const paymentId = ''

  const paymentOptions = template.map(option => {
    return {
      requiredFeeRate: 1,
      estimatedAmount: option.to.reduce((sum, to) => sum + to.amount, 0),
      chain: option.chain,
      currency: option.currency,
      network: 'main'
    }
  })

  return {
    time,
    expires,
    memo,
    paymentUrl,
    paymentId,
    paymentOptions
  }

}
