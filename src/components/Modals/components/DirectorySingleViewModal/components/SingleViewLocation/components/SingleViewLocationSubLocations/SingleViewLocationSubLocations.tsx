import {useEffect, useState, useCallback} from 'react'
import {useRouter} from 'next/router'
import {Button} from 'components'
import {DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryLocation, DirectoryLocationMetadata} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities, UserPermissions} from 'utils/enums'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'

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

  const {
    getMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading,
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocation: true,
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

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    postMerchantLocationSubLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      locationRef: ref as string,
      secondaryMidRef: '',
      ...locationMetadata,
    })
  }, [postMerchantLocationSubLocation, planId, merchantId, ref])

  const renderNewSubLocationForm = () => (
    <DirectoryMerchantLocationForm
      location={location}
      isNewLocationSubLocation={true}
      parentLocation={location.location_metadata.name}
      onSaveHandler={handleSave}
      setIsInEditState={setIsInEditState}
      onCancelHandler={onCancelEditState}
      isLoading={postMerchantLocationSubLocationIsLoading}
      isSuccess={postMerchantLocationSubLocationIsSuccess}
      resetResponse={resetPostMerchantLocationSubLocationResponse}
      error={postMerchantLocationSubLocationError}
    />
  )

  const renderSubLocation = (subLocation: DirectoryLocation, index: number) => {
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
        link={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${ref}&sub_location_ref=${subLocationRef}`}
        refValue={subLocationRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkSubLocationIndex}
        isInUnlinkingConfirmationState={selectedUnlinkSubLocationIndex === index}
        unlinkFn={() => console.log('Unlink actions occurred')}
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
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
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
      {isInEditState && renderNewSubLocationForm()}
    </div>
  )
}

export default SingleViewLocationSubLocations
