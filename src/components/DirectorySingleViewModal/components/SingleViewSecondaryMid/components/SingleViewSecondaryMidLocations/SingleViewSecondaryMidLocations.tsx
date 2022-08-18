import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementSecondaryMidLocations} from 'hooks/useMidManagementSecondaryMidLocations'
import SecondaryMidLocationsListItem from './components/SecondaryMidLocationsListItem'
import {DirectoryMerchantMidLocation} from 'types'


const SingleViewSecondaryMidLocations = () => { // TODO: Add functionality to add/remove new secondary mid locations
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {
    getMerchantSecondaryMidLocationsResponse,
    getMerchantSecondaryMidLocationsIsLoading,
  } = useMidManagementSecondaryMidLocations({
    planRef: planId as string,
    merchantRef: merchantId as string,
    secondaryMidRef: ref as string,
  })

  const hasNoLocations = (!getMerchantSecondaryMidLocationsResponse || getMerchantSecondaryMidLocationsResponse.length === 0) && !getMerchantSecondaryMidLocationsIsLoading

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

  const renderLocation = (secondaryMidLocation: DirectoryMerchantMidLocation) => {
    const {location_title: locationTitle} = secondaryMidLocation
    return <SecondaryMidLocationsListItem key={locationTitle} locationTitle={locationTitle} /> // TODO: Swap to use existing MidsListItem component when functionality is required
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
            {getMerchantSecondaryMidLocationsResponse.map((secondaryMidLocation: DirectoryMerchantMidLocation) => renderLocation(secondaryMidLocation))}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='pb-[28px]'>
      {renderLinkLocationButton()}
      {getMerchantSecondaryMidLocationsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLocations()}
    </div>
  )
}
export default SingleViewSecondaryMidLocations
