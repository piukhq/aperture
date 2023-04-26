import {PlanPaymentScheme, MerchantPaymentScheme} from 'types'
import {DirectoryNavigationTab} from 'utils/enums'

export const getMerchantMidCountFromPaymentSchemes = (paymentSchemesArray: MerchantPaymentScheme[]) => {
  return paymentSchemesArray?.reduce((acc, paymentScheme) => {
    return acc + paymentScheme.mids + paymentScheme.secondary_mids + paymentScheme.psimis
  }
  , 0)
}

export const getMerchantEntityCountFromPaymentSchemes = (entity: DirectoryNavigationTab, paymentSchemesArray: MerchantPaymentScheme[]) => {
  const correctlyCasedEntity = entity === DirectoryNavigationTab.SECONDARY_MIDS ? 'secondary_mids' : entity // Might warrant its own Enum at some point

  return paymentSchemesArray?.reduce((acc, paymentScheme) => {
    return acc + paymentScheme[correctlyCasedEntity]
  }
  , 0)
}

export const getPlanMidCountFromPaymentSchemes = (paymentSchemesArray: PlanPaymentScheme[]) => {
  return paymentSchemesArray?.reduce((acc, paymentScheme) => {
    return acc + paymentScheme.count
  }
  , 0)
}
