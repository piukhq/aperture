import {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  usePutMerchantLocationMutation,
  useDeleteMerchantLocationMutation,
  usePostMerchantLocationMutation,
} from 'services/DirectoryMerchantLocations'

export const useDirectoryLocations = ({skipGetLocations = false, skipGetLocation = false, planRef = '', merchantRef = '', locationRef = '', secondaryMidRef = '', getAll = false}) => {
  const {
    data: getMerchantLocationsResponse,
    isLoading: getMerchantLocationsIsLoading,
    error: getMerchantLocationsError,
    refetch: getMerchantLocationsRefresh,
    isFetching: getMerchantLocationsIsFetching,
  } = useGetMerchantLocationsQuery({planRef, merchantRef, secondaryMidRef, getAll}, {skip: skipGetLocations})

  const {
    data: getMerchantLocationResponse,
    isLoading: getMerchantLocationIsLoading,
    error: getMerchantLocationError,
    refetch: getMerchantLocationRefresh,
    isFetching: getMerchantLocationIsFetching,
  } = useGetMerchantLocationQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocation})

  const [putMerchantLocation, {
    isSuccess: putMerchantLocationIsSuccess,
    isLoading: putMerchantLocationIsLoading,
    error: putMerchantLocationError,
    reset: resetPutMerchantLocationResponse,
  }] = usePutMerchantLocationMutation({fixedCacheKey: 'putMerchantLocation'})

  const [deleteMerchantLocation, {
    isSuccess: deleteMerchantLocationIsSuccess,
    isLoading: deleteMerchantLocationIsLoading,
    error: deleteMerchantLocationError,
    reset: resetDeleteMerchantLocationResponse,
  }] = useDeleteMerchantLocationMutation({fixedCacheKey: 'deleteMerchantLocation'})

  const [postMerchantLocation, {
    isSuccess: postMerchantLocationIsSuccess,
    isLoading: postMerchantLocationIsLoading,
    error: postMerchantLocationError,
    reset: resetPostMerchantLocationResponse,
  }] = usePostMerchantLocationMutation({fixedCacheKey: 'postMerchantLocation'})


  return {
    // GET Locations
    getMerchantLocationsResponse,
    getMerchantLocationsIsLoading,
    getMerchantLocationsError,
    getMerchantLocationsRefresh,
    getMerchantLocationsIsFetching,
    // GET Location
    getMerchantLocationResponse,
    getMerchantLocationIsLoading,
    getMerchantLocationError,
    getMerchantLocationRefresh,
    getMerchantLocationIsFetching,
    // PUT Location
    putMerchantLocation,
    putMerchantLocationIsSuccess,
    putMerchantLocationIsLoading,
    putMerchantLocationError,
    resetPutMerchantLocationResponse,
    // DELETE Location
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
    // POST Location
    postMerchantLocation,
    postMerchantLocationIsSuccess,
    postMerchantLocationIsLoading,
    postMerchantLocationError,
    resetPostMerchantLocationResponse,
  }
}
