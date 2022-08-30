import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryComments} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {UrlEndpoint} from 'utils/enums'

export const midManagementCommentsApi = createApi({
  reducerPath: 'midManagementCommentsApi',
  baseQuery: getDynamicBaseQuery(),
  tagTypes: ['Comments'],
  endpoints: builder => ({
    getComments: builder.query<DirectoryComments, {commentsRef: string}>({
      query: ({commentsRef}) => ({
        url: `${UrlEndpoint.COMMENTS}?ref=${commentsRef}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
  }),
})

export const {
  useGetCommentsQuery,
} = midManagementCommentsApi
