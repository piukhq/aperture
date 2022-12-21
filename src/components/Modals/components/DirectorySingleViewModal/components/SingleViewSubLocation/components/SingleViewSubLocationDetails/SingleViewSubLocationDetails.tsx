import {useCallback, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Button, DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryLocationMetadata, DirectorySubLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'

type Props = {
  isInEditState: boolean
  setIsInEditState: (isInEditState: boolean) => void
  location: DirectorySubLocation
  onCancelEditState: () => void
  handleRefresh: () => void
  isRefreshing: boolean
}

const SingleViewSubLocationDetails = ({isInEditState, location, setIsInEditState, onCancelEditState, handleRefresh, isRefreshing}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref, sub_location_ref: subLocationRef} = router.query

  const {parent_location: parentLocation, sub_location: subLocation} = location
  const {location_ref: parentLocationRef, location_title: parentLocationTitle} = parentLocation

  const {
    date_added: dateAdded,
    location_metadata,
  } = subLocation

  const {
    address_line_1: addressLine1,
    address_line_2: addressLine2,
    town_city: townCity,
    county,
    country,
    postcode,
    is_physical_location: isPhysicalLocation,
  } = location_metadata

  // Take component out of edit state when unmounted
  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  const renderReadOnlyState = () => {
    return (
      <>
        <div data-testid='sub-location-refresh-button' className='flex justify-end mb-[12px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            handleClick={handleRefresh}
            ariaLabel='Refresh Sub-location details'
            isDisabled={isRefreshing}
          ><RefreshSvg />{isRefreshing ? 'Refreshing' : 'Refresh'}
          </Button>
        </div>

        <div className='grid grid-cols-2 gap-[32px]'>
          <section>
            <h2 className='font-modal-heading'>DATE ADDED</h2>
            <p className='font-modal-data'>{isoToDateTime(dateAdded)}</p>
          </section>

          <section>
            <h2 className='font-modal-heading'>PHYSICAL LOCATION</h2>
            <p className='font-modal-data'>{isPhysicalLocation ? 'Yes' : 'No'}</p>
          </section>

          <section>
            <h2 className='font-modal-heading'>ADDRESS</h2>
            {addressLine1 && <p className='font-modal-data'>{addressLine1}</p>}
            {addressLine2 && <p className='font-modal-data'>{addressLine2}</p>}
            {townCity && <p className='font-modal-data'>{townCity}</p>}
            {county && <p className='font-modal-data'>{county}</p>}
            {country && <p className='font-modal-data'>{country}</p>}
            {postcode && <p className='font-modal-data'>{postcode}</p>}
          </section>

          {/* TODO: Consider replacing with refactored SingleViewMidEditableField once functionality is specified */}
          <section>
            <h2 className='font-modal-heading'>PARENT LOCATION</h2>
            <div className='flex justify-between items-center'>
              <a href={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${parentLocationRef}`} className='font-modal-data text-blue'>
                {parentLocationTitle}
              </a>
              <Button
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
                ariaLabel='Edit parent location'
              >Edit</Button>
            </div>
          </section>
        </div>
      </>
    )
  }

  const {
    putMerchantLocationSubLocation,
    putMerchantLocationSubLocationIsSuccess: isSuccess,
    putMerchantLocationSubLocationIsLoading: isLoading,
    putMerchantLocationSubLocationError: putError,
    resetPutMerchantLocationSubLocationResponse: resetResponse,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocations: true,
    skipGetSubLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    putMerchantLocationSubLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      locationRef: ref as string,
      subLocationRef: subLocationRef as string,
      ...locationMetadata,
    })
  }, [putMerchantLocationSubLocation, planId, merchantId, ref, subLocationRef])


  return (
    <>
      {isInEditState ? (
        <DirectoryMerchantLocationForm
          location={subLocation}
          isExistingSubLocation={true}
          setIsInEditState={setIsInEditState}
          parentLocationStrings={['None']}
          parentLocation={'None'}
          parentLocationChangeHandler={() => console.log('Parent location change')}
          onSaveHandler={handleSave}
          onCancelHandler={onCancelEditState}
          isLoading={isLoading}
          isSuccess={isSuccess}
          resetResponse={resetResponse}
          error={putError}
        />
      ) : (
        <div className='pb-[28px]'>
          {renderReadOnlyState()}
        </div>
      )}
    </>
  )
}
export default SingleViewSubLocationDetails
