import {useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, Comments} from 'components'
import {getCommentsModalHeader, getCommentsRef, reset} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'

const DirectoryCommentsModal = () => {
  const dispatch = useAppDispatch()

  const commentsModalHeader = useAppSelector(getCommentsModalHeader)
  const commentsRef = useAppSelector(getCommentsRef)

  const {
    getCommentsResponse: comments,
    getCommentsIsLoading: commentsLoading,
    getCommentsError: commentsError,
  } = useMidManagementComments({commentsRef})

  const closeModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={commentsModalHeader} onCloseFn={closeModal}>
      {comments && <Comments comments={comments} />}

      {commentsLoading && <p className='font-body-4'>Comments loading ...</p>}

      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </Modal>
  )
}

export default DirectoryCommentsModal
