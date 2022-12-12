import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button} from 'components'
import {DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'
import {DirectoryLocation} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities} from 'utils/enums'

type Props = {
  location: DirectoryLocation,
  isInEditState: boolean,
  setIsInEditState: (isInEditState: boolean) => void,
  onCancelEditState: () => void,
}

const SingleViewLocationSubLocations = ({location, isInEditState, setIsInEditState, onCancelEditState}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const [selectedUnlinkSubLocationIndex, setSelectedUnlinkSubLocationIndex] = useState(null) // The index of the sub-location that is selected to be unlinked
  const [availableSubLocationNotification, setAvailableSubLocationNotification] = useState('')

  const {getMerchantLocationSubLocationsResponse, getMerchantLocationSubLocationsIsLoading} = useMidManagementLocationSubLocations({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const hasNoLinkedSubLocations = (!getMerchantLocationSubLocationsResponse || getMerchantLocationSubLocationsResponse.length === 0) && !getMerchantLocationSubLocationsIsLoading

  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  const renderNewSubLocationForm = () => (
    <DirectoryMerchantLocationForm
      location={location}
      isSubLocation={true}
      parentLocationStrings={null}
      parentLocation={location.location_metadata.name}
      parentLocationChangeHandler={null}
      onSaveHandler={null}
      onCancelHandler={onCancelEditState}
      isLoading={null}
      error={null}
    />
  )


  const renderSubLocation = (subLocation: DirectoryLocation, index) => {
    const {
      location_metadata: subLocationMetadata,
      location_ref: subLocationRef,
    } = subLocation

    const {
      name,
      address_line_1: addressLine1,
      postcode,
    } = subLocationMetadata

    return (
      <LinkedListItem
        key={subLocationRef}
        index={index}
        value={`${name}, ${addressLine1}, ${postcode}`}
        link={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${subLocationRef}`}
        refValue={subLocationRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkSubLocationIndex}
        isInUnlinkingConfirmationState={selectedUnlinkSubLocationIndex === index}
        unlinkFn={() => console.log('Unlink actions occured')}
        isUnlinking={false}
        setShouldRenderNewLinkDropdownMenuFn={() => false}
        setNewLinkNotificationFn={setAvailableSubLocationNotification}
        entityType={LinkableEntities.LOCATION}
      />
    )
  }

  const renderLinkNewSubLocationButton = () => (
    <div className='flex justify-end items-center'>
      <Button
        handleClick={() => setIsInEditState(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[.75rem] leading-3'
      >New Sub-location
      </Button>
    </div>
  )

  const renderLinkedSubLocations = () => (
    <section>
      <h2 className='font-modal-heading'>SUB-LOCATIONS</h2>
      <div className='flex flex-col gap-[14px]'>
        {getMerchantLocationSubLocationsResponse.map((subLocation, index) => renderSubLocation(subLocation, index))}
      </div>
    </section>
  )

  const renderNewSubLocationButtons = () => (
    <div className='flex justify-end items-center gap-[14px]'>dkopokp </div>
  )

  if (!getMerchantLocationSubLocationsResponse && !hasNoLinkedSubLocations) { return <i className='font-body-4'>Loading...</i> }

  if (isInEditState) { return renderNewSubLocationForm() }


  return (
    <div className='pb-[28px]'>
      {hasNoLinkedSubLocations && (
        <section className='font-body-4 h-[40px] mb-[20px]'>
          <p>Creating a sub-location will make {location.location_metadata.name} non-physical. Any address details for this location will be copied to the new sub-location but can be edited. Continue?</p>
        </section>
      )}
      <section className='h-[40px]'>
        {renderLinkNewSubLocationButton()}
      </section>
      <section className='font-body-4 text-red h-[40px]'>
        <p>{availableSubLocationNotification}</p>
      </section>
      {!hasNoLinkedSubLocations && renderLinkedSubLocations()}
      {isInEditState && renderNewSubLocationButtons()}
    </div>
  )
}
export default SingleViewLocationSubLocations
