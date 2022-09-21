import {DirectoryMerchantEntityDeleteModal} from 'components'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {RTKQueryErrorResponse, DirectoryMerchantEntitySelectedItem} from 'types'
import {getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'

const DirectoryMerchantIdentifiersDeleteModalContainer = () => {
  const router = useRouter()
  const {merchantId, planId} = router.query
  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntitySelectedItem[]

  const {
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
  } = useMidManagementIdentifiers({
    skipGetIdentifier: true,
    skipGetIdentifiers: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteIdentifiers = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantIdentifier({planRef: planId as string, merchantRef: merchantId as string, identifierRefs: checkedEntityRefs})
  }

  return (
    <DirectoryMerchantEntityDeleteModal
      entitiesToBeDeleted={directoryEntityCheckedSelection}
      deleteButtonClickFn={deleteIdentifiers}
      deleteError={deleteMerchantIdentifierError as RTKQueryErrorResponse}
      isDeleteSuccess={deleteMerchantIdentifierIsSuccess}
      isDeleteLoading={deleteMerchantIdentifierIsLoading}
      resetDeleteResponseFn={resetDeleteMerchantIdentifierResponse}
      isHarmoniaEntity
    />
  )
}

export default DirectoryMerchantIdentifiersDeleteModalContainer
