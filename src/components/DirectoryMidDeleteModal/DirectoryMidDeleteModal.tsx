import {useCallback, useEffect, useState} from 'react'
import {Modal, Button} from 'components'
import {useRouter} from 'next/router'
import {ModalStyle, ModalType} from 'utils/enums'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {DirectoryMids, RTKQueryErrorResponse} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryTableCheckedRows,
} from 'features/directoryMerchantSlice'

const DirectoryMidModal = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const {merchantId, planId} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const selectedCheckedMidsArray = directoryEntityCheckedSelection as DirectoryMids

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
  } = useMidManagementMids({
    skipGetMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const handleDeleteMerchantMidError = useCallback(() => {
    const {data} = deleteMerchantMidError as RTKQueryErrorResponse
    setErrorMessage(data.detail[0].msg)
  }, [deleteMerchantMidError])

  useEffect(() => {
    if (deleteMerchantMidError) {
      handleDeleteMerchantMidError()
    } else if (deleteMerchantMidIsSuccess) {
      resetDeleteMerchantMidResponse()
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [dispatch, deleteMerchantMidError, deleteMerchantMidIsSuccess, handleDeleteMerchantMidError, resetDeleteMerchantMidResponse])

  const midLabel = selectedCheckedMidsArray.length > 1 ? 'MIDs' : 'MID'

  const handleDeleteButtonClick = () => {
    const checkedMidsRefs = selectedCheckedMidsArray.map(mid => mid.mid_ref)
    deleteMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRefs: checkedMidsRefs})
  }

  const renderMidList = () => {
    return selectedCheckedMidsArray.map(mid => (
      <li className='font-bold' key={mid.mid_ref}>{mid.mid_metadata.mid}</li>
    ))
  }

  return (
    <Modal
      modalStyle={ModalStyle.COMPACT}
      modalHeader={`Delete ${midLabel}`}
      onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}
    >
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>delete</strong> the following {midLabel}:</p>
        <ul>
          {renderMidList()}
        </ul>
        <p>{midLabel} will also be offboarded from Harmonia</p>
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={() => !deleteMerchantMidIsLoading && handleDeleteButtonClick()}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >{deleteMerchantMidIsLoading ? 'Deleting...' : `Delete ${midLabel}`}
        </Button>
      </section>
    </Modal>
  )
}

export default DirectoryMidModal
