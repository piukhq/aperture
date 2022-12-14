import {
  useGetMerchantLocationSubLocationsQuery,
  useGetMerchantLocationSubLocationQuery,
  usePutMerchantLocationSubLocationMutation,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationSubLocations = ({skipGetSubLocations = false, skipGetSubLocation = false, planRef = '', merchantRef = '', locationRef = '', subLocationRef = ''}) => {
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
    isFetching: getMerchantLocationSubLocationIsFetching,
  } = useGetMerchantLocationSubLocationQuery({planRef, merchantRef, locationRef, subLocationRef}, {skip: skipGetSubLocation})

  const [putMerchantLocationSubLocation, {
    isSuccess: putMerchantLocationSubLocationIsSuccess,
    isLoading: putMerchantLocationSubLocationIsLoading,
    error: putMerchantLocationSubLocationError,
    reset: resetPutMerchantLocationSubLocationResponse,
  }] = usePutMerchantLocationSubLocationMutation({fixedCacheKey: 'putMerchantLocationSubLocation'})

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
    // PUT Location Linked Sub Location
    putMerchantLocationSubLocation,
    putMerchantLocationSubLocationIsSuccess,
    putMerchantLocationSubLocationIsLoading,
    putMerchantLocationSubLocationError,
    resetPutMerchantLocationSubLocationResponse,
  }
}
