import {useState, useEffect} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import LinkedListItem from 'components/Modals/components/DirectorySingleViewModal/components/LinkedListItem'
import SingleViewCombobox from '../../../SingleViewCombobox'
import {useDirectorySecondaryMidLocations} from 'hooks/useDirectorySecondaryMidLocations'
import {DirectoryLocation, DirectoryMerchantMidLocation} from 'types'
import {LinkableEntities, UserPermissions} from 'utils/enums'
import CloseIcon from 'icons/svgs/close.svg'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {useAppDispatch} from 'app/hooks'

const SingleViewSecondaryMidLocations = () => { // TODO: Add functionality to add/remove new secondary mid locations
  const {merchantId, planId, ref} = useGetRouterQueryString()
  const dispatch = useAppDispatch()

  const [shouldRenderDropdownMenu, setShouldRenderDropdownMenu] = useState(false)
  const [shouldGetAvailableLocations, setShouldGetAvailableLocations] = useState(false)
  const [selectedAvailableLocation, setSelectedAvailableLocation] = useState(null)
  const [selectedUnlinkLocationIndex, setSelectedUnlinkLocationIndex] = useState(null)
  const [availableLocationNotification, setAvailableLocationNotification] = useState('No Locations available to link for this Secondary MID') // TODO: Placeholder for future location functionality changes

  const {
    getMerchantSecondaryMidLinkedLocationsResponse,
    getMerchantSecondaryMidLinkedLocationsIsLoading,
    postMerchantSecondaryMidLocationLink,
    postMerchantSecondaryMidLocationLinkIsSuccess,
    postMerchantSecondaryMidLocationLinkIsLoading,
    resetPostMerchantSecondaryMidLocationLinkResponse,
    deleteMerchantSecondaryMidLocationLink,
    deleteMerchantSecondaryMidLocationLinkIsSuccess,
    deleteMerchantSecondaryMidLocationLinkIsLoading,
    resetDeleteMerchantSecondaryMidLocationLinkResponse,
  } = useDirectorySecondaryMidLocations({
    planRef: planId,
    merchantRef: merchantId,
    secondaryMidRef: ref,
  })

  const {
    getMerchantLocationsResponse: locationsData,
    getMerchantLocationsIsLoading: locationsDataIsLoading,
    getMerchantLocationsRefresh: locationsDataRefresh,
  } = useDirectoryLocations({
    skipGetLocations: false,
    skipGetLocation: true,
    skipGetLocationsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    secondaryMidRef: ref,
    getAll: true,
  })

  useEffect(() => { // If the user has successfully unlinked a Location, revert to initial state
    if (deleteMerchantSecondaryMidLocationLinkIsSuccess) {
      resetDeleteMerchantSecondaryMidLocationLinkResponse()
      setSelectedUnlinkLocationIndex(null)
    }
  }, [deleteMerchantSecondaryMidLocationLinkIsSuccess, dispatch, locationsDataRefresh, resetDeleteMerchantSecondaryMidLocationLinkResponse])

  useEffect(() => { // If the user has successfully linked a Location, revert to initial state
    if (postMerchantSecondaryMidLocationLinkIsSuccess) {
      resetPostMerchantSecondaryMidLocationLinkResponse()
      setShouldGetAvailableLocations(false)
      setSelectedAvailableLocation(null)
      setShouldRenderDropdownMenu(false)
    }
  }, [dispatch, locationsDataRefresh, postMerchantSecondaryMidLocationLinkIsSuccess, resetPostMerchantSecondaryMidLocationLinkResponse])


  useEffect(() => { // If the user has clicked the 'Add Location' button, get the available locations
    if (shouldGetAvailableLocations) {
      locationsDataRefresh()
      setShouldRenderDropdownMenu(true)
    }
  }, [setShouldRenderDropdownMenu, shouldGetAvailableLocations, locationsDataRefresh, selectedUnlinkLocationIndex])

  useEffect(() => { // If there is no available locations, set the available location notification
    if (shouldRenderDropdownMenu && !locationsDataIsLoading && locationsData.length === 0 && selectedUnlinkLocationIndex === null) {
      setAvailableLocationNotification('No Locations available to link for this Secondary MID')
    } else {
      setAvailableLocationNotification('')
    }
  }, [locationsData, locationsDataIsLoading, selectedUnlinkLocationIndex, shouldRenderDropdownMenu])

  const hasNoLinkedLocations = (!getMerchantSecondaryMidLinkedLocationsResponse || getMerchantSecondaryMidLinkedLocationsResponse.length === 0) && !getMerchantSecondaryMidLinkedLocationsIsLoading

  const renderAvailableLocationsDropdown = () => {
    const onCloseHandler = () => {
      setShouldGetAvailableLocations(false)
      setSelectedAvailableLocation(null)
      setShouldRenderDropdownMenu(false)
    }

    const onSaveHandler = () => {
      if(selectedAvailableLocation) {
        postMerchantSecondaryMidLocationLink({
          planRef: planId,
          merchantRef: merchantId,
          secondaryMidRef: ref,
          locationRef: selectedAvailableLocation.location_ref,
        })
      }
    }

    return (
      <div className='flex items-center justify-end gap-[10px] mb-[26px]'>
        <div className='h-[36px] w-full'>
          <SingleViewCombobox
            selectedEntity={selectedAvailableLocation}
            availableEntities={locationsData}
            entityValueFn={(entity: DirectoryLocation) => entity?.location_metadata?.name}
            onChangeFn={setSelectedAvailableLocation}
            entityLabel = 'Location'
            isDisabled={postMerchantSecondaryMidLocationLinkIsLoading}
          />
        </div>

        <div className='flex items-center gap-[10px]'>
          <Button
            handleClick={!postMerchantSecondaryMidLocationLinkIsLoading ? onSaveHandler : null}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Save Location'}
          >{ postMerchantSecondaryMidLocationLinkIsLoading ? 'Saving...' : 'Save'}
          </Button>

          <Button
            handleClick={onCloseHandler}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            ariaLabel='Cancel Location Link'
          ><CloseIcon className='w-[14px] h-[14px] fill-grey-700' />
          </Button>
        </div>
      </div>
    )
  }

  const renderLinkLocationButton = () => ( // TODO: To be refactored to similar pattern as Location Mids/Secondary Mids
    <section className='flex flex-col justify-center items-end'>
      <Button
        handleClick={() => setShouldGetAvailableLocations(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[.75rem] leading-3'
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >Link New Location
      </Button>

      <div className='h-[20px] mt-[6px]'>
        {locationsData?.length === 0 && !locationsDataIsLoading && shouldRenderDropdownMenu && (
          <p role='alert' className='font-body text-[.75rem] text-red'>{availableLocationNotification}</p>
        )}
      </div>
    </section>
  )

  const renderLocation = (secondaryMidLocation: DirectoryMerchantMidLocation, index: number) => {
    const {
      location_title: locationTitle,
      link_ref: linkRef,
      location_ref: locationRef,
    } = secondaryMidLocation

    return (
      <LinkedListItem
        key={locationRef}
        index={index}
        value={locationTitle}
        link={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${locationRef}`}
        refValue={locationRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkLocationIndex}
        isInUnlinkingConfirmationState={selectedUnlinkLocationIndex === index}
        unlinkFn={() => deleteMerchantSecondaryMidLocationLink({
          linkRef,
          planRef: planId,
          merchantRef: merchantId,
          secondaryMidRef: ref,
        })}
        isUnlinking={deleteMerchantSecondaryMidLocationLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={setShouldRenderDropdownMenu}
        entityType={LinkableEntities.LOCATION}
        setNewLinkNotificationFn={setAvailableLocationNotification}
      />
    )
  }

  const renderLocations = () => {
    if (hasNoLinkedLocations) {
      return <i className='font-body-4'>There are no Locations to view.</i>
    }
    return (
      <section>
        <h2 className='font-modal-heading'>LINKED LOCATIONS</h2>
        <div className='flex flex-col gap-[14px]'>
          {getMerchantSecondaryMidLinkedLocationsResponse.map((secondaryMidLocation: DirectoryMerchantMidLocation, index) => renderLocation(secondaryMidLocation, index))}
        </div>
      </section>
    )
  }

  return (
    <div className='pb-[28px]'>
      {shouldRenderDropdownMenu && locationsData.length > 0 ? renderAvailableLocationsDropdown() : renderLinkLocationButton()}
      {getMerchantSecondaryMidLinkedLocationsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLocations()}
    </div>
  )
}
export default SingleViewSecondaryMidLocations
