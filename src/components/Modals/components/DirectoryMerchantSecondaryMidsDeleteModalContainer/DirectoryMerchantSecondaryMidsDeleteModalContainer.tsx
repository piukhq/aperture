import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {midManagementMerchantLocationsApi} from 'services/midManagementMerchantLocations'

const DirectoryMerchantSecondaryMidsDeleteModalContainer = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  } = useMidManagementSecondaryMids({
    skipGetSecondaryMid: true,
    skipGetSecondaryMids: true,
    skipGetSecondaryMidsByPage: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteSecondaryMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantSecondaryMid({planRef: planId as string, merchantRef: merchantId as string, secondaryMidRefs: checkedEntityRefs})
  }

  const deleteSuccess = () => {
    dispatch(midManagementMerchantLocationsApi.util.invalidateTags(['MerchantLocationLinkedSecondaryMids']))
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteSecondaryMids}
      deleteSuccessFn={deleteSuccess}
      deleteError={deleteMerchantSecondaryMidError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantSecondaryMidIsSuccess}
      isDeleteLoading={deleteMerchantSecondaryMidIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantSecondaryMidResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantSecondaryMidsDeleteModalContainer
