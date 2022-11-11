import {PaymentScheme} from 'types'

export const getMidCountFromPaymentSchemes = (paymentSchemesArray: PaymentScheme[]) => paymentSchemesArray?.reduce((acc, {count}) => acc + count, 0) || null
