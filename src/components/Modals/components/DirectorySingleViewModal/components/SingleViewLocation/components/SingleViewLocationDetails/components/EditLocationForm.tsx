import {useState, useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {DirectoryLocation} from 'types'
import {Button, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'

type Props = {
  location: DirectoryLocation
  onCancelEditState: () => void
}

const EditLocationForm = ({location, onCancelEditState}: Props) => {
  const router = useRouter()
  const {planId, merchantId, tab, ref} = router.query

  const dispatch = useAppDispatch()

  const {
    putMerchantLocation,
    putMerchantLocationIsSuccess,
    putMerchantLocationIsLoading,
    putMerchantLocationError,
    resetPutMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

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
  } = location.location_metadata

  const [nameValue, setNameValue] = useState(name || '')
  const [nameValidationError, setNameValidationError] = useState(null)

  const [locationIdValue, setLocationIdValue] = useState(locationId || '')
  const [locationIdValidationError, setLocationIdValidationError] = useState(null)

  const [merchantInternalIdValue, setMerchantInternalIdValue] = useState(merchantInternalId || '')

  const [isPhysicalLocation, setIsPhysicalLocation] = useState(is_physical_location)

  const [addressLine1Value, setAddressLine1Value] = useState(addressLine1 || '')
  const [addressLine1ValidationError, setAddressLine1ValidationError] = useState(null)

  const [addressLine2Value, setAddressLine2Value] = useState(addressLine2 || '')

  const [townCityValue, setTownCityValue] = useState(townCity || '')

  const [countyValue, setCountyValue] = useState(county || '')

  const [countryValue, setCountryValue] = useState(country || '')

  const [postcodeValue, setPostcodeValue] = useState(postcode || '')
  const [postcodeValidationError, setPostcodeValidationError] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const baseRoute = `/mid-management/directory/${planId}/${merchantId}?tab=${tab}`

  // TODO: Handle unhappy path
  const handleErrorResponse = useCallback(() => {
    console.error(putMerchantLocationError)
  }, [putMerchantLocationError])

  useEffect(() => {
    if (putMerchantLocationError) {
      handleErrorResponse()
    } else if (putMerchantLocationIsSuccess) {
      setErrorMessage(null)
      resetPutMerchantLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
      router.isReady && router.replace(baseRoute)
    }
  }, [
    putMerchantLocationIsSuccess,
    putMerchantLocationError,
    setErrorMessage,
    resetPutMerchantLocationResponse,
    handleErrorResponse,
    dispatch,
    router,
    baseRoute,
  ])


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

  const formIsInvalid = nameValidationError || locationIdValidationError || (isPhysicalLocation && (addressLine1ValidationError || postcodeValidationError))

  const handleSave = () => {
    if (formIsInvalid) {
      setErrorMessage('Populate all mandatory fields')
    } else {
      setErrorMessage(null)

      const putLocationBody = {
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
      }

      putMerchantLocation({
        planRef: planId as string,
        merchantRef: merchantId as string,
        locationRef: ref as string,
        ...putLocationBody,
      })
    }
  }

  const renderForm = () => (
    <form data-testid='location-editing-form'>
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
            ariaRequired
            inputType={InputType.TEXT}
            inputStyle={InputStyle.FULL}
            inputWidth={InputWidth.FULL}
            inputColour={InputColour.GREY}
          />
        </div>
      </section>

      {/* Is physical address */}
      <div className='flex pt-[18px] items-center'>
        <input data-testid='is-physical-location-checkbox' type='checkbox' className='flex h-[16px] w-[16px]' checked={isPhysicalLocation} onClick={(e) => e.stopPropagation()} onChange={() => setIsPhysicalLocation(!isPhysicalLocation)} />
        <p className='ml-[12.5px] dark:text-white'>Physical location</p>
      </div>

      {/* Address */}
      {isPhysicalLocation && (
        <section data-testid='address-section' className='pt-[18px]'>
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
              ariaRequired
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
                ariaRequired
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
                ariaRequired
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
                ariaRequired
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
    </form>
  )

  return (
    <>
      {renderForm()}
      <div className='flex justify-between items-center border-t-[1px] border-t-grey-200 dark:border-t-grey-800 mt-[42px] pt-[14px]'>
        {errorMessage && (
          <p data-testid='error-message' className='font-body-4 w-full text-center text-red'>{errorMessage}</p>
        )}

        <div className='flex w-full justify-end items-center gap-[15px]'>
          <Button
            handleClick={onCancelEditState}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel='Cancel location edit'
            isDisabled={putMerchantLocationIsLoading}
          >Cancel
          </Button>
          <Button
            handleClick={handleSave}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            isDisabled={putMerchantLocationIsLoading}
            ariaLabel={putMerchantLocationIsLoading ? 'Saving location edit' : 'Save location edit'}
          >{putMerchantLocationIsLoading ? 'Saving' : 'Save'}
          </Button>
        </div>
      </div>
    </>
  )
}
export default EditLocationForm
