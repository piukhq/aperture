import {
  useGetMerchantLocationLinkedSecondaryMidsQuery,
  usePostMerchantLocationLinkedSecondaryMidMutation,
  useDeleteMerchantLocationSecondaryMidLinkMutation,
} from 'services/DirectoryMerchantLocations'

export const useDirectoryLocationSecondaryMids = ({skipGetLocationLinkedSecondaryMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationLinkedSecondaryMidsResponse,
    isLoading: getMerchantLocationLinkedSecondaryMidsIsLoading,
    error: getMerchantLocationLinkedSecondaryMidsError,
  } = useGetMerchantLocationLinkedSecondaryMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedSecondaryMids})

  const [
    postMerchantLocationLinkedSecondaryMid,
    {
      isSuccess: postMerchantLocationLinkedSecondaryMidIsSuccess,
      isLoading: postMerchantLocationLinkedSecondaryMidIsLoading,
      error: postMerchantLocationLinkedSecondaryMidError,
      reset: resetPostMerchantLocationLinkedSecondaryMidResponse,
    }] = usePostMerchantLocationLinkedSecondaryMidMutation({fixedCacheKey: 'postMerchantLocationLinkedSecondaryMid'})

  const [deleteMerchantLocationSecondaryMidLink, {
    isSuccess: deleteMerchantLocationSecondaryMidLinkIsSuccess,
    isLoading: deleteMerchantLocationSecondaryMidLinkIsLoading,
    error: deleteMerchantLocationSecondaryMidLinkError,
    reset: resetDeleteMerchantLocationSecondaryMidLinkResponse,
  }] = useDeleteMerchantLocationSecondaryMidLinkMutation({fixedCacheKey: 'deleteMerchantLocationSecondaryMidLink'})

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
    // DELETE Location Secondary MID Link
    deleteMerchantLocationSecondaryMidLink,
    deleteMerchantLocationSecondaryMidLinkIsSuccess,
    deleteMerchantLocationSecondaryMidLinkIsLoading,
    deleteMerchantLocationSecondaryMidLinkError,
    resetDeleteMerchantLocationSecondaryMidLinkResponse,
  }
}
