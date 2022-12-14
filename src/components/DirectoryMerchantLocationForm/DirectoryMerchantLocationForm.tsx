import {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {DirectoryLocation, DirectoryLocationMetadata, RTKQueryErrorResponse} from 'types'
import {Button, Dropdown, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {SerializedError} from '@reduxjs/toolkit'

type Props = {
  location?: DirectoryLocation
  isLocationSubLocation?: boolean
  isSubLocation?: boolean
  parentLocationStrings: string[]
  parentLocation: string
  parentLocationChangeHandler: (parentLocation) => void
  onSaveHandler: (locationMetadata: DirectoryLocationMetadata) => void
  onCancelHandler: () => void
  isLoading: boolean
  isSuccess: boolean
  resetResponse: () => void
  error: FetchBaseQueryError | SerializedError
}

const DirectoryMerchantLocationForm = ({
  location,
  isLocationSubLocation,
  isSubLocation,
  parentLocationStrings,
  parentLocation,
  parentLocationChangeHandler,
  onSaveHandler,
  onCancelHandler,
  isLoading,
  isSuccess,
  resetResponse,
  error,
}: Props) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {merchantId, planId, tab} = router.query

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
  } = location?.location_metadata || {}

  const [nameValue, setNameValue] = useState(() => {
    if (name && !isLocationSubLocation) {
      return name
    }
    return ''
  })
  const [nameValidationError, setNameValidationError] = useState(null)

  const [locationIdValue, setLocationIdValue] = useState(locationId || '')
  const [locationIdValidationError, setLocationIdValidationError] = useState(null)

  const [merchantInternalIdValue, setMerchantInternalIdValue] = useState(merchantInternalId || '')

  const [isPhysicalLocation, setIsPhysicalLocation] = useState(location ? is_physical_location : true)

  const [addressLine1Value, setAddressLine1Value] = useState(addressLine1 || '')
  const [addressLine1ValidationError, setAddressLine1ValidationError] = useState(null)

  const [addressLine2Value, setAddressLine2Value] = useState(addressLine2 || '')

  const [townCityValue, setTownCityValue] = useState(townCity || '')

  const [countyValue, setCountyValue] = useState(county || '')

  const [countryValue, setCountryValue] = useState(country || '')

  const [postcodeValue, setPostcodeValue] = useState(postcode || '')
  const [postcodeValidationError, setPostcodeValidationError] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const handleErrorResponse = useCallback(() => {
    const {status, data} = error as RTKQueryErrorResponse

    if (data && data.detail) {
      const {detail} = data
      if (status as unknown === 409) {
        const {loc} = detail[0]
        const location = loc[1]
        const errorMessage = location === 'name' ? 'Enter unique Name' : 'Enter unique Location ID'
        setErrorMessage(errorMessage)
      } else {
        setErrorMessage(detail[0].msg)
      }
    }
  }, [error])

  useEffect(() => {
    if (error) {
      handleErrorResponse()
    } else if (isSuccess) {
      resetResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
      router.isReady && router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}`)
    }
  }, [isSuccess, handleErrorResponse, dispatch, router, planId, merchantId, tab, error, resetResponse])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setNameValidationError(null)
  }

  const handleNameBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setNameValidationError('Enter name')
    }
  }

  const handleLocationIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationIdValue(event.target.value)
    setLocationIdValidationError(null)
  }

  const handleLocationIdBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setLocationIdValidationError('Enter location ID')
    }
  }

  const handleMerchantInternalIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMerchantInternalIdValue(event.target.value)
  }

  const handleAddressLine1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine1Value(event.target.value)
    setAddressLine1ValidationError(null)
  }

  const handleAddressLine1Blur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setAddressLine1ValidationError('Enter address line 1')
    }
  }

  const handleAddressLine2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressLine2Value(event.target.value)
  }

  const handleTownCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTownCityValue(event.target.value)
  }

  const handleCountyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountyValue(event.target.value)
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryValue(event.target.value)
  }

  const handlePostcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostcodeValue(event.target.value)
    setPostcodeValidationError(null)
  }

  const handlePostcodeBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setPostcodeValidationError('Enter postcode')
    }
  }

  const validationError = nameValidationError || locationIdValidationError || (isPhysicalLocation && (addressLine1ValidationError || postcodeValidationError))

  const validateLocationDetails = () => {
    if (validationError) {
      setErrorMessage('Populate all mandatory fields')
    } else {
      setErrorMessage(null)

      onSaveHandler({
        name: nameValue,
        location_id: locationIdValue,
        merchant_internal_id: merchantInternalIdValue,
        is_physical_location: isPhysicalLocation,
        address_line_1: addressLine1Value,
        address_line_2: addressLine2Value,
        town_city: townCityValue,
        county: countyValue,
        country: countryValue,
        postcode: postcodeValue,
      })
    }
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      nameValue === '' ||
      (parentLocation === 'None' && locationIdValue === '') ||
      (isPhysicalLocation && (addressLine1Value === '' || postcodeValue === ''))
    ) {
      setErrorMessage('Populate all mandatory fields')
    } else {
      validateLocationDetails()
    }
  }

  const handleParentLocationChange = (parentLocation: string) => {
    setLocationIdValidationError(null)
    parentLocationChangeHandler(parentLocation)
  }

  const renderFormContent = () => (
    <>
      {/* Parent Location */}
      <section data-testid='parent-location-section' className='pb-[20px]'>
        <h2 className='font-modal-heading'>PARENT LOCATION</h2>

        <div className='h-[28px] w-[277px]'>
          {isLocationSubLocation ? <p className='font-body-2' data-testid='parent-location'>{parentLocation}</p> : <Dropdown
            displayValue={parentLocation}
            displayValues={parentLocationStrings}
            onChangeDisplayValue={handleParentLocationChange}
          />}
        </div>

        {parentLocation !== 'None' && !isLocationSubLocation && (
          <p className='font-subheading-4 mt-[10px] w-[489px]'>
            This location will be created as a sub-location and will inherit the MID & Secondary MID information of its parent location. You will not be able to add MIDs to this sub-location
          </p>
        )}
      </section>

      {/* Identifiers */}
      <section data-testid='identifiers-section'>
        <h2 className='font-modal-heading pb-[19px]'>IDENTIFIERS</h2>

        <TextInputGroup
          name='location-name'
          label='Name'
          autofocus
          value={nameValue}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onFocus={() => setNameValidationError(null)}
          error={nameValidationError}
          ariaRequired
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={nameValidationError ? InputColour.RED : InputColour.GREY}
        />

        {parentLocation === 'None' && !isSubLocation && (
          <div className='flex gap-[40px] pt-[28px]'>
            <TextInputGroup
              name='location-id'
              label='Location ID'
              value={locationIdValue}
              onChange={handleLocationIdChange}
              onBlur={handleLocationIdBlur}
              onFocus={() => setLocationIdValidationError(null)}
              error={locationIdValidationError}
              ariaRequired
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={locationIdValidationError ? InputColour.RED : InputColour.GREY}
            />

            <TextInputGroup
              name='location-merchant-internal-id'
              label='Merchant Internal ID'
              value={merchantInternalIdValue}
              onChange={handleMerchantInternalIdChange}
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={InputColour.GREY}
            />
          </div>
        )}
      </section>

      {/* Is physical address */}
      <div className='flex pt-[18px] items-center'>
        <input data-testid='is-physical-location-checkbox' type='checkbox' className='flex h-[16px] w-[16px]' checked={isPhysicalLocation} onClick={(e) => e.stopPropagation()} onChange={() => setIsPhysicalLocation(!isPhysicalLocation)} />
        <p className='ml-[12.5px] dark:text-white'>Physical location</p>
      </div>

      {/* Address */}
      {isPhysicalLocation && (
        <section data-testid='address-section' className='py-[24px] '>
          <h2 className='font-modal-heading pb-[19px]'>ADDRESS</h2>

          <div className='flex flex-col gap-[24px]'>
            <TextInputGroup
              name='location-address-line-1'
              label='Line 1'
              value={addressLine1Value}
              onChange={handleAddressLine1Change}
              onBlur={handleAddressLine1Blur}
              onFocus={() => setAddressLine1ValidationError(null)}
              error={addressLine1ValidationError}
              ariaRequired
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={addressLine1ValidationError ? InputColour.RED : InputColour.GREY}
            />

            <TextInputGroup
              name='location-address-line-2'
              label='Line 2'
              value={addressLine2Value}
              onChange={handleAddressLine2Change}
              inputType={InputType.TEXT}
              inputStyle={InputStyle.FULL}
              inputWidth={InputWidth.FULL}
              inputColour={InputColour.GREY}
            />

            <div className='flex gap-[40px]'>
              <TextInputGroup
                name='location-address-town-city'
                label='Town / City'
                value={townCityValue}
                onChange={handleTownCityChange}
                inputType={InputType.TEXT}
                inputStyle={InputStyle.FULL}
                inputWidth={InputWidth.FULL}
                inputColour={InputColour.GREY}
              />

              <TextInputGroup
                name='location-address-county'
                label='County'
                value={countyValue}
                onChange={handleCountyChange}
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
                value={countryValue}
                onChange={handleCountryChange}
                inputType={InputType.TEXT}
                inputStyle={InputStyle.FULL}
                inputWidth={InputWidth.FULL}
                inputColour={InputColour.GREY}
              />

              <TextInputGroup
                name='location-address-postcode'
                label='Postcode'
                value={postcodeValue}
                onChange={handlePostcodeChange}
                onBlur={handlePostcodeBlur}
                onFocus={() => setPostcodeValidationError(null)}
                error={postcodeValidationError}
                ariaRequired
                inputType={InputType.TEXT}
                inputStyle={InputStyle.FULL}
                inputWidth={InputWidth.FULL}
                inputColour={postcodeValidationError ? InputColour.RED : InputColour.GREY}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )

  return (
    <form data-testid='location-form' onSubmit={handleSave}>
      {renderFormContent()}
      <div className='flex justify-between items-center border-t-[1px] border-t-grey-200 dark:border-t-grey-800 mt-[16px] pt-[14px]'>
        {errorMessage && (
          <p data-testid='error-message' className='font-body-4 w-full text-center text-red'>{errorMessage}</p>
        )}

        <div className='flex w-full justify-end items-center gap-[15px]'>
          <Button
            handleClick={onCancelHandler}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel='Cancel'
            isDisabled={isLoading}
          >Cancel
          </Button>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            isDisabled={isLoading}
            ariaLabel='Save'
          >{isLoading ? 'Saving' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  )
}
export default DirectoryMerchantLocationForm
