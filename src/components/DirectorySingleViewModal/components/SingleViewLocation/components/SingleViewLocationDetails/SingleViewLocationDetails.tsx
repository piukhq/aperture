import {useEffect} from 'react'
import {DirectoryLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import EditLocationForm from './components/EditLocationForm'

type Props = {
  isInEditState: boolean
  location: DirectoryLocation
  onCancelEditState: () => void
}

const SingleViewLocationDetails = ({isInEditState, location, onCancelEditState}: Props) => {
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
      <div className='grid grid-cols-2 gap-[32px]'>
        <section>
          <h2 className='font-single-view-heading'>DATE ADDED</h2>
          <p className='font-single-view-data'>{isoToDateTime(dateAdded)}</p>
        </section>

        <section>
          <h2 className='font-single-view-heading'>LOCATION ID</h2>
          <p className='font-single-view-data'>{locationId}</p>
        </section>

        <section>
          <h2 className='font-single-view-heading'>ADDRESS</h2>
          {addressLine1 && <p className='font-single-view-data'>{addressLine1}</p>}
          {addressLine2 && <p className='font-single-view-data'>{addressLine2}</p>}
          {townCity && <p className='font-single-view-data'>{townCity}</p>}
          {county && <p className='font-single-view-data'>{county}</p>}
          {country && <p className='font-single-view-data'>{country}</p>}
          {postcode && <p className='font-single-view-data'>{postcode}</p>}
        </section>

        <div className='flex flex-col gap-[32px]'>
          <section>
            <h2 className='font-single-view-heading'>MERCHANT INTERNAL ID</h2>
            <p className='font-single-view-data'>{merchantInternalId}</p>
          </section>

          <section>
            <h2 className='font-single-view-heading'>NUMBER OF MIDS</h2>
            <p className='font-single-view-data'>{linkedMidsCount}</p>
          </section>
        </div>

        <section>
          <h2 className='font-single-view-heading'>PHYSICAL LOCATION</h2>
          <p className='font-single-view-data'>{isPhysicalLocation ? 'Yes' : 'No'}</p>
        </section>

        <section>
          <h2 className='font-single-view-heading'>SECONDARY MIDS</h2>
          <p className='font-single-view-data'>{linkedSecondaryMidsCount}</p>
        </section>
      </div>
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
