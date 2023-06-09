import {
  useGetMerchantLocationLinkedMidsQuery,
  useGetMerchantLocationAvailableMidsQuery,
  usePostMerchantLocationLinkedMidsMutation,
  useDeleteMerchantLocationMidLinkMutation,
} from 'services/DirectoryMerchantLocations'

export const useDirectoryLocationMids = ({skipGetLocationLinkedMids = false, skipGetLocationAvailableMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationLinkedMidsResponse,
    isLoading: getMerchantLocationLinkedMidsIsLoading,
    error: getMerchantLocationLinkedMidsError,
    refetch: resetGetMerchantLocationLinkedMidsResponse,
  } = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})
  const {
    data: getMerchantLocationAvailableMidsResponse,
    isLoading: getMerchantLocationAvailableMidsIsLoading,
    error: getMerchantLocationAvailableMidsError,
    refetch: resetGetMerchantLocationAvailableMidsResponse,
  } = useGetMerchantLocationAvailableMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationAvailableMids})

  const [
    postMerchantLocationLinkedMids,
    {
      isSuccess: postMerchantLocationLinkedMidsIsSuccess,
      isLoading: postMerchantLocationLinkedMidsIsLoading,
      error: postMerchantLocationLinkedMidsError,
      reset: resetPostMerchantLocationLinkedMidsResponse,
    }] = usePostMerchantLocationLinkedMidsMutation({fixedCacheKey: 'postMerchantLocationLinkedMids'})

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
    resetGetMerchantLocationLinkedMidsResponse,
    // GET Location Available MIDs
    getMerchantLocationAvailableMidsResponse,
    getMerchantLocationAvailableMidsIsLoading,
    getMerchantLocationAvailableMidsError,
    resetGetMerchantLocationAvailableMidsResponse,
    // POST Location Linked MID
    postMerchantLocationLinkedMids,
    postMerchantLocationLinkedMidsIsSuccess,
    postMerchantLocationLinkedMidsIsLoading,
    postMerchantLocationLinkedMidsError,
    resetPostMerchantLocationLinkedMidsResponse,
    // DELETE Location  MID Link
    deleteMerchantLocationMidLink,
    deleteMerchantLocationMidLinkIsSuccess,
    deleteMerchantLocationMidLinkIsLoading,
    deleteMerchantLocationMidLinkError,
    resetDeleteMerchantLocationMidLinkResponse,
  }
}
