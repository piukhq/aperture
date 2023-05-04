import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {midManagementPlansApi} from 'services/midManagementPlans'
import {midManagementMerchantLocationsApi} from 'services/midManagementMerchantLocations'
import {midManagementMerchantSecondaryMidsApi} from 'services/midManagementMerchantSecondaryMids'

const DirectoryMerchantLocationsDeleteModalContainer = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocation: true,
    skipGetLocations: true,
    skipGetLocationsByPage: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteLocations = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantLocation({planRef: planId as string, merchantRef: merchantId as string, locationRefs: checkedEntityRefs})
  }

  const deleteSuccess = () => {
    dispatch(midManagementPlansApi.util.resetApiState()) // Update plan list as count has changed
    dispatch(midManagementMerchantLocationsApi.util.invalidateTags(['MerchantLocationSubLocations']))
    dispatch(midManagementMerchantSecondaryMidsApi.util.invalidateTags(['MerchantSecondaryMidLinkedLocations']))
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteLocations}
      deleteSuccessFn={deleteSuccess}
      deleteError={deleteMerchantLocationError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantLocationIsSuccess}
      isDeleteLoading={deleteMerchantLocationIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantLocationResponse}
    />
  )
}

export default DirectoryMerchantLocationsDeleteModalContainer
