import {useState} from 'react'
import {DirectoryLocation} from 'types'
import {TextInputGroup} from 'components'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'

type Props = {
  isInEditState: boolean
  location: DirectoryLocation
}

const SingleViewLocationDetails = ({isInEditState, location}: Props) => {
  const {
    date_added: dateAdded,
    linked_mids_count: linkedMidsCount,
    linked_secondary_mids_count: linkedSecondaryMidsCount,
    location_metadata,
  } = location

  const {
    name,
    address_line_1: addressLine1,
    address_line_2: addressLine2,
    town_city: townCity,
    county,
    country,
    postcode,
    is_physical_location,
    location_id: locationId,
    merchant_internal_id: merchantInternalId,
  } = location_metadata

  const [isPhysicalLocation, setIsPhysicalLocation] = useState(is_physical_location)


  const renderEditState = () => {
    return (
      <form>
        {/* Identifiers */}
        <section>
          <h2 className='font-single-view-heading pb-[19px]'>IDENTIFIERS</h2>

          <TextInputGroup
            name='location-name'
            label='Name'
            autofocus
            error={null}
            value={name}
            ariaRequired
            onChange={() => null}
            inputType={InputType.TEXT}
            inputStyle={InputStyle.FULL}
            inputWidth={InputWidth.FULL}
            inputColour={InputColour.GREY}
          />

          <div className='flex gap-[40px] pt-[28px]'>
            <TextInputGroup
              name='location-id'
              label='Location ID'
              error={null}
              value={locationId}
              ariaRequired
              onChange={() => null}
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={InputColour.GREY}
            />

            <TextInputGroup
              name='location-merchant-internal-id'
              label='Merchant Internal ID'
              error={null}
              value={merchantInternalId}
              ariaRequired
              onChange={() => null}
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={InputColour.GREY}
            />
          </div>
        </section>

        {/* Is physical address */}
        <div className='flex py-[18px] items-center'>
          <input type='checkbox' className='flex h-[16px] w-[16px]' checked={isPhysicalLocation} onClick={(e) => e.stopPropagation()} onChange={() => setIsPhysicalLocation(!isPhysicalLocation)} />
          <p className='ml-[12.5px]'>Physical location</p>
        </div>

        {/* Address */}
        {isPhysicalLocation && (
          <section>
            <h2 className='font-single-view-heading pb-[19px]'>ADDRESS</h2>

            <div className='flex flex-col gap-[24px]'>
              <TextInputGroup
                name='location-address-line-1'
                label='Line 1'
                error={null}
                value={addressLine1}
                ariaRequired
                onChange={() => null}
                inputType={InputType.TEXT}
                inputStyle={InputStyle.FULL}
                inputWidth={InputWidth.FULL}
                inputColour={InputColour.GREY}
              />

              <TextInputGroup
                name='location-address-line-2'
                label='Line 2'
                error={null}
                value={addressLine2}
                ariaRequired
                onChange={() => null}
                inputType={InputType.TEXT}
                inputStyle={InputStyle.FULL}
                inputWidth={InputWidth.FULL}
                inputColour={InputColour.GREY}
              />

              <div className='flex gap-[40px]'>
                <TextInputGroup
                  name='location-address-town-city'
                  label='Town / City'
                  error={null}
                  value={townCity}
                  ariaRequired
                  onChange={() => null}
                  inputType={InputType.TEXT}
                  inputStyle={InputStyle.FULL}
                  inputWidth={InputWidth.FULL}
                  inputColour={InputColour.GREY}
                />

                <TextInputGroup
                  name='location-address-county'
                  label='County'
                  error={null}
                  value={county}
                  ariaRequired
                  onChange={() => null}
                  inputType={InputType.TEXT}
                  inputStyle={InputStyle.FULL}
                  inputWidth={InputWidth.FULL}
                  inputColour={InputColour.GREY}
                />
              </div>

              <div className='flex gap-[40px]'>
                <TextInputGroup
                  name='location-address-country'
                  label='Country'
                  error={null}
                  value={country}
                  ariaRequired
                  onChange={() => null}
                  inputType={InputType.TEXT}
                  inputStyle={InputStyle.FULL}
                  inputWidth={InputWidth.FULL}
                  inputColour={InputColour.GREY}
                />

                <TextInputGroup
                  name='location-address-postcode'
                  label='Postcode'
                  error={null}
                  value={postcode}
                  ariaRequired
                  onChange={() => null}
                  inputType={InputType.TEXT}
                  inputStyle={InputStyle.FULL}
                  inputWidth={InputWidth.FULL}
                  inputColour={InputColour.GREY}
                />
              </div>
            </div>
          </section>
        )}
      </form>
    )
  }

  const renderReadOnlyState = () => {
    return (
      <div className='grid grid-cols-2 gap-[32px]'>
        <div>
          <h2 className='font-single-view-heading'>DATE ADDED</h2>
          <p className='font-single-view-data'>{dateAdded}</p>
        </div>
        <div>
          <h2 className='font-single-view-heading'>LOCATION ID</h2>
          <p className='font-single-view-data'>{locationId}</p>
        </div>

        <div>
          <h2 className='font-single-view-heading'>ADDRESS</h2>
          {addressLine1 && <p className='font-single-view-data'>{addressLine1}</p>}
          {addressLine2 && <p className='font-single-view-data'>{addressLine2}</p>}
          {townCity && <p className='font-single-view-data'>{townCity}</p>}
          {county && <p className='font-single-view-data'>{county}</p>}
          {country && <p className='font-single-view-data'>{country}</p>}
          {postcode && <p className='font-single-view-data'>{postcode}</p>}
        </div>

        <div className='flex flex-col gap-[32px]'>
          <div>
            <h2 className='font-single-view-heading'>MERCHANT ID</h2>
            <p className='font-single-view-data'>{merchantInternalId}</p>
          </div>
          <div>
            <h2 className='font-single-view-heading'>NUMBER OF MIDS</h2>
            <p className='font-single-view-data'>{linkedMidsCount}</p>
          </div>
        </div>

        <div>
          <h2 className='font-single-view-heading'>PHYSICAL LOCATION</h2>
          <p className='font-single-view-data'>{isPhysicalLocation ? 'Yes' : 'No'}</p>
        </div>

        <div>
          <h2 className='font-single-view-heading'>SECONDARY MIDS</h2>
          <p className='font-single-view-data'>{linkedSecondaryMidsCount}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='pb-[28px]'>
      {isInEditState ? renderEditState() : renderReadOnlyState()}
    </div>
  )
}
export default SingleViewLocationDetails
