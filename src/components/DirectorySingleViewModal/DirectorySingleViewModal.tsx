import {useRouter} from 'next/router'
import {Button, Modal, Tag} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset as merchantReset, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {reset as modalReset} from 'features/modalSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {DirectoryNavigationTab, DirectorySingleViewEntities} from 'utils/enums'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryEntity, DirectoryIdentifier, DirectoryLocation, DirectoryMid, DirectorySecondaryMid} from 'types'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import SingleViewMidDetails from './components/SingleViewMidDetails'
import SingleViewIdentifierDetails from './components/SingleViewIdentifierDetails'
import SingleViewSecondaryMidDetails from './components/SingleViewSecondaryMidDetails'
import CloseIcon from 'icons/svgs/close.svg'
// Temporary Mock Imports for testing
import {mockMidsData} from 'utils/mockMidsData'
import {mockIdentifiersData} from 'utils/mockIdentifiersData'
import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {mockLocationData} from 'utils/mockLocationData'

enum EntityApiLabel {
  MID = 'mid',
  SECONDARY_MID = 'secondary_mid',
  IDENTIFIER = 'identifier',
  LOCATION = 'location',
}

type EntityArray = DirectoryEntity[]

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
  } = useMidManagementMids(false, planId as string, merchantId as string, ref as string)

  const [tabSelected, setTabSelected] = useState('Details')
  const [entityHeading, setEntityHeading] = useState('')
  const [copyButtonClicked, setCopyButtonClicked] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isInDeleteState, setIsInDeleteState] = useState(false)

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

  useEffect(() => {
    // TODO: Placeholder logic to simulate using data from API when not in redux
    const getEntityFromApiResponse = (entityType: EntityApiLabel, apiEntityArray) => {
      const entityFromApi = apiEntityArray.find(entity => entity[`${entityType}_ref`] === ref)
      dispatch(setSelectedDirectoryMerchantEntity(entityFromApi))
      return entityFromApi
    }

    // Horrible function due to inconsistency between entity types in api
    const getDataFromEntity = (
      entityType: EntityApiLabel,
      apiEntityArray: EntityArray, // TODO: Placeholder, replace with function to get relevant API data if needed
      entityHeading: string,
      valueLabel: string // what metadata property to use to display in the table heading
    ) => {
      const entity = selectedEntity || getEntityFromApiResponse(entityType, apiEntityArray)
      setEntityHeading(`${entityHeading} - ` + entity[`${entityType}_metadata`][valueLabel])
    }

    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return getDataFromEntity(EntityApiLabel.MID, mockMidsData, 'MID', 'mid')
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return getDataFromEntity(EntityApiLabel.SECONDARY_MID, mockSecondaryMidsData, 'Secondary MID', 'secondary_mid')
      case DirectoryNavigationTab.IDENTIFIERS:
        return getDataFromEntity(EntityApiLabel.IDENTIFIER, mockIdentifiersData, 'Identifier', 'value')
      case DirectoryNavigationTab.LOCATIONS:
        return getDataFromEntity(EntityApiLabel.LOCATION, mockLocationData, 'Location', 'location')
      default:
        dispatch(merchantReset())
        dispatch(modalReset())
        router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=mids`)
    }
  }, [dispatch, selectedEntity, ref, tab, merchantId, planId, router])

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[57px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-850 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[57px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-850 dark:hover:text-white  hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return ['Details', 'Comments'].map(tab => (
      <button
        key={tab}
        className={tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => setTabSelected(tab)}
      >
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const renderEntityDetails = () => {
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return <SingleViewMidDetails setError={setErrorMessage} resetError={() => setErrorMessage(null)} />
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <SingleViewSecondaryMidDetails />
      case DirectoryNavigationTab.IDENTIFIERS:
        return <SingleViewIdentifierDetails/>
      case DirectoryNavigationTab.LOCATIONS:
        return <p>Placeholder for Locations</p>
    }
  }

  const renderComments = () => <i className='font-body-4'> There are no comments to view.</i> // TODO: Placeholder for comments

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
    setIsInDeleteState(false)
  }

  const isDeleting = deleteMerchantMidIsLoading || deleteMerchantSecondaryMidIsLoading || deleteMerchantLocationIsLoading || deleteMerchantIdentifierIsLoading

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={entityHeading} onCloseFn={closeSingleViewModal}>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[25px] min-h-[300px]'>
        {selectedEntity && tabSelected === 'Details' ? renderEntityDetails() : renderComments()}
      </div>
      <div className='flex justify-between items-center border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[14px]'>
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

        {isInDeleteState ? (
          <div className='flex items-center justify-between gap-[5px]'>
            <p className='font-body-4 text-red mr-[20px]'>Are you sure you want to delete this {singleViewEntityLabel}?</p>
            <Button
              handleClick={() => setIsInDeleteState(false)}
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
              <Button
                handleClick={() => setIsInDeleteState(true)}
                buttonType={ButtonType.SUBMIT}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.RED}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
              >Delete
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

export default DirectorySingleViewModal
