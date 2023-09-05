import {Button, Modal, PaymentCardIcon, TextInputGroup} from 'components'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useAppDispatch} from 'app/hooks'
import {ModalType, ModalStyle, DirectorySingleViewEntities} from 'utils/enums'
import {useRouter} from 'next/router'
import {requestModal} from 'features/modalSlice'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantEntitySelectedItem, RTKQueryErrorResponse} from 'types'
import {setSelectedDirectoryTableCheckedRows, setSelectedDirectoryEntityCheckedSelection, reset} from 'features/directoryMerchantSlice'

type Props = {
  entitiesToBeDeleted: DirectoryMerchantEntitySelectedItem[],
  deleteButtonClickFn: () => void,
  deleteSuccessFn?: () => void,
  deleteError: RTKQueryErrorResponse,
  isDeleteLoading: boolean,
  isDeleteSuccess: boolean,
  isHarmoniaEntity?: boolean,
  resetDeleteResponseFn: () => void,
}

const DirectoryMerchantEntityDeleteModal = ({
  entitiesToBeDeleted,
  deleteButtonClickFn,
  deleteSuccessFn,
  deleteError,
  isDeleteLoading,
  isDeleteSuccess,
  resetDeleteResponseFn,
  isHarmoniaEntity,
}: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {tab} = router.query

  const [reasonValue, setReasonValue] = useState<string>('')
  const [reasonValidationError, setReasonValidationError] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${entitiesToBeDeleted.length > 1 ? 's' : ''}`

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReasonValue(event.target.value)
    setReasonValidationError('')
  }

  const handleDeleteError = useCallback(() => {
    const {data} = deleteError
    setErrorMessage(
      data.detail[0].msg)
  }, [deleteError])

  useEffect(() => {
    if (deleteError) {
      handleDeleteError()
    } else if (isDeleteSuccess) {
      resetDeleteResponseFn()
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      dispatch(requestModal(ModalType.NO_MODAL))
      deleteSuccessFn && deleteSuccessFn()
      dispatch(reset())
    }
  }, [deleteError, deleteSuccessFn, dispatch, handleDeleteError, isDeleteSuccess, reasonValue, resetDeleteResponseFn])

  const renderListItem = (listItem: DirectoryMerchantEntitySelectedItem) => {
    const {entityRef, entityValue, paymentSchemeSlug} = listItem

    return (
      <li className='font-bold flex items-center gap-[2px]' key={entityRef}>
        {entityValue}
        {paymentSchemeSlug && (
          <PaymentCardIcon
            paymentSchemeSlug={paymentSchemeSlug}
            paymentSchemeIconStyles='flex w-[20px] h-[15px] justify-center mx-[2px] items-center'
          />
        )}
      </li>
    )
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${entityLabel}`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>delete</strong> the following {entityLabel}:</p>
        <ul>
          {entitiesToBeDeleted.map(entity => renderListItem(entity))}
        </ul>
        { entitiesToBeDeleted.length > 1 && (
          <TextInputGroup
            name='deletion-reason'
            label='Reason for deletion'
            onBlur={() => reasonValue.length < 1 && setReasonValidationError('Enter reason for deletion')}
            error={reasonValidationError ? reasonValidationError : ''}
            autofocus
            value={reasonValue}
            onChange={handleReasonChange}
            inputType={InputType.TEXT}
            inputStyle={InputStyle.FULL}
            inputWidth={InputWidth.FULL}
            inputColour={reasonValidationError ? InputColour.RED : InputColour.GREY}
          />
        )}
        {isHarmoniaEntity && <p>{entityLabel} will also be offboarded from Harmonia</p>}
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p role='alert' className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={deleteButtonClickFn}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.LARGE}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          isDisabled={isDeleteLoading || reasonValue.length < 1 && entitiesToBeDeleted.length > 1}
        >{isDeleteLoading ? `Deleting ${entityLabel}...` : `Delete ${entityLabel}`}
        </Button>
      </section>
    </Modal>
  )
}

export default DirectoryMerchantEntityDeleteModal
