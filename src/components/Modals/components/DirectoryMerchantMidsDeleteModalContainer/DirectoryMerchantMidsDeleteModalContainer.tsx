import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {midManagementPlansApi} from 'services/midManagementPlans'

const DirectoryMerchantMidsDeleteModalContainer = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
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
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantMid({planRef: planId as string, merchantRef: merchantId as string, midRefs: checkedEntityRefs})
    dispatch(midManagementPlansApi.util.resetApiState()) // Update plan list as count has changed
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteMids}
      deleteError={deleteMerchantMidError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantMidIsSuccess}
      isDeleteLoading={deleteMerchantMidIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantMidResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantMidsDeleteModalContainer
