import {createApi} from '@reduxjs/toolkit/query/react'
import {UrlEndpoint} from 'utils/enums'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

type CsvUploadSuccessResponse = {
  description: string,
  content: {
    'application/json': {
      schema: {
        $ref: string,
      },
    },
  },
  }

  type PostCsvBody = {
    file: File,
    plan_ref: string,
    file_type: string,
    merchant_ref?: string,
  }

export const directoryCsvUploadApi = createApi({
  reducerPath: 'csvUploadApi',
  baseQuery: getDynamicBaseQuery(),
  endpoints: builder => ({
    postCsv: builder.mutation<CsvUploadSuccessResponse, PostCsvBody>({
      query: ({file, file_type, plan_ref, merchant_ref}) => {
        const body = new FormData()
        body.append('file', file)
        body.append('file_type', file_type)
        body.append('plan_ref', plan_ref)
        merchant_ref && body.append('merchant_ref', merchant_ref)

        return {
          url: `${UrlEndpoint.CSV_UPLOAD}`,
          method: 'POST',
          body,
        }
      },
    }),
  }),
})

export const {usePostCsvMutation} = directoryCsvUploadApi
