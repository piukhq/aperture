import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectorySubLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import EditLocationForm from '../../../EditLocationForm'

type Props = {
  isInEditState: boolean
  location: DirectorySubLocation
  onCancelEditState: () => void
  handleRefresh: () => void
  isRefreshing: boolean
}

const SingleViewSubLocationDetails = ({isInEditState, location, onCancelEditState, handleRefresh, isRefreshing}: Props) => {
  const router = useRouter()
  const {merchantId, planId} = router.query

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

          <section>
            <h2 className='font-modal-heading'>PARENT LOCATION</h2>
            <a href={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${parentLocationRef}`} className='font-modal-data text-blue'>
              {parentLocationTitle}
            </a>
          </section>
        </div>
      </>

    )
  }

  // TODO: Handle Sub-location edit form
  return (
    <>
      {isInEditState ? (
        <EditLocationForm
          location={subLocation}
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
export default SingleViewSubLocationDetails
