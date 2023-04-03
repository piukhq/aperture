import {Button, Modal, PaymentCardIcon} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useAppDispatch} from 'app/hooks'
import {ModalType, ModalStyle, DirectorySingleViewEntities} from 'utils/enums'
import {useRouter} from 'next/router'
import {requestModal} from 'features/modalSlice'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantEntitySelectedItem, RTKQueryErrorResponse} from 'types'
import {setSelectedDirectoryTableCheckedRows, setSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {midManagementMerchantsApi} from 'services/midManagementMerchants'

type Props = {
  entitiesToBeDeleted: DirectoryMerchantEntitySelectedItem[],
  deleteButtonClickFn: () => void,
  deleteError: RTKQueryErrorResponse,
  isDeleteLoading: boolean,
  isDeleteSuccess: boolean,
  isHarmoniaEntity?: boolean,
  resetDeleteResponseFn: () => void,
}

const DirectoryMerchantEntityDeleteModal = ({
  entitiesToBeDeleted,
  deleteButtonClickFn,
  deleteError,
  isDeleteLoading,
  isDeleteSuccess,
  resetDeleteResponseFn,
  isHarmoniaEntity,
}: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {tab} = router.query

  const [errorMessage, setErrorMessage] = useState('')
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${entitiesToBeDeleted.length > 1 ? 's' : ''}`

  const handleDeleteError = useCallback(() => {
    const {data} = deleteError
    setErrorMessage(data.detail[0].msg)
  }, [deleteError])

  useEffect(() => {
    if (deleteError) {
      handleDeleteError()
    } else if (isDeleteSuccess) {
      resetDeleteResponseFn()
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      dispatch(midManagementMerchantsApi.util.resetApiState()) // Reset midManagementMerchantsApi state as count will have changed, consider a less destructive way to do this
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [deleteError, dispatch, handleDeleteError, isDeleteSuccess, resetDeleteResponseFn])

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
        {isHarmoniaEntity && <p>{entityLabel} will also be offboarded from Harmonia</p>}
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={deleteButtonClickFn}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.LARGE}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          isDisabled={isDeleteLoading}
        >{isDeleteLoading ? `Deleting ${entityLabel}...` : `Delete ${entityLabel}`}
        </Button>
      </section>
    </Modal>
  )
}

export default DirectoryMerchantEntityDeleteModal
