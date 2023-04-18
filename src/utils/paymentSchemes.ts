import {PlanPaymentScheme, MerchantPaymentScheme} from 'types'

export const getMerchantMidCountFromPaymentSchemes = (paymentSchemesArray: MerchantPaymentScheme[]) => {
  return paymentSchemesArray?.reduce((acc, paymentScheme) => {
    return acc + paymentScheme.mids + paymentScheme.secondary_mids + paymentScheme.psimis
  }
  , 0)
}

export const getPlanMidCountFromPaymentSchemes = (paymentSchemesArray: PlanPaymentScheme[]) => {
  return paymentSchemesArray?.reduce((acc, paymentScheme) => {
    return acc + paymentScheme.count
  }
  , 0)
}
