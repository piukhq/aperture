import {useCallback, useEffect} from 'react'
import {useRouter} from 'next/router'
import {Button, DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryLocation, DirectoryLocationMetadata} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'

type Props = {
  isInEditState: boolean
  location: DirectoryLocation
  onCancelEditState: () => void
  handleRefresh: () => void
  isRefreshing: boolean
}

const SingleViewLocationDetails = ({isInEditState, location, onCancelEditState, handleRefresh, isRefreshing}: Props) => {
  const router = useRouter()
  const {planId, merchantId, ref} = router.query
  // Take component out of edit state when unmounted
  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  const {
    date_added: dateAdded,
    linked_mids_count: linkedMidsCount,
    linked_secondary_mids_count: linkedSecondaryMidsCount,
    location_metadata,
  } = location

  const {
    address_line_1: addressLine1,
    address_line_2: addressLine2,
    town_city: townCity,
    county,
    country,
    postcode,
    is_physical_location: isPhysicalLocation,
    location_id: locationId,
    merchant_internal_id: merchantInternalId,
  } = location_metadata

  const renderReadOnlyState = () => {
    return (
      <>
        <div data-testid='location-refresh-button' className='flex justify-end'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            handleClick={handleRefresh}
            ariaLabel='Refresh Location details'
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
            <h2 className='font-modal-heading'>LOCATION ID</h2>
            <p className='font-modal-data'>{locationId}</p>
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

          <div className='flex flex-col gap-[32px]'>
            <section>
              <h2 className='font-modal-heading'>MERCHANT INTERNAL ID</h2>
              <p className='font-modal-data'>{merchantInternalId}</p>
            </section>

            <section>
              <h2 className='font-modal-heading'>NUMBER OF MIDS</h2>
              <p className='font-modal-data'>{linkedMidsCount}</p>
            </section>
          </div>

          <section>
            <h2 className='font-modal-heading'>PHYSICAL LOCATION</h2>
            <p className='font-modal-data'>{isPhysicalLocation ? 'Yes' : 'No'}</p>
          </section>

          <section>
            <h2 className='font-modal-heading'>SECONDARY MIDS</h2>
            <p className='font-modal-data'>{linkedSecondaryMidsCount}</p>
          </section>
        </div>
      </>

    )
  }

  const {
    putMerchantLocation,
    putMerchantLocationIsSuccess: isSuccess,
    putMerchantLocationIsLoading: isLoading,
    putMerchantLocationError: putError,
    resetPutMerchantLocationResponse: resetResponse,
  } = useMidManagementLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    putMerchantLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      locationRef: ref as string,
      ...locationMetadata,
    })
  }, [putMerchantLocation, planId, merchantId, ref])

  return (
    <>
      {isInEditState ? (
        <DirectoryMerchantLocationForm
          location={location}
          parentLocationStrings={['None']}
          parentLocation={'None'}
          isExistingLocation
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
export default SingleViewLocationDetails
