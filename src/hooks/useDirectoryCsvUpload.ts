import {usePostCsvMutation} from 'services/DirectoryCsvUpload'

export const useDirectoryCsvUpload = () => {

  const [postCsv, {
    data: postCsvResponse,
    isLoading: postCsvIsLoading,
    isSuccess: postCsvIsSuccess,
    error: postCsvError,
    reset: resetPostCsvResponse,
  }] = usePostCsvMutation({fixedCacheKey: 'postCsv'})
  return {
    postCsv,
    postCsvResponse,
    postCsvIsLoading,
    postCsvIsSuccess,
    postCsvError,
    resetPostCsvResponse,
  }
}
