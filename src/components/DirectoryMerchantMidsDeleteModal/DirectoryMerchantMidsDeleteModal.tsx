import {Modal, DirectoryMerchantEntityDeleteModalContent} from 'components'
import {useRouter} from 'next/router'
import {DirectorySingleViewEntities, ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
} from 'features/directoryMerchantSlice'

const DirectoryMerchantMidsDeleteModal = () => {
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${directoryEntityCheckedSelection.length > 1 ? 's' : ''}`

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

  const deleteMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRefs: checkedEntityRefs})
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${entityLabel}`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <DirectoryMerchantEntityDeleteModalContent
        entityLabel={entityLabel}
        entitiesToBeDeleted={directoryEntityCheckedSelection}
        deleteButtonClickFn={deleteMids}
        deleteError={deleteMerchantMidError as RTKQueryErrorResponse}
        isDeleteSuccess={deleteMerchantMidIsSuccess}
        isDeleteLoading={deleteMerchantMidIsLoading}
        resetDeleteResponseFn={resetDeleteMerchantMidResponse}
        isHarmoniaEntity
      />
    </Modal>
  )
}

export default DirectoryMerchantMidsDeleteModal
