import {Modal, DirectoryMerchantEntityDeleteModalContent} from 'components'
import {useRouter} from 'next/router'
import {DirectorySingleViewEntities, ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
} from 'features/directoryMerchantSlice'

const DirectoryMerchantLocationsDeleteModal = () => {
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${directoryEntityCheckedSelection.length > 1 ? 's' : ''}`

  const {
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteLocations = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantLocation({planRef: planId as string, merchantRef: merchantId as string, locationRefs: checkedEntityRefs})
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${entityLabel}`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <DirectoryMerchantEntityDeleteModalContent
        entityLabel={entityLabel}
        entitiesToBeDeleted={directoryEntityCheckedSelection}
        deleteButtonClickFn={deleteLocations}
        deleteError={deleteMerchantLocationError as RTKQueryErrorResponse}
        isDeleteSuccess={deleteMerchantLocationIsSuccess}
        isDeleteLoading={deleteMerchantLocationIsLoading}
        resetDeleteResponseFn={resetDeleteMerchantLocationResponse}
      />
    </Modal>
  )
}

export default DirectoryMerchantLocationsDeleteModal
