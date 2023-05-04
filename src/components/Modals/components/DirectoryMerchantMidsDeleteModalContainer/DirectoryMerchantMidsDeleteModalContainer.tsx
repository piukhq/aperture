import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {midManagementMerchantLocationsApi} from 'services/midManagementMerchantLocations'

const DirectoryMerchantMidsDeleteModalContainer = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
  } = useMidManagementMids({
    skipGetMid: true,
    skipGetMids: true,
    skipGetMidsByPage: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRefs: checkedEntityRefs})
  }

  const deleteSuccess = () => {
    dispatch(midManagementMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedMids', 'MerchantLocationAvailableMids']))
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteMids}
      deleteSuccessFn={deleteSuccess}
      deleteError={deleteMerchantMidError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantMidIsSuccess}
      isDeleteLoading={deleteMerchantMidIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantMidResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantMidsDeleteModalContainer
