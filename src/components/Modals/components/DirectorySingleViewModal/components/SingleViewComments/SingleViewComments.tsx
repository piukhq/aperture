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

  return (
    <div className='pb-[10px]'>
      {comments && (
        <Comments
          comments={comments}
          newCommentIsLoading={newCommentIsLoading}
          newCommentIsSuccess={newCommentIsSuccess}
          handleCommentSubmit={handleNewCommentSubmit}
          isSingleView
        />
      )}
      {isCommentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </div>
  )
}

export default SingleViewComments
