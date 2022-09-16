import {useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, Comments} from 'components'
import {getCommentsModalHeader, getCommentsRef, getCommentsSubjectType, reset} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
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
      subjects: [commentsRef as string],
    })
  }, [postComment, commentsSubjectType, commentsRef])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={commentsModalHeader} onCloseFn={closeModal}>
      {comments && (
        <Comments
          comments={comments}
          newCommentIsLoading={newCommentIsLoading}
          newCommentIsSuccess={newCommentIsSuccess}
          handleCommentSubmit={handleNewCommentSubmit}
        />
      )}
      {commentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </Modal>
  )
}

export default DirectoryCommentsModal
