import {useRouter} from 'next/router'
import {Button, Modal, Tag} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset as merchantReset} from 'features/directoryMerchantSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {DirectoryNavigationTab, DirectorySingleViewEntities} from 'utils/enums'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryIdentifier, DirectoryLocation, DirectoryMid, DirectorySecondaryMid} from 'types'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import CloseIcon from 'icons/svgs/close.svg'
import SingleViewMid from './components/SingleViewMid'
import SingleViewIdentifier from './components/SingleViewIdentifier'
import SingleViewSecondaryMid from './components/SingleViewSecondaryMid'
import SingleViewLocation from './components/SingleViewLocation'

const DirectorySingleViewModal = () => {
  const router = useRouter()
  const {merchantId, planId, tab, ref} = router.query

  const {
    deleteMerchantMid,
    deleteMerchantMidIsSuccess,
    deleteMerchantMidIsLoading,
    deleteMerchantMidError,
    resetDeleteMerchantMidResponse,
    deleteMerchantSecondaryMid,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantSecondaryMidIsLoading,
    deleteMerchantSecondaryMidError,
    resetDeleteMerchantSecondaryMidResponse,
    deleteMerchantLocation,
    deleteMerchantLocationIsSuccess,
    deleteMerchantLocationIsLoading,
    deleteMerchantLocationError,
    resetDeleteMerchantLocationResponse,
    deleteMerchantIdentifier,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantIdentifierIsLoading,
    deleteMerchantIdentifierError,
    resetDeleteMerchantIdentifierResponse,
  } = useMidManagementMids(true, planId as string, merchantId as string, ref as string)

  const [entityHeading, setEntityHeading] = useState('')
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isInDeleteConfirmationState, setIsInDeleteConfirmationState] = useState(false)

  const [isInLocationEditState, setIsInLocationEditState] = useState(false)

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  const singleViewEntityLabel = DirectorySingleViewEntities[tab as string]

  const closeSingleViewModal = useCallback(() => {
    dispatch(merchantReset())
    router.isReady && router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}`)
  }, [dispatch, router, planId, merchantId, tab])

  useEffect(() => {
    if (deleteMerchantMidIsSuccess || deleteMerchantSecondaryMidIsSuccess || deleteMerchantLocationIsSuccess || deleteMerchantIdentifierIsSuccess) {
      deleteMerchantMidIsSuccess && resetDeleteMerchantMidResponse()
      deleteMerchantSecondaryMidIsSuccess && resetDeleteMerchantSecondaryMidResponse()
      deleteMerchantLocationIsSuccess && resetDeleteMerchantLocationResponse()
      deleteMerchantIdentifierIsSuccess && resetDeleteMerchantIdentifierResponse()
      closeSingleViewModal()
    } else if (deleteMerchantMidError || deleteMerchantSecondaryMidError || deleteMerchantLocationError || deleteMerchantIdentifierError) {
      setErrorMessage(`Failed to delete ${singleViewEntityLabel}`)
    }
  }, [
    closeSingleViewModal,
    singleViewEntityLabel,
    deleteMerchantMidIsSuccess,
    deleteMerchantSecondaryMidIsSuccess,
    deleteMerchantLocationIsSuccess,
    deleteMerchantIdentifierIsSuccess,
    deleteMerchantMidError,
    deleteMerchantSecondaryMidError,
    deleteMerchantLocationError,
    deleteMerchantIdentifierError,
    resetDeleteMerchantMidResponse,
    resetDeleteMerchantSecondaryMidResponse,
    resetDeleteMerchantLocationResponse,
    resetDeleteMerchantIdentifierResponse,
  ])

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopyButtonClicked(true)
  }

  const handleDelete = () => {
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
      case DirectoryNavigationTab.IDENTIFIERS: {
        const {identifier_ref: identifierRef} = selectedEntity as DirectoryIdentifier
        deleteMerchantIdentifier({...refs, identifierRefs: [identifierRef]})
        break
      }
      case DirectoryNavigationTab.LOCATIONS: {
        const {location_ref: locationRef} = selectedEntity as DirectoryLocation
        deleteMerchantLocation({...refs, locationRefs: [locationRef]})
      }
    }
    setIsInDeleteConfirmationState(false)
  }

  const isDeleting = deleteMerchantMidIsLoading || deleteMerchantSecondaryMidIsLoading || deleteMerchantLocationIsLoading || deleteMerchantIdentifierIsLoading

  const renderContent = () => {
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return <SingleViewMid setError={setErrorMessage} resetError={() => setErrorMessage(null)} setHeaderFn={setEntityHeading} />
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <SingleViewSecondaryMid setHeaderFn={setEntityHeading} />
      case DirectoryNavigationTab.IDENTIFIERS:
        return <SingleViewIdentifier setHeaderFn={setEntityHeading} />
      case DirectoryNavigationTab.LOCATIONS:
        return <SingleViewLocation setHeaderFn={setEntityHeading} isInEditState={isInLocationEditState} />
    }
  }

  const renderFormButtons = () => {
    if (tab === DirectoryNavigationTab.LOCATIONS && isInLocationEditState) {
      return (
        <div className='flex w-full justify-end items-center gap-[15px]'>
          <Button
            handleClick={() => setIsInLocationEditState(false)}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel='Cancel location edit'
          >Cancel
          </Button>

          <Button
            handleClick={() => null}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel='Save location edit'
          >Save
          </Button>
        </div>
      )
    }

    return (
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
            <p className='font-body-4 text-red mr-[20px]'>Are you sure you want to delete this {singleViewEntityLabel}?</p>
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
            {isDeleting ? (
              <Tag
                tagSize={TagSize.SINGLE_VIEW_MID_MEDIUM}
                textStyle={TextStyle.MEDIUM}
                textColour={TextColour.WHITE}
                tagStyle={TagStyle.RED_FILLED}
                label='Deleting...'
              />
            ) : (
              <div className='flex gap-[15px]'>
                {tab === DirectoryNavigationTab.LOCATIONS && (
                  <Button
                    handleClick={() => setIsInLocationEditState(true)}
                    buttonType={ButtonType.SUBMIT}
                    buttonSize={ButtonSize.MEDIUM}
                    buttonWidth={ButtonWidth.MEDIUM}
                    buttonBackground={ButtonBackground.LIGHT_GREY}
                    labelColour={LabelColour.GREY}
                    labelWeight={LabelWeight.SEMIBOLD}
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
                >Delete
                </Button>
              </div>
            )}
          </>
        )}
      </>
    )
  }

  const handleModelClose = useCallback(() => {
    resetDeleteMerchantMidResponse()
    resetDeleteMerchantSecondaryMidResponse()
    resetDeleteMerchantLocationResponse()
    resetDeleteMerchantIdentifierResponse()
    closeSingleViewModal()
  }, [
    resetDeleteMerchantMidResponse,
    resetDeleteMerchantSecondaryMidResponse,
    resetDeleteMerchantLocationResponse,
    resetDeleteMerchantIdentifierResponse,
    closeSingleViewModal,
  ])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={entityHeading} onCloseFn={handleModelClose}>
      {renderContent()}

      <div className='flex justify-between items-center border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[14px]'>
        {renderFormButtons()}
      </div>
    </Modal>
  )
}

export default DirectorySingleViewModal
