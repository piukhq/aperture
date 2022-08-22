import {Modal, DirectoryMerchantEntityDeleteModalContent} from 'components'
import {useRouter} from 'next/router'
import {DirectorySingleViewEntities, ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
} from 'features/directoryMerchantSlice'

const DirectoryMerchantSecondaryMidsDeleteModal = () => {
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${directoryEntityCheckedSelection.length > 1 ? 's' : ''}`

  const {
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  } = useMidManagementSecondaryMids({
    skipGetSecondaryMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteSecondaryMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantSecondaryMid({planRef: planId as string, merchantRef: merchantId as string, secondaryMidRefs: checkedEntityRefs})
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${entityLabel}`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <DirectoryMerchantEntityDeleteModalContent
        entityLabel={entityLabel}
        entitiesToBeDeleted={directoryEntityCheckedSelection}
        deleteButtonClickFn={deleteSecondaryMids}
        deleteError={deleteMerchantSecondaryMidError as RTKQueryErrorResponse}
        isDeleteSuccess={deleteMerchantSecondaryMidIsSuccess}
        isDeleteLoading={deleteMerchantSecondaryMidIsLoading}
        resetDeleteResponseFn={resetDeleteMerchantSecondaryMidResponse}
        isHarmoniaEntity
      />
    </Modal>
  )
}

export default DirectoryMerchantSecondaryMidsDeleteModal
