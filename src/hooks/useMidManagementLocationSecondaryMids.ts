import {useGetMerchantLocationLinkedMidsQuery, useGetMerchantLocationLinkedSecondaryMidsQuery, usePostMerchantLocationLinkedSecondaryMidMutation} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationSecondaryMids = ({skipGetLocationLinkedMids = false, skipGetLocationLinkedSecondaryMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {data: getMerchantLocationLinkedMidsResponse, isLoading: getMerchantLocationLinkedMidsIsLoading, error: getMerchantLocationLinkedMidsError} = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})

  const {data: getMerchantLocationLinkedSecondaryMidsResponse, isLoading: getMerchantLocationLinkedSecondaryMidsIsLoading, error: getMerchantLocationLinkedSecondaryMidsError} = useGetMerchantLocationLinkedSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedSecondaryMids})

  const [
    postMerchantLocationLinkedSecondaryMid,
    {
      isSuccess: postMerchantLocationLinkedSecondaryMidIsSuccess,
      isLoading: postMerchantLocationLinkedSecondaryMidIsLoading,
      error: postMerchantLocationLinkedSecondaryMidError,
      reset: resetPostMerchantLocationLinkedSecondaryMidResponse},
  ] = usePostMerchantLocationLinkedSecondaryMidMutation({fixedCacheKey: 'postMerchantLocationLinkedSecondaryMid'})


  return {
    // GET Location Linked MIDs
    getMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationLinkedMidsError,
    // GET Location Linked Secondary MIDs
    getMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading,
    getMerchantLocationLinkedSecondaryMidsError,
    // POST Location Linked Secondary MID
    postMerchantLocationLinkedSecondaryMid,
    postMerchantLocationLinkedSecondaryMidIsSuccess,
    postMerchantLocationLinkedSecondaryMidIsLoading,
    postMerchantLocationLinkedSecondaryMidError,
    resetPostMerchantLocationLinkedSecondaryMidResponse,
  }
}
