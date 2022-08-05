import {useGetMerchantLocationLinkedMidsQuery} from 'services/midManagementMerchantLocations'

export const useMidManagementLocationMids = ({skipGetLocationLinkedMids = false, planRef = '', merchantRef = '', locationRef = ''}) => {
  const {data: getMerchantLocationLinkedMidsResponse, isLoading: getMerchantLocationLinkedMidsIsLoading, error: getMerchantLocationLinkedMidsError} = useGetMerchantLocationLinkedMidsQuery({planRef, merchantRef, locationRef}, {skip: skipGetLocationLinkedMids})

  return {
    // GET Location Linked MIDs
    getMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationLinkedMidsError,
  }
}
