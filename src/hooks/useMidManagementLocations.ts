import {
  useGetMerchantLocationsQuery,
  useGetMerchantLocationQuery,
  useDeleteMerchantLocationMutation,
} from 'services/midManagementMerchantLocations'

export const useMidManagementLocations = ({skipGetLocations = false, skipGetLocation = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {data: getMerchantLocationsResponse, isLoading: getMerchantLocationsIsLoading, error: getMerchantLocationsError} = useGetMerchantLocationsQuery({planRef, merchantRef}, {skip: skipGetLocations})

  const {data: getMerchantLocationResponse, isLoading: getMerchantLocationIsLoading, error: getMerchantLocationError} = useGetMerchantLocationQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocation})

  const [deleteMerchantLocation,
    {isSuccess: deleteMerchantLocationIsSuccess, isLoading: deleteMerchantLocationIsLoading, error: deleteMerchantLocationError, reset: resetDeleteMerchantLocationResponse},
  ] = useDeleteMerchantLocationMutation({fixedCacheKey: 'deleteMerchantLocation'})

  return {
    // GET Locations
    getMerchantLocationsResponse,
    getMerchantLocationsIsLoading,
    getMerchantLocationsError,
    // GET Location
    getMerchantLocationResponse,
    getMerchantLocationIsLoading,
    getMerchantLocationError,
    // DELETE Location
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  }
}
