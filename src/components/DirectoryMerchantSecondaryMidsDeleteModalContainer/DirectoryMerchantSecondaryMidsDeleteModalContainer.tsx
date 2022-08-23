import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantSecondaryMidsDeleteModalContainer = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]

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
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteSecondaryMids}
      deleteError={deleteMerchantSecondaryMidError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantSecondaryMidIsSuccess}
      isDeleteLoading={deleteMerchantSecondaryMidIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantSecondaryMidResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantSecondaryMidsDeleteModalContainer
