import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantPsimisDeleteModalContainer = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantPsimi,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantPsimiIsLoading,
    deleteMerchantPsimiError,
    resetDeleteMerchantPsimiResponse,
  } = useMidManagementPsimis({
    skipGetPsimi: true,
    skipGetPsimis: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deletePsimis = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantPsimi({planRef: planId as string, merchantRef: merchantId as string, psimiRefs: checkedEntityRefs})
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
