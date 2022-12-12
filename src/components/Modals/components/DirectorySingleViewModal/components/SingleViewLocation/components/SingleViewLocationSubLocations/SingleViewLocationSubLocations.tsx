import {useState} from 'react'
import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'
import {DirectoryLocation} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities} from 'utils/enums'

const SingleViewLocationSubLocations = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const [selectedUnlinkSubLocationIndex, setSelectedUnlinkSubLocationIndex] = useState(null) // The index of the secondary mid that is selected to be unlinked
  const [availableSubLocationNotification, setAvailableSubLocationNotification] = useState('')

  const {getMerchantLocationSubLocationsResponse, getMerchantLocationSubLocationsIsLoading} = useMidManagementLocationSubLocations({
    skipGetSubLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const hasNoLinkedSubLocations = (!getMerchantLocationSubLocationsResponse || getMerchantLocationSubLocationsResponse.length === 0) && !getMerchantLocationSubLocationsIsLoading

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
        link={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${ref}&sub_location_ref=${subLocationRef}`}
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
        handleClick={() => console.log('New Sub Location clicked')}
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

  const renderLinkedSubLocations = () => {
    if (hasNoLinkedSubLocations) {
      return <i className='font-body-4'>There are no Sub-Locations to view.</i>
    }
    return (
      <section>
        <h2 className='font-modal-heading'>SUB-LOCATIONS</h2>
        <div className='flex flex-col gap-[14px]'>
          {getMerchantLocationSubLocationsResponse.map((subLocation, index) => renderSubLocation(subLocation, index))}
        </div>
      </section>
    )
  }

  return (
    <div className='pb-[28px]'>
      <section className='h-[40px]'>
        {renderLinkNewSubLocationButton()}
      </section>
      <section className='font-body-4 text-red h-[40px]'>
        <p>{availableSubLocationNotification}</p>
      </section>
      {getMerchantLocationSubLocationsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedSubLocations()}
    </div>
  )
}
export default SingleViewLocationSubLocations
