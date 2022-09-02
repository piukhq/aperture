import {
  AssetModal,
  CredentialsModal,
  DirectoryPlanModal,
  DirectoryPlanDeleteModal,
  DirectoryMerchantModal,
  DirectoryMerchantDeleteModal,
  DirectoryMidModal,
  DirectorySingleViewModal,
  DirectoryMerchantMidsDeleteModalContainer,
  DirectoryMerchantSecondaryMidsDeleteModalContainer,
  DirectoryMerchantLocationsDeleteModalContainer,
  DirectoryMerchantIdentifiersDeleteModalContainer,
  DirectoryCommentsModal,
} from 'components/Modals'
import {ModalType} from 'utils/enums'

type Props = {
  modalRequested: ModalType,
}

const ModalFactory = ({modalRequested}: Props) => {
  switch(modalRequested) {
    case ModalType.ASSET_COMPARATOR_ASSET: return <AssetModal />
    case ModalType.ASSET_COMPARATOR_CREDENTIALS: return <CredentialsModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PLAN: return <DirectoryPlanModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE: return <DirectoryPlanDeleteModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT: return <DirectoryMerchantModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE: return <DirectoryMerchantDeleteModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MID: return <DirectoryMidModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW: return <DirectorySingleViewModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MIDS_DELETE: return <DirectoryMerchantMidsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE: return <DirectoryMerchantSecondaryMidsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE: return <DirectoryMerchantLocationsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_IDENTIFIERS_DELETE: return <DirectoryMerchantIdentifiersDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_COMMENTS: return <DirectoryCommentsModal />
    default: return null
  }
}

export default ModalFactory