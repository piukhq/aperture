import {useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, Comments} from 'components'
import {getCommentsModalHeader, getCommentsRef, getCommentsSubjectType, reset} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle, CommentsSubjectTypes} from 'utils/enums'
import {determineCommentOwnerType} from 'utils/comments'

const DirectoryCommentsModal = () => {
  const dispatch = useAppDispatch()

  const commentsModalHeader = useAppSelector(getCommentsModalHeader)
  const commentsRef = useAppSelector(getCommentsRef)
  const commentsSubjectType = useAppSelector(getCommentsSubjectType)

  const {
    getCommentsResponse: comments,
    getCommentsIsLoading: commentsLoading,
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
  } = useMidManagementComments({commentsRef})

  const closeModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch])

  const handleNewCommentSubmit = useCallback((comment: string) => {
    postComment({
      commentsRef,
      metadata: {
        // TODO: Use actual user ID
        comment_owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        owner_type: determineCommentOwnerType(commentsSubjectType),
        text: comment,
      },
      subject_type: commentsSubjectType,
      subjects: [commentsRef],
    })
  }, [postComment, commentsSubjectType, commentsRef])

  const handleCommentDelete = useCallback((commentRef: string) => {
    deleteComment({commentRef, commentsRef})
  }, [deleteComment, commentsRef])

  const handleCommentEditSubmit = useCallback((commentRef: string, editedComment: string) => {
    patchComment({
      commentRef,
      commentsRef,
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
      commentsRef: commentsRef as string,
      metadata: {
        // TODO: Use actual user ID
        comment_owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        owner_type: determineCommentOwnerType(subjectType),
        text: comment,
      },
      subject_type: subjectType,
      subjects: subjectRefs,
    })
  }, [postReplyComment, commentsRef])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={commentsModalHeader} onCloseFn={closeModal}>
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
        />
      )}
      {commentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </Modal>
  )
}

export default DirectoryCommentsModal
