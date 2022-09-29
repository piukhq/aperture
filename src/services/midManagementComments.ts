import {createApi} from '@reduxjs/toolkit/query/react'
import {DirectoryComments, DirectoryComment, DirectoryCommentMetadata} from 'types'
import {findNestedComment} from 'utils/comments'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'
import {CommentsSubjectTypes, UrlEndpoint} from 'utils/enums'

type DirectoryCommentBody = {
  commentsRef?: string,
  commentRef?: string,
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
    deleteComment: builder.mutation<DirectoryComments, {commentRef: string, commentsRef: string}>({
      query: ({commentRef}) => ({
        url: `${UrlEndpoint.COMMENTS}/${commentRef}`,
        method: 'DELETE',
      }),
      async onQueryStarted ({commentRef, commentsRef}, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
          dispatch(midManagementCommentsApi.util.updateQueryData('getComments', ({commentsRef}), (existingComments) => {
            if (existingComments.entity_comments) {
              const comment = findNestedComment(existingComments.entity_comments.comments, commentRef)
              if (comment) {
                comment.is_deleted = true
                return
              }
            }

            if (existingComments.lower_comments) {
              existingComments.lower_comments.forEach(lowerComment => {
                const comment = findNestedComment(lowerComment.comments, commentRef)
                if (comment) {
                  comment.is_deleted = true
                  return
                }
              })
            }
          })
          )
        } catch (err) {
          // TODO: Handle error scenarios gracefully in future error handling app wide
          console.error('Error:', err)
        }
      },
    }),
    patchComment: builder.mutation<DirectoryComment, {commentRef: string, commentsRef: string, text: string}>({
      query: ({commentRef, text}) => ({
        url: `${UrlEndpoint.COMMENTS}/${commentRef}`,
        method: 'PATCH',
        body: {text},
      }),
      async onQueryStarted ({commentsRef, commentRef}, {dispatch, queryFulfilled}) {
        try {
          const {data: editedComment} = await queryFulfilled
          dispatch(midManagementCommentsApi.util.updateQueryData('getComments', ({commentsRef}), (existingComments) => {
            if (existingComments.entity_comments) {
              const comment = findNestedComment(existingComments.entity_comments.comments, commentRef)
              if (comment) {
                Object.assign(comment, editedComment)
                return
              }
            }

            if (existingComments.lower_comments) {
              existingComments.lower_comments.forEach(lowerComment => {
                const comment = findNestedComment(lowerComment.comments, commentRef)
                if (comment) {
                  Object.assign(comment, editedComment)
                  return
                }
              })
            }
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
  useDeleteCommentMutation,
  usePatchCommentMutation,
} = midManagementCommentsApi
