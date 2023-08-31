import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Comments} from 'components'
import {useDirectoryComments} from 'hooks/useDirectoryComments'
import {CommentsSubjectTypes} from 'utils/enums'
import {useCallback} from 'react'
import {determineCommentOwnerType} from 'utils/comments'

type Props = {
  subjectType: CommentsSubjectTypes
}

const SingleViewComments = ({subjectType}: Props) => {
  const {merchantId: ownerRef = '', ref, sub_location_ref} = useGetRouterQueryString()
  const commentsRef = sub_location_ref || ref || ''

  const {
    getCommentsResponse: comments,
    getCommentsIsLoading: isCommentsLoading,
    getCommentsError: commentsError,
    postComment,
    postCommentIsLoading: newCommentIsLoading,
    postCommentIsSuccess: newCommentIsSuccess,
    deleteComment,
    patchComment,
    patchCommentIsLoading: editedCommentIsLoading,
    patchCommentIsSuccess: editedCommentIsSuccess,
    postReplyComment,
    postReplyCommentIsLoading: replyCommentIsLoading,
    postReplyCommentIsSuccess: replyCommentIsSuccess,
  } = useDirectoryComments({commentsRef: commentsRef})

  const handleNewCommentSubmit = useCallback((comment: string) => {
    postComment({
      commentsRef: commentsRef,
      metadata: {
        owner_ref: ownerRef,
        owner_type: determineCommentOwnerType(subjectType),
        text: comment,
      },
      subject_type: subjectType,
      subjects: [commentsRef],
    })
  }, [postComment, subjectType, ownerRef, commentsRef])

  const handleCommentDelete = useCallback((commentRef: string) => {
    deleteComment({commentRef, commentsRef: commentsRef})
  }, [deleteComment, commentsRef])

  const handleCommentEditSubmit = useCallback((commentRef: string, editedComment: string) => {
    patchComment({
      commentRef,
      commentsRef: commentsRef,
      text: editedComment,
    })
  }, [patchComment, commentsRef])

  const handleCommentReplySubmit = useCallback((
    commentRef: string,
    comment: string,
    subjectRefs: Array<string>,
    subjectType: CommentsSubjectTypes
  ) => {
    postReplyComment({
      commentRef,
      commentsRef: commentsRef,
      metadata: {
        owner_ref: ownerRef,
        owner_type: determineCommentOwnerType(subjectType),
        text: comment,
      },
      subject_type: subjectType,
      subjects: subjectRefs,
    })
  }, [postReplyComment, ownerRef, commentsRef])

  return (
    <div className='pb-[10px]'>
      {comments && (
        <Comments
          comments={comments}
          newCommentIsLoading={newCommentIsLoading}
          newCommentIsSuccess={newCommentIsSuccess}
          editedCommentIsLoading={editedCommentIsLoading}
          editedCommentIsSuccess={editedCommentIsSuccess}
          replyCommentIsLoading={replyCommentIsLoading}
          replyCommentIsSuccess={replyCommentIsSuccess}
          handleCommentSubmit={handleNewCommentSubmit}
          handleCommentDelete={handleCommentDelete}
          handleCommentEditSubmit={handleCommentEditSubmit}
          handleCommentReplySubmit={handleCommentReplySubmit}
          isSingleView
        />
      )}
      {isCommentsLoading && <i className='font-body-4 ml-8'>Comments loading ...</i>}
      {commentsError && <i className='font-body-4 ml-8'>Error retrieving comments, try again later</i>}
    </div>
  )
}

export default SingleViewComments
