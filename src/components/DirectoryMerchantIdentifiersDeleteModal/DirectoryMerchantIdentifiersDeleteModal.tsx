import {Modal, DirectoryMerchantEntityDeleteModalContent} from 'components'
import {useRouter} from 'next/router'
import {DirectorySingleViewEntities, ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementIdentifiers} from 'hooks/useMidManagementIdentifiers'
import {RTKQueryErrorResponse, DirectoryMerchantEntityDeletionItem} from 'types'
import {
  getSelectedDirectoryEntityCheckedSelection,
  setSelectedDirectoryEntityCheckedSelection,
} from 'features/directoryMerchantSlice'

const DirectoryMerchantIdentifiersDeleteModal = () => {
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  const dispatch = useAppDispatch()

  const directoryEntityCheckedSelection = useAppSelector(getSelectedDirectoryEntityCheckedSelection) as DirectoryMerchantEntityDeletionItem[]
  const entityLabel = `${DirectorySingleViewEntities[tab as keyof typeof DirectorySingleViewEntities]}${directoryEntityCheckedSelection.length > 1 ? 's' : ''}`

  const {
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
  } = useMidManagementIdentifiers({
    skipGetIdentifier: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const deleteIdentifiers = () => {
    const checkedEntityRefs = directoryEntityCheckedSelection.map(entity => entity.entityRef)
    deleteMerchantIdentifier({planRef: planId as string, merchantRef: merchantId as string, identifierRefs: checkedEntityRefs})
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${entityLabel}`} onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <DirectoryMerchantEntityDeleteModalContent
        entityLabel={entityLabel}
        entitiesToBeDeleted={directoryEntityCheckedSelection}
        deleteButtonClickFn={deleteIdentifiers}
        deleteError={deleteMerchantIdentifierError as RTKQueryErrorResponse}
        isDeleteSuccess={deleteMerchantIdentifierIsSuccess}
        isDeleteLoading={deleteMerchantIdentifierIsLoading}
        resetDeleteResponseFn={resetDeleteMerchantIdentifierResponse}
        isHarmoniaEntity
      />
    </Modal>
  )
}

export default DirectoryMerchantIdentifiersDeleteModal
