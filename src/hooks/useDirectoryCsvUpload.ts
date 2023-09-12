import {usePostCsvMutation} from 'services/DirectoryCsvUpload'

export const useDirectoryCsvUpload = () => {

  const [postCsv, {
    data: postCsvResponse,
    isLoading: postCsvIsLoading,
    error: postCsvError,
    reset: resetPostCsvResponse,
  }] = usePostCsvMutation({fixedCacheKey: 'postCsv'})
  return {
    postCsv,
    postCsvResponse,
    postCsvIsLoading,
    postCsvError,
    resetPostCsvResponse,
  }
}
