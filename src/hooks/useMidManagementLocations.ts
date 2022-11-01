import {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  usePutMerchantLocationMutation,
  useDeleteMerchantLocationMutation,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocations = ({skipGetLocations = false, skipGetLocation = false, planRef = '', merchantRef = '', locationRef = '', secondaryMidRef = ''}) => {
  const {
    data: getMerchantLocationsResponse,
    isLoading: getMerchantLocationsIsLoading,
    error: getMerchantLocationsError,
    refetch: getMerchantLocationsRefresh,
    isFetching: getMerchantLocationsIsFetching,
  } = useGetMerchantLocationsQuery({planRef, merchantRef, secondaryMidRef}, {skip: skipGetLocations})

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
  }
}
