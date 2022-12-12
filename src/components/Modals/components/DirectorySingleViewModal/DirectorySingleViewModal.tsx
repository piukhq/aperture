import {useRouter} from 'next/router'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset as merchantReset} from 'features/directoryMerchantSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {DirectoryNavigationTab, DirectorySingleViewEntities} from 'utils/enums'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryPsimi, DirectoryLocation, DirectoryMid, DirectorySecondaryMid} from 'types'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
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
  const {merchantId, planId, tab, ref, sub_location_ref} = router.query

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
  } = useMidManagementMids({
    skipGetMids: true,
    skipGetMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    midRef: ref as string,
  })

  const {
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
  } = useMidManagementSecondaryMids({
    skipGetSecondaryMids: true,
    skipGetSecondaryMid: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    secondaryMidRef: ref as string,
  })

  const {
    deleteMerchantPsimi,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantPsimiIsLoading,
    deleteMerchantPsimiError,
    resetDeleteMerchantPsimiResponse,
  } = useMidManagementPsimis({
    skipGetPsimis: true,
    skipGetPsimi: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    psimiRef: ref as string,
  })

  const {
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const [entityHeading, setEntityHeading] = useState('')
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isInDeleteConfirmationState, setIsInDeleteConfirmationState] = useState(false)

  const [isInLocationEditState, setIsInLocationEditState] = useState(false)

  const [shouldDisplayFooterEditButton, setShouldDisplayFooterEditButton] = useState(false)
  const [shouldDisableEditButton, setShouldDisableEditButton] = useState(false)

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  const singleViewEntityLabel = DirectorySingleViewEntities[tab as string]

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
  }, [
    closeSingleViewModal,
    singleViewEntityLabel,
    deleteMerchantMidIsSuccess,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantLocationIsSuccess,
    deleteMerchantPsimiIsSuccess,
    deleteMerchantMidError,
    deleteMerchantSecondaryMidError,
    deleteMerchantLocationError,
    deleteMerchantPsimiError,
    resetDeleteMerchantMidResponse,
    resetDeleteMerchantSecondaryMidResponse,
    resetDeleteMerchantLocationResponse,
    resetDeleteMerchantPsimiResponse,
  ])

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyButtonClicked(true)
  }

  const handleDelete = () => {
    setErrorMessage(null)

    const refs = {planRef: planId as string, merchantRef: merchantId as string}

    switch (tab) {
      case DirectoryNavigationTab.MIDS: {
        const {mid_ref: midRef} = selectedEntity as DirectoryMid
        deleteMerchantMid({...refs, midRefs: [midRef]})
        break
      }
      case DirectoryNavigationTab.SECONDARY_MIDS: {
        const {secondary_mid_ref: secondaryMidRef} = selectedEntity as DirectorySecondaryMid
        deleteMerchantSecondaryMid({...refs, secondaryMidRefs: [secondaryMidRef]})
        break
      }
      case DirectoryNavigationTab.PSIMIS: {
        const {psimi_ref: psimiRef} = selectedEntity as DirectoryPsimi
        deleteMerchantPsimi({...refs, psimiRefs: [psimiRef]})
        break
      }
      case DirectoryNavigationTab.LOCATIONS: {
        const {location_ref: locationRef} = selectedEntity as DirectoryLocation
        deleteMerchantLocation({...refs, locationRefs: [locationRef]})
      }
    }
    setIsInDeleteConfirmationState(false)
  }

  const isDeleting = deleteMerchantMidIsLoading || deleteMerchantSecondaryMidIsLoading || deleteMerchantLocationIsLoading || deleteMerchantPsimiIsLoading

  const onCancelEditState = useCallback(() => {
    setIsInLocationEditState(false)
  }, [])

  const renderContent = () => {
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return (
          <SingleViewMid
            selectedEntity={selectedEntity}
            setError={setErrorMessage}
            resetError={() => setErrorMessage(null)}
            setHeaderFn={setEntityHeading}
          />
        )
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return (
          <SingleViewSecondaryMid selectedEntity={selectedEntity} setHeaderFn={setEntityHeading} />
        )
      case DirectoryNavigationTab.PSIMIS:
        return <SingleViewPsimi selectedEntity={selectedEntity} setHeaderFn={setEntityHeading} />
      case DirectoryNavigationTab.LOCATIONS:
        return <SingleViewLocation
          setHeaderFn={setEntityHeading}
          isInEditState={isInLocationEditState}
          onCancelEditState={onCancelEditState}
          setShouldDisplayEditButton={setShouldDisplayFooterEditButton}
          setShouldDisableEditButton={setShouldDisableEditButton}
          setIsInEditState={setIsInLocationEditState}
        />
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
          <p className='font-body-4 text-red px-[20px]'>Are you sure you want to delete this {singleViewEntityLabel}?</p>
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
            <p className='font-body-4 text-red'>{errorMessage}</p>
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
                isDisabled={shouldDisableEditButton}
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
              isDisabled={isDeleting}
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
