import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantMidsDeleteModalContainer = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]

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
