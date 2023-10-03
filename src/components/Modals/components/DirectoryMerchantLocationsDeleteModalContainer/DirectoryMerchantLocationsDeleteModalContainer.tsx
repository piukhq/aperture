import {DirectoryMerchantEntityDeleteModal} from 'components'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppSelector} from 'app/hooks'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'


const DirectoryMerchantLocationsDeleteModalContainer = () => {
  const {merchantId, planId} = useGetRouterQueryString()
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  } = useDirectoryLocations({
    skipGetLocation: true,
    skipGetLocations: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const deleteLocations = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantLocation({planRef: planId, merchantRef: merchantId, locationRefs: checkedEntityRefs})
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
