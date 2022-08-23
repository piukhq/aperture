import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import LinkedListItem from 'components/DirectorySingleViewModal/components/LinkedListItem'
import {useMidManagementSecondaryMidLocations} from 'hooks/useMidManagementSecondaryMidLocations'
import {DirectoryMerchantMidLocation} from 'types'
import {LinkableEntities} from 'utils/enums'

const SingleViewSecondaryMidLocations = () => { // TODO: Add functionality to add/remove new secondary mid locations
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const [selectedUnlinkLocationIndex, setSelectedUnlinkLocationIndex] = useState(null)

  const {
    getMerchantSecondaryMidLinkedLocationsResponse,
    getMerchantSecondaryMidLinkedLocationsIsLoading,
    deleteMerchantSecondaryMidLocationLink,
    deleteMerchantSecondaryMidLocationLinkIsSuccess,
    deleteMerchantSecondaryMidLocationLinkIsLoading,
    resetDeleteMerchantSecondaryMidLocationLinkResponse,
  } = useMidManagementSecondaryMidLocations({
    planRef: planId as string,
    merchantRef: merchantId as string,
    secondaryMidRef: ref as string,
  })

  useEffect(() => { // If the user has successfully unlinked a Location, revert to initial state
    if (deleteMerchantSecondaryMidLocationLinkIsSuccess) {
      resetDeleteMerchantSecondaryMidLocationLinkResponse()
      setSelectedUnlinkLocationIndex(null)
    }
  }, [deleteMerchantSecondaryMidLocationLinkIsSuccess, resetDeleteMerchantSecondaryMidLocationLinkResponse])

  const hasNoLocations = (!getMerchantSecondaryMidLinkedLocationsResponse || getMerchantSecondaryMidLinkedLocationsResponse.length === 0) && !getMerchantSecondaryMidLinkedLocationsIsLoading

  const renderLinkLocationButton = () => (
    <section className='flex justify-end items-center mb-[10px]'>
      <Button
        handleClick={() => console.log('Link New Location placeholder')}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[12px] leading-[12px]'
      >Link New Location
      </Button>
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
        key={index}
        index={index}
        value={locationTitle}
        refValue={locationRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkLocationIndex}
        isInUnlinkingConfirmationState={selectedUnlinkLocationIndex === index}
        unlinkFn={() => deleteMerchantSecondaryMidLocationLink({
          linkRef,
          planRef: planId as string,
          merchantRef: merchantId as string,
        })}
        isUnlinking={deleteMerchantSecondaryMidLocationLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={() => console.log('Placeholder setShouldRenderDropdownMenuFn')}
        entityType={LinkableEntities.LOCATION}
      />
    )
  }

  const renderLocations = () => {
    if (hasNoLocations) {
      return <i className='font-body-4'>There are no Locations to view.</i>
    }
    return (
      <>
        <section>
          <h2 className='font-single-view-heading'>LINKED LOCATIONS</h2>
          <div className='flex flex-col gap-[14px]'>
            {getMerchantSecondaryMidLinkedLocationsResponse.map((secondaryMidLocation: DirectoryMerchantMidLocation, index) => renderLocation(secondaryMidLocation, index))}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='pb-[28px]'>
      {renderLinkLocationButton()}
      {getMerchantSecondaryMidLinkedLocationsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLocations()}
    </div>
  )
}
export default SingleViewSecondaryMidLocations
