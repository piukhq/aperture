import {useGetServiceQuery} from 'services/service'

export const useService = () => {
  const {
    data: getServiceResponse,
    isLoading: getServiceIsLoading,
    isError: getServiceIsError,
    error: getServiceError,
    refetch: getServiceRefresh,
  } = useGetServiceQuery()

  return {
    getServiceResponse,
    getServiceRefresh,
    getServiceIsLoading,
    getServiceIsError,
    getServiceError,
  }
}

