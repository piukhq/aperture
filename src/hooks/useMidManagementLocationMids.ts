import {
  useGetMerchantLocationLinkedMidsQuery,
  useGetMerchantLocationAvailableMidsQuery,
  usePostMerchantLocationLinkedMidMutation,
  useDeleteMerchantLocationMidLinkMutation,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationMids = ({skipGetLocationLinkedMids = false, skipGetLocationAvailableMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {
    data: getMerchantLocationLinkedMidsResponse,
    isLoading: getMerchantLocationLinkedMidsIsLoading,
    error: getMerchantLocationLinkedMidsError,
  } = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})
  const {
    data: getMerchantLocationAvailableMidsResponse,
    isLoading: getMerchantLocationAvailableMidsIsLoading,
    error: getMerchantLocationAvailableMidsError,
  } = useGetMerchantLocationAvailableMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationAvailableMids})

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
    // GET Location Available MIDs
    getMerchantLocationAvailableMidsResponse,
    getMerchantLocationAvailableMidsIsLoading,
    getMerchantLocationAvailableMidsError,
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
