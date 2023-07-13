import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset as merchantReset} from 'features/directoryMerchantSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {DirectoryNavigationTab, DirectorySingleViewEntities, UserPermissions} from 'utils/enums'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryPsimi, DirectoryLocation, DirectoryMid, DirectorySecondaryMid, DirectoryEntity} from 'types'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import CloseIcon from 'icons/svgs/close.svg'
import SingleViewMid from './components/SingleViewMid'
import SingleViewPsimi from './components/SingleViewPsimi'
import SingleViewSecondaryMid from './components/SingleViewSecondaryMid'
import SingleViewLocation from './components/SingleViewLocation'
import SingleViewSubLocation from './components/SingleViewSubLocation'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'

const DirectorySingleViewModal = () => {
  const router = useRouter()
  const {merchantId, planId = '', tab = '', ref, sub_location_ref} = useGetRouterQueryString()

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
  } = useDirectoryMids({
    skipGetMids: true,
    skipGetMid: true,
    skipGetMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    midRef: ref,
  })

  const {
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMids: true,
    skipGetSecondaryMid: true,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    secondaryMidRef: ref,
  })

  const {
    deleteMerchantPsimi,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantPsimiIsLoading,
    deleteMerchantPsimiError,
    resetDeleteMerchantPsimiResponse,
  } = useDirectoryPsimis({
    skipGetPsimis: true,
    skipGetPsimisByPage: true,
    skipGetPsimi: true,
    planRef: planId,
    merchantRef: merchantId,
    psimiRef: ref,
  })

  const {
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  } = useDirectoryLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    skipGetLocationsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    locationRef: ref,
  })

  const selectedEntity: DirectoryEntity | null = useAppSelector(getSelectedDirectoryMerchantEntity)
  const [entityHeading, setEntityHeading] = useState<string>('')
  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isInDeleteConfirmationState, setIsInDeleteConfirmationState] = useState<boolean>(false)
  const [isInLocationEditState, setIsInLocationEditState] = useState<boolean>(false)
  const [isEntityFound, setIsEntityFound] = useState<boolean>(false)
  const [shouldDisplayFooterEditButton, setShouldDisplayFooterEditButton] = useState<boolean>(false)
  const [entityRef, setEntityRef] = useState<string>('')

  useEffect(() => { // TODO: Set the entityRef as the ref of the selected entity, needs rethink of how we do types to be smarter
    if (selectedEntity) {
      if (tab === DirectoryNavigationTab.MIDS) {
        const {mid_ref} = selectedEntity as DirectoryMid
        setEntityRef(mid_ref)
      } else if (tab === DirectoryNavigationTab.SECONDARY_MIDS) {
        const {secondary_mid_ref} = selectedEntity as DirectorySecondaryMid
        setEntityRef(secondary_mid_ref)
      } else if (tab === DirectoryNavigationTab.LOCATIONS) {
        const {location_ref} = selectedEntity as DirectoryLocation
        setEntityRef(location_ref)
      } else if (tab === DirectoryNavigationTab.PSIMIS) {
        const {psimi_ref} = selectedEntity as DirectoryPsimi
        setEntityRef(psimi_ref)
      }
    }
  }, [selectedEntity, tab])


  const dispatch = useAppDispatch()
  const singleViewEntityLabel = DirectorySingleViewEntities[tab]

  const closeSingleViewModal = useCallback(() => {
    dispatch(merchantReset())
    dispatch(requestModal(ModalType.NO_MODAL))
    router.isReady && router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}`)
  }, [dispatch, router, planId, merchantId, tab])

  useEffect(() => {
    if (deleteMerchantMidIsSuccess || deleteMerchantSecondaryMidIsSuccess || deleteMerchantLocationIsSuccess || deleteMerchantPsimiIsSuccess) {
      deleteMerchantMidIsSuccess && resetDeleteMerchantMidResponse()
      deleteMerchantSecondaryMidIsSuccess && resetDeleteMerchantSecondaryMidResponse()
      deleteMerchantLocationIsSuccess && resetDeleteMerchantLocationResponse()
      deleteMerchantPsimiIsSuccess && resetDeleteMerchantPsimiResponse()
      closeSingleViewModal()
    } else if (deleteMerchantMidError || deleteMerchantSecondaryMidError || deleteMerchantLocationError || deleteMerchantPsimiError) {
      setErrorMessage(`Failed to delete ${singleViewEntityLabel}`)
    }
  }, [closeSingleViewModal, singleViewEntityLabel, deleteMerchantMidIsSuccess, deleteMerchantSecondaryMidIsSuccess, deleteMerchantLocationIsSuccess, deleteMerchantPsimiIsSuccess, deleteMerchantMidError, deleteMerchantSecondaryMidError, deleteMerchantLocationError, deleteMerchantPsimiError, resetDeleteMerchantMidResponse, resetDeleteMerchantSecondaryMidResponse, resetDeleteMerchantLocationResponse, resetDeleteMerchantPsimiResponse, dispatch])

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyButtonClicked(true)
  }

  const handleDelete = () => {
    setErrorMessage('')
    const refs = {planRef: planId, merchantRef: merchantId}
    switch (tab) {
      case DirectoryNavigationTab.MIDS: {
        deleteMerchantMid({...refs, midRefs: [entityRef]})
        break
      }
      case DirectoryNavigationTab.SECONDARY_MIDS: {
        deleteMerchantSecondaryMid({...refs, secondaryMidRefs: [entityRef]})
        break
      }
      case DirectoryNavigationTab.PSIMIS: {
        deleteMerchantPsimi({...refs, psimiRefs: [entityRef]})
        break
      }
      case DirectoryNavigationTab.LOCATIONS: {
        deleteMerchantLocation({...refs, locationRefs: [entityRef]})
      }
    }
    setIsInDeleteConfirmationState(false)
  }

  const isDeleting = deleteMerchantMidIsLoading || deleteMerchantSecondaryMidIsLoading || deleteMerchantLocationIsLoading || deleteMerchantPsimiIsLoading

  const onCancelEditState = useCallback(() => {
    setIsInLocationEditState(false)
  }, [])

  const renderContent = () => {
    if (!selectedEntity) { return <div /> }
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return (
          <SingleViewMid
            key={entityRef}
            selectedEntity={selectedEntity}
            setError={setErrorMessage}
            resetError={() => setErrorMessage('')}
            setHeaderFn={setEntityHeading}
            setIsEntityFound={setIsEntityFound}
          />
        )
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return (
          <SingleViewSecondaryMid key={entityRef} selectedEntity={selectedEntity} setHeaderFn={setEntityHeading} setIsEntityFound={setIsEntityFound}/>
        )
      case DirectoryNavigationTab.PSIMIS:
        return <SingleViewPsimi key={entityRef} selectedEntity={selectedEntity} setHeaderFn={setEntityHeading} setIsEntityFound={setIsEntityFound}/>
      case DirectoryNavigationTab.LOCATIONS:
        if (sub_location_ref) {
          return (
            <SingleViewSubLocation
              key={entityRef}
              selectedEntity={selectedEntity}
              setHeaderFn={setEntityHeading}
              isInEditState={isInLocationEditState}
              setIsInEditState={setIsInLocationEditState}
              onCancelEditState={onCancelEditState}
              setShouldDisplayEditButton={setShouldDisplayFooterEditButton}
              setIsEntityFound={setIsEntityFound}
            />
          )
        } else {
          return (
            <SingleViewLocation
              key={entityRef}
              selectedEntity={selectedEntity}
              setHeaderFn={setEntityHeading}
              isInEditState={isInLocationEditState}
              setIsInEditState={setIsInLocationEditState}
              onCancelEditState={onCancelEditState}
              setShouldDisplayEditButton={setShouldDisplayFooterEditButton}
              setIsEntityFound={setIsEntityFound}
            />
          )
        }
    }
  }

  const renderFormButtons = () => (
    <>
      <Button
        handleClick={handleCopyLinkClick}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.LIGHT_GREY}
        labelColour={LabelColour.GREY}
        labelWeight={LabelWeight.SEMIBOLD}
      ><LinkSvg />{copyButtonClicked ? 'Copied' : 'Copy link'}
      </Button>

      {isInDeleteConfirmationState ? (
        <div className='flex items-center justify-between gap-[5px]'>
          <p role='alert' className='font-body-4 text-red px-[20px]'>Are you sure you want to delete this {singleViewEntityLabel}?</p>
          <Button
            handleClick={() => setIsInDeleteConfirmationState(false)}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            ariaLabel={`Close ${singleViewEntityLabel} delete`}
          ><CloseIcon className='w-[14px] h-[14px] fill-grey-600' />
          </Button>

          <Button
            handleClick={handleDelete}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.RED}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={`Delete ${singleViewEntityLabel}`}
          >Yes, Delete
          </Button>
        </div>
      ) : (
        <>
          {errorMessage && (
            <p role='alert' className='font-body-4 text-red'>{errorMessage}</p>
          )}
          <div className='flex gap-[15px]'>
            {tab === DirectoryNavigationTab.LOCATIONS && shouldDisplayFooterEditButton && !isDeleting && (
              <Button
                handleClick={() => setIsInLocationEditState(true)}
                buttonType={ButtonType.SUBMIT}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
                isDisabled={!isEntityFound}
                requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
              >Edit
              </Button>
            )}
            <Button
              handleClick={() => setIsInDeleteConfirmationState(true)}
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={ButtonWidth.MEDIUM}
              buttonBackground={ButtonBackground.RED}
              labelColour={LabelColour.WHITE}
              labelWeight={LabelWeight.SEMIBOLD}
              isDisabled={isDeleting || !isEntityFound}
              requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE}
            >{isDeleting ? 'Deleting' : 'Delete'}
            </Button>
          </div>
        </>
      )}
    </>
  )

  const handleModelClose = useCallback(() => {
    resetDeleteMerchantMidResponse()
    resetDeleteMerchantSecondaryMidResponse()
    resetDeleteMerchantLocationResponse()
    resetDeleteMerchantPsimiResponse()
    closeSingleViewModal()
  }, [
    resetDeleteMerchantMidResponse,
    resetDeleteMerchantSecondaryMidResponse,
    resetDeleteMerchantLocationResponse,
    resetDeleteMerchantPsimiResponse,
    closeSingleViewModal,
  ])

  if (ref) {
    return (
      <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={entityHeading} onCloseFn={handleModelClose}>
        {renderContent()}
        {/* Form buttons shall appear except when editing a location, then the EditLocationForm will handle the form's buttons */}
        {!(tab === DirectoryNavigationTab.LOCATIONS && isInLocationEditState) && (
          <div className='flex justify-between items-center border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[14px]'>
            {renderFormButtons()}
          </div>
        )}
      </Modal>
    )
  }

  return null
}

export default DirectorySingleViewModal
