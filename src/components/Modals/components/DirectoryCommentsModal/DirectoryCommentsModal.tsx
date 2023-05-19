import {useCallback} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, Comments} from 'components'
import {getCommentsModalHeader, getCommentsOwnerRef, getCommentsRef, getCommentsSubjectType, reset} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle, CommentsSubjectTypes} from 'utils/enums'
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

  const handleCommentReplySubmit = useCallback((
    commentRef: string,
    comment: string,
    subjectRefs: Array<string>,
    subjectType: CommentsSubjectTypes,
    ownerRef: string
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
      {commentsLoading && <i className='font-body-4 ml-8'>Comments loading ...</i>}
      {commentsError && <i className='font-body-4 ml-8'>Error retrieving comments, try again later</i>}
    </Modal>
  )
}

export default DirectoryCommentsModal
