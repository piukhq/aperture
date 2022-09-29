import {useRouter} from 'next/router'
import {Comments} from 'components'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {CommentsSubjectTypes} from 'utils/enums'
import {useCallback} from 'react'
import {determineCommentOwnerType} from 'utils/comments'

type Props = {
  subjectType: CommentsSubjectTypes
}

const SingleViewComments = ({subjectType}: Props) => {
  const router = useRouter()
  const {ref: commentsRef} = router.query

  const {
    getCommentsResponse: comments,
    getCommentsIsLoading: isCommentsLoading,
    getCommentsError: commentsError,
    postComment,
    postCommentIsLoading: newCommentIsLoading,
    postCommentIsSuccess: newCommentIsSuccess,
    deleteComment,
    patchComment,
    patchCommentIsLoading: updatedCommentIsLoading,
    patchCommentIsSuccess: updatedCommentIsSuccess,
  } = useMidManagementComments({commentsRef: commentsRef as string})

  const handleNewCommentSubmit = useCallback((comment: string) => {
    postComment({
      commentsRef: commentsRef as string,
      metadata: {
        // TODO: Use actual user ID
        comment_owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        owner_type: determineCommentOwnerType(subjectType),
        text: comment,
      },
      subject_type: subjectType,
      subjects: [commentsRef as string],
    })
  }, [postComment, subjectType, commentsRef])

  const handleCommentDelete = useCallback((commentRef: string) => {
    deleteComment({commentRef, commentsRef: commentsRef as string})
  }, [deleteComment, commentsRef])

  const handleCommentEditSubmit = useCallback((commentRef: string, editedComment: string) => {
    patchComment({
      commentRef,
      commentsRef: commentsRef as string,
      text: editedComment,
    })
  }, [patchComment, commentsRef])

  return (
    <div className='pb-[10px]'>
      {comments && (
        <Comments
          comments={comments}
          newCommentIsLoading={newCommentIsLoading}
          newCommentIsSuccess={newCommentIsSuccess}
          updatedCommentIsLoading={updatedCommentIsLoading}
          updatedCommentIsSuccess={updatedCommentIsSuccess}
          handleCommentSubmit={handleNewCommentSubmit}
          handleCommentDelete={handleCommentDelete}
          handleCommentEditSubmit={handleCommentEditSubmit}
          isSingleView
        />
      )}
      {isCommentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </div>
  )
}

export default SingleViewComments
