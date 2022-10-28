import {useEffect} from 'react'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import EditLocationForm from './components/EditLocationForm'

type Props = {
  isInEditState: boolean
  location: DirectoryLocation
  onCancelEditState: () => void
  handleRefresh: () => void
  isRefreshing: boolean
}

const SingleViewLocationDetails = ({isInEditState, location, onCancelEditState, handleRefresh, isRefreshing}: Props) => {
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
        <div className='flex justify-end'>
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

  return (
    <>
      {isInEditState ? (
        <EditLocationForm
          location={location}
          onCancelEditState={onCancelEditState}
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
