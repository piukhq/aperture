import {useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, Comments} from 'components'
import {getCommentsModalHeader, getCommentsOwnerRef, getCommentsRef, getCommentsSubjectType, reset} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
import {determineCommentOwnerType} from 'utils/comments'

const DirectoryCommentsModal = () => {
  const dispatch = useAppDispatch()

  const commentsModalHeader = useAppSelector(getCommentsModalHeader)
  const commentsRef = useAppSelector(getCommentsRef)
  const commentsOwnerRef = useAppSelector(getCommentsOwnerRef)
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
  } = useMidManagementComments({commentsRef})

  const closeModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch])

  const handleNewCommentSubmit = useCallback((comment: string) => {
    postComment({
      commentsRef,
      metadata: {
        owner_ref: commentsOwnerRef,
        owner_type: determineCommentOwnerType(commentsSubjectType),
        text: comment,
      },
      subject_type: commentsSubjectType,
      subjects: [commentsRef],
    })
  }, [postComment, commentsSubjectType, commentsRef, commentsOwnerRef])

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

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={commentsModalHeader} onCloseFn={closeModal}>
      {comments && (
        <Comments
          comments={comments}
          newCommentIsLoading={newCommentIsLoading}
          newCommentIsSuccess={newCommentIsSuccess}
          editedCommentIsLoading={editedCommentIsLoading}
          editedCommentIsSuccess={editedCommentIsSuccess}
          handleCommentSubmit={handleNewCommentSubmit}
          handleCommentDelete={handleCommentDelete}
          handleCommentEditSubmit={handleCommentEditSubmit}
        />
      )}
      {commentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </Modal>
  )
}

export default DirectoryCommentsModal
