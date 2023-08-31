import {DirectoryMerchantEntityDeleteModal} from 'components'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppSelector} from 'app/hooks'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantPsimisDeleteModalContainer = () => {
  const {merchantId = '', planId = ''} = useGetRouterQueryString()
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantPsimi,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantPsimiIsLoading,
    deleteMerchantPsimiError,
    resetDeleteMerchantPsimiResponse,
  } = useDirectoryPsimis({
    skipGetPsimi: true,
    skipGetPsimis: true,
    skipGetPsimisByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const deletePsimis = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantPsimi({planRef: planId, merchantRef: merchantId, psimiRefs: checkedEntityRefs})
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deletePsimis}
      deleteError={deleteMerchantPsimiError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantPsimiIsSuccess}
      isDeleteLoading={deleteMerchantPsimiIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantPsimiResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantPsimisDeleteModalContainer
