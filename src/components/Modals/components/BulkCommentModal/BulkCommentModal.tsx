import {useCallback, useEffect, useState} from 'react'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Modal, AutosizeTextArea, PaymentCardIcon} from 'components'
import {getCommentsOwnerRef, getCommentsModalHeader, getCommentsSubjectType} from 'features/directoryCommentsSlice'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {shouldCloseHidableModal} from 'features/modalSlice'
import {ModalStyle} from 'utils/enums'
import {determineCommentOwnerType} from 'utils/comments'
import {DirectoryMerchantEntitySelectedItem} from 'types'
import CheckSvg from 'icons/svgs/check.svg'

const BulkCommentModal = () => {
  const dispatch = useAppDispatch()
  const commentsOwnerRef = useAppSelector(getCommentsOwnerRef)
  const commentsModalHeader = useAppSelector(getCommentsModalHeader)
  const commentsSubjectType = useAppSelector(getCommentsSubjectType)
  const checkedSubjects = useAppSelector(getSelectedDirectoryEntityCheckedSelection)

  const [checkedRefs, setCheckedRefs] = useState([])
  const [noSubjectsValidationIsError, setNoSubjectsValidationIsError] = useState(false)

  useEffect(() => {
    setCheckedRefs(checkedSubjects.map(subject => subject.entityRef))
  }, [checkedSubjects])


  const {
    postComment,
    postCommentIsLoading: newBulkCommentIsLoading,
    postCommentIsSuccess: newBulkCommentIsSuccess,
  } = useMidManagementComments({skipGetComments: true})

  useEffect(() => {
    if (newBulkCommentIsSuccess) {
      dispatch(shouldCloseHidableModal(true))
    }
  }, [newBulkCommentIsSuccess, dispatch])

  const handleBulkCommentSubmit = useCallback((comment: string) => {
    if (checkedRefs.length !== 0) {
      postComment({
        metadata: {
          owner_ref: commentsOwnerRef,
          owner_type: determineCommentOwnerType(commentsSubjectType),
          text: comment,
        },
        subject_type: commentsSubjectType,
        subjects: checkedRefs,
      })
    } else {
      setNoSubjectsValidationIsError(true)
    }
  }, [postComment, commentsSubjectType, checkedRefs, commentsOwnerRef])

  const handleCheckboxChange = (ref: string) => {
    setNoSubjectsValidationIsError(false)

    const index = checkedRefs.findIndex(storedRef => storedRef === ref)
    if (index === -1) {
      setCheckedRefs(prevState => [...prevState, ref])
    } else {
      setCheckedRefs(checkedRefs.filter(selectedRef => selectedRef !== ref))
    }
  }

  const renderSubjects = () => {
    return checkedSubjects.map((subject: DirectoryMerchantEntitySelectedItem) => {
      const {entityRef, entityValue, paymentSchemeSlug} = subject
      const isChecked = checkedRefs.includes(entityRef)
      return (
        <div data-testid='subject' key={entityRef} className='flex mt-[5px] ml-[5px] items-center'>
          <label className='flex items-center font-body-4 font-bold mr-[2px]'>
            <input type='checkbox' className='flex mr-[6px] h-[16px] w-[16px]' checked={isChecked} onChange={() => handleCheckboxChange(entityRef)} />
            {entityValue}
          </label>

          {paymentSchemeSlug && (
            <PaymentCardIcon
              paymentSchemeSlug={paymentSchemeSlug}
              paymentSchemeIconStyles='flex w-[17px] h-[12px] justify-center mx-[2px] items-center'
            />
          )}
        </div>
      )
    })
  }

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={commentsModalHeader}>
      <section data-testid='subjects-section' className='ml-[45px] mt-[20px] mb-[30px]'>
        <p className='font-body-4'>New Comment in</p>
        {renderSubjects()}
      </section>

      <section data-testid='text-area-section' className='border-t-[1px] border-grey-200 dark:border-grey-800 pt-[22px] px-[15px]'>
        {newBulkCommentIsSuccess && !newBulkCommentIsLoading ? (
          <div data-testid='success-container' className='flex items-center mt-[10px]'>
            <CheckSvg className='w-[16px] h-[11px] fill-grey-600' />
            <p className='ml-[5px] font-body-3'>Success - Comment added</p>
          </div>
        ) : (
          <AutosizeTextArea accessibilityLabel='Add bulk comment' placeholder='Add a bulk comment' submitHandler={handleBulkCommentSubmit} />
        )}
      </section>

      <section data-testid='error-message-section' className='h-[24px] ml-[16px] pt-[5px]'>
        {noSubjectsValidationIsError && (
          <p role='alert' data-testid='error-message' className='font-body-3 text-red'>No subject selected</p>
        )}
      </section>
    </Modal>
  )
}

export default BulkCommentModal
