import {useGetMerchantLocationLinkedMidsQuery, useGetMerchantLocationLinkedSecondaryMidsQuery} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationMids = ({skipGetLocationLinkedMids = false, skipGetLocationLinkedSecondaryMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {data: getMerchantLocationLinkedMidsResponse, isLoading: getMerchantLocationLinkedMidsIsLoading, error: getMerchantLocationLinkedMidsError} = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})

  const {data: getMerchantLocationLinkedSecondaryMidsResponse, isLoading: getMerchantLocationLinkedSecondaryMidsIsLoading, error: getMerchantLocationLinkedSecondaryMidsError} = useGetMerchantLocationLinkedSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedSecondaryMids})

  return {
    // GET Location Linked MIDs
    getMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationLinkedMidsError,
    // GET Location Linked Secondary MIDs
    getMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading,
    getMerchantLocationLinkedSecondaryMidsError,
  }
}
