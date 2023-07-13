import {DirectoryMerchantEntityDeleteModal} from 'components'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppSelector} from 'app/hooks'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantMidsDeleteModalContainer = () => {
  const {merchantId = '', planId = ''} = useGetRouterQueryString()
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
  } = useDirectoryMids({
    skipGetMid: true,
    skipGetMids: true,
    skipGetMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const deleteMids = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantMid({planRef: planId, merchantRef: merchantId, midRefs: checkedEntityRefs})
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
