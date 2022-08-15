import {useCallback, useEffect, useState} from 'react'
import {Modal, Button, Tag} from 'components'
import {useRouter} from 'next/router'
import {DirectorySingleViewEntities, ModalStyle, ModalType} from 'utils/enums'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryTableCheckedRows,
} from 'features/directoryMerchantSlice'

const DirectoryMerchantEntityDeleteModal = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]

  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${directoryEntityCheckedSelection.length > 1 ? 's' : ''}`

  const { // TODO: Replace hardcoded MID hooks with mechanism based on entity
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

  const handleDeleteMerchantEntityError = useCallback(() => {
    const {data} = deleteMerchantMidError as RTKQueryErrorResponse
    setErrorMessage(data.detail[0].msg)
  }, [deleteMerchantMidError])

  useEffect(() => {
    if (deleteMerchantMidError) {
      handleDeleteMerchantEntityError()
    } else if (deleteMerchantMidIsSuccess) {
      resetDeleteMerchantMidResponse()
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [dispatch, deleteMerchantMidError, deleteMerchantMidIsSuccess, handleDeleteMerchantEntityError, resetDeleteMerchantMidResponse])

  const handleDeleteButtonClick = () => {
    const checkedMidsRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRefs: checkedMidsRefs})
  }

  const renderMidList = () => {
    return directoryEntityCheckedSelection.map(entity => (
      <li className='font-bold' key={entity.entityRef}>{entity.entityValue}</li>
    ))
  }

  return (
    <Modal
      modalStyle={ModalStyle.COMPACT}
      modalHeader={`Delete ${entityLabel}`}
      onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}
    >
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>delete</strong> the following {entityLabel}:</p>
        <ul>
          {renderMidList()}
        </ul>
        <p>{entityLabel} will also be offboarded from Harmonia</p>
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        {deleteMerchantMidIsLoading ? (
          <Tag
            tagSize={TagSize.MEDIUM}
            textStyle={TextStyle.MEDIUM}
            textColour={TextColour.WHITE}
            tagStyle={TagStyle.RED_FILLED}
            label='Deleting...'
          />
        ) : (
          <Button
            handleClick={handleDeleteButtonClick}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.RED}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >{`Delete ${entityLabel}`}
          </Button>
        )}
      </section>
    </Modal>
  )
}

export default DirectoryMerchantEntityDeleteModal
