import {
  useGetMerchantLocationSubLocationsQuery,
  useGetMerchantLocationSubLocationQuery,
  usePutMerchantLocationSubLocationMutation,
  usePostMerchantLocationSubLocationMutation,
  usePatchMerchantLocationSubLocationMutation,
} from 'services/DirectoryMerchantLocations'

export const useDirectoryLocationSubLocations = ({skipGetSubLocations = false, skipGetSubLocation = false, planRef = '', merchantRef = '', locationRef = '', subLocationRef = ''}) => {
  const {
    data: getMerchantLocationSubLocationsResponse,
    isLoading: getMerchantLocationSubLocationsIsLoading,
    error: getMerchantLocationSubLocationsError,
  } = useGetMerchantLocationSubLocationsQuery({planRef, merchantRef, locationRef}, {skip: skipGetSubLocations})

  const {
    data: getMerchantLocationSubLocationResponse,
    isLoading: getMerchantLocationSubLocationIsLoading,
    error: getMerchantLocationSubLocationError,
    refetch: getMerchantLocationSubLocationRefresh,
    isFetching: getMerchantLocationSubLocationIsFetching, // TODO: What exactly is fetching here? Is it the same as isLoading? Look into this when I have more time.
  } = useGetMerchantLocationSubLocationQuery({planRef, merchantRef, locationRef, subLocationRef}, {skip: skipGetSubLocation})

  const [postMerchantLocationSubLocation, {
    isSuccess: postMerchantLocationSubLocationIsSuccess,
    isLoading: postMerchantLocationSubLocationIsLoading,
    error: postMerchantLocationSubLocationError,
    reset: resetPostMerchantLocationSubLocationResponse,
  }] = usePostMerchantLocationSubLocationMutation({fixedCacheKey: 'postMerchantLocationSubLocation'})

  const [putMerchantLocationSubLocation, {
    isSuccess: putMerchantLocationSubLocationIsSuccess,
    isLoading: putMerchantLocationSubLocationIsLoading,
    error: putMerchantLocationSubLocationError,
    reset: resetPutMerchantLocationSubLocationResponse,
  }] = usePutMerchantLocationSubLocationMutation({fixedCacheKey: 'putMerchantLocationSubLocation'})

  const [patchMerchantLocationSubLocation, {
    isSuccess: patchMerchantLocationSubLocationIsSuccess,
    isLoading: patchMerchantLocationSubLocationIsLoading,
    error: patchMerchantLocationSubLocationError,
    reset: resetPatchMerchantLocationSubLocationResponse,
    data: patchMerchantLocationSubLocationResponse,
  }] = usePatchMerchantLocationSubLocationMutation({fixedCacheKey: 'patchMerchantLocationSubLocation'})

  return {
    // GET Location Linked Sub Locations
    getMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading,
    getMerchantLocationSubLocationsError,
    // GET Location Linked Sub Location
    getMerchantLocationSubLocationResponse,
    getMerchantLocationSubLocationIsLoading,
    getMerchantLocationSubLocationError,
    getMerchantLocationSubLocationRefresh,
    getMerchantLocationSubLocationIsFetching,
    // POST Location Sub-location
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
    // PUT Location Linked Sub Location
    putMerchantLocationSubLocation,
    putMerchantLocationSubLocationIsSuccess,
    putMerchantLocationSubLocationIsLoading,
    putMerchantLocationSubLocationError,
    resetPutMerchantLocationSubLocationResponse,
    // PATCH Location Linked Sub Location
    patchMerchantLocationSubLocation,
    patchMerchantLocationSubLocationIsSuccess,
    patchMerchantLocationSubLocationIsLoading,
    patchMerchantLocationSubLocationError,
    patchMerchantLocationSubLocationResponse,
    resetPatchMerchantLocationSubLocationResponse,
  }
}
