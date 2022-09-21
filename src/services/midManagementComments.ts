import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryComments, DirectoryComment, DirectoryCommentMetadata} from 'types'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {CommentsSubjectTypes, UrlEndpoint} from 'utils/enums'

type DirectoryCommentBody = {
  commentsRef?: string,
  metadata: DirectoryCommentMetadata,
  subjects: Array<string>,
  subject_type: CommentsSubjectTypes,
}

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
    postComment: builder.mutation<DirectoryComment, DirectoryCommentBody>({
      query: ({metadata, subject_type, subjects}) => ({
        url: `${UrlEndpoint.COMMENTS}`,
        method: 'POST',
        body: {
          metadata,
          subject_type,
          subjects,
        },
      }),
      async onQueryStarted ({commentsRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: newComment} = await queryFulfilled
          dispatch(midManagementCommentsApi.util.updateQueryData('getComments', ({commentsRef}), (existingComments) => {
            const newCommentsObject = Object.assign(existingComments)
            // Set the new comment as the first item in the array
            newCommentsObject.entity_comments.comments.unshift(newComment)
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
  }),
})

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
} = midManagementCommentsApi
