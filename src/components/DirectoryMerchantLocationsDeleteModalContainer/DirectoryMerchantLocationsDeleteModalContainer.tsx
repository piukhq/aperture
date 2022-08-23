import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantLocationsDeleteModalContainer = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]

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
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteLocations}
      deleteError={deleteMerchantLocationError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantLocationIsSuccess}
      isDeleteLoading={deleteMerchantLocationIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantLocationResponse}
    />
  )
}

export default DirectoryMerchantLocationsDeleteModalContainer
