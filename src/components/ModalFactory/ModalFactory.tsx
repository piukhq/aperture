import {
  LogoutModal,
  AssetModal,
  BulkCommentModal,
  CredentialsModal,
  DirectorySchemeStatusModal,
  DirectoryPlanModal,
  DirectoryPlanDeleteModal,
  DirectoryMerchantModal,
  DirectoryMerchantDeleteModal,
  DirectoryMidModal,
  DirectorySecondaryMidModal,
  DirectoryLocationModal,
  DirectoryPsimiModal,
  DirectorySingleViewModal,
  DirectoryMerchantMidsDeleteModalContainer,
  DirectoryMerchantSecondaryMidsDeleteModalContainer,
  DirectoryMerchantLocationsDeleteModalContainer,
  DirectoryMerchantPsimisDeleteModalContainer,
  DirectoryFileUploadModal,
  DirectoryCommentsModal,
  DirectoryHarmoniaModal,
} from 'components/Modals'
import {ModalType} from 'utils/enums'
import {useAppSelector} from 'app/hooks'

type Props = {
  modalRequested: ModalType,
}

const ModalFactory = ({modalRequested}: Props) => {

  const planRef = useAppSelector(state => state.directoryPlan.plan_ref)
  const merchantRef = useAppSelector(state => state.directoryMerchant.selectedMerchant.merchant_ref)

  switch(modalRequested) {
    case ModalType.LOGOUT: return <LogoutModal />
    case ModalType.ASSET_COMPARATOR_ASSET: return <AssetModal />
    case ModalType.MID_MANAGEMENT_BULK_COMMENT: return <BulkCommentModal />
    case ModalType.MID_MANAGEMENT_BULK_HARMONIA: return <DirectoryHarmoniaModal />
    case ModalType.MID_MANAGEMENT_SCHEME_STATUS: return <DirectorySchemeStatusModal />
    case ModalType.ASSET_COMPARATOR_CREDENTIALS: return <CredentialsModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PLAN: return <DirectoryPlanModal key={planRef}/>
    case ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE: return <DirectoryPlanDeleteModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT: return <DirectoryMerchantModal key={merchantRef} />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_DELETE: return <DirectoryMerchantDeleteModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MID: return <DirectoryMidModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MID: return <DirectorySecondaryMidModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_LOCATION: return <DirectoryLocationModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PSIMI: return <DirectoryPsimiModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_SINGLE_VIEW: return <DirectorySingleViewModal />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MIDS_DELETE: return <DirectoryMerchantMidsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_SECONDARY_MIDS_DELETE: return <DirectoryMerchantSecondaryMidsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_LOCATIONS_DELETE: return <DirectoryMerchantLocationsDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PSIMIS_DELETE: return <DirectoryMerchantPsimisDeleteModalContainer />
    case ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_FILE_UPLOAD: return <DirectoryFileUploadModal isPlanLevelFileUpload />
    case ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT_FILE_UPLOAD: return <DirectoryFileUploadModal />
    case ModalType.MID_MANAGEMENT_COMMENTS: return <DirectoryCommentsModal />
    default: return null
  }
}

export default ModalFactory
