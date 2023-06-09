import {DirectoryMerchantEntityDeleteModal} from 'components'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppSelector} from 'app/hooks'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantSecondaryMidsDeleteModalContainer = () => {
  const {merchantId, planId} = useGetRouterQueryString()
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMid: true,
    skipGetSecondaryMids: true,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const deleteSecondaryMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantSecondaryMid({planRef: planId, merchantRef: merchantId, secondaryMidRefs: checkedEntityRefs})
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
