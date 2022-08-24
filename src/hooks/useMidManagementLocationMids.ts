import {
  useGetMerchantLocationLinkedMidsQuery,
  usePostMerchantLocationLinkedMidMutation,
  useDeleteMerchantLocationMidLinkMutation,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationMids = ({skipGetLocationLinkedMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationLinkedMidsResponse,
    isLoading: getMerchantLocationLinkedMidsIsLoading,
    error: getMerchantLocationLinkedMidsError,
  } = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})

  const [
    postMerchantLocationLinkedMid,
    {
      isSuccess: postMerchantLocationLinkedMidIsSuccess,
      isLoading: postMerchantLocationLinkedMidIsLoading,
      error: postMerchantLocationLinkedMidError,
      reset: resetPostMerchantLocationLinkedMidResponse,
    }] = usePostMerchantLocationLinkedMidMutation({fixedCacheKey: 'postMerchantLocationLinkedMid'})

  const [deleteMerchantLocationMidLink, {
    isSuccess: deleteMerchantLocationMidLinkIsSuccess,
    isLoading: deleteMerchantLocationMidLinkIsLoading,
    error: deleteMerchantLocationMidLinkError,
    reset: resetDeleteMerchantLocationMidLinkResponse,
  }] = useDeleteMerchantLocationMidLinkMutation({fixedCacheKey: 'deleteMerchantLocationMidLink'})

  return {
    // GET Location Linked MIDs
    getMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationLinkedMidsError,
    // POST Location Linked MID
    postMerchantLocationLinkedMid,
    postMerchantLocationLinkedMidIsSuccess,
    postMerchantLocationLinkedMidIsLoading,
    postMerchantLocationLinkedMidError,
    resetPostMerchantLocationLinkedMidResponse,
    // DELETE Location  MID Link
    deleteMerchantLocationMidLink,
    deleteMerchantLocationMidLinkIsSuccess,
    deleteMerchantLocationMidLinkIsLoading,
    deleteMerchantLocationMidLinkError,
    resetDeleteMerchantLocationMidLinkResponse,
  }
}
