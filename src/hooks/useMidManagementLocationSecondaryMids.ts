import {useGetMerchantLocationLinkedSecondaryMidsQuery, usePostMerchantLocationLinkedSecondaryMidMutation} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationSecondaryMids = ({skipGetLocationLinkedSecondaryMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
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
