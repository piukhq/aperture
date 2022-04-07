import {useState} from 'react'
import {Button, Modal, TextInputGroup} from 'components'
import Image from 'next/image'

import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle} from 'utils/enums'

import visaImage from 'icons/pngs/visa-logo.png'
import mastercardImage from 'icons/pngs/mastercard-logo.png'
import amexImage from 'icons/pngs/amex-logo.png'

const NewMerchantModal = () => {
  // TODO: Input field logic could be refactored when functionality story is worked upon
  const [imageValue, setImageValue] = useState(null)
  const [nameValue, setNameValue] = useState('')
  const [slugValue, setSlugValue] = useState('')
  const [schemeIdValue, setSchemeIdValue] = useState('')
  const [locationLabelValue, setLocationLabelValue] = useState('')

  const [isNameReadyForValidation, setIsNameReadyForValidation] = useState(false)
  const [isSlugReadyForValidation, setIsSlugReadyForValidation] = useState(false)
  const [isSchemeIdReadyForValidation, setIsSchemeIdReadyForValidation] = useState(false)
  const [isLocationLabelReadyForValidation, setIsLocationLabelReadyForValidation] = useState(false)

  const [visaChecked, setVisaChecked] = useState(false)
  const [mastercardChecked, setMastercardChecked] = useState(false)
  const [amexChecked, setAmexChecked] = useState(false)

  // TODO: Add code to display selected Image when added (and also check it is an actual image and other validation)
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => setImageValue(event.target.files[0])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setIsNameReadyForValidation(false)
  }
  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlugValue(event.target.value)
    setIsSlugReadyForValidation(false)
  }
  const handleSchemeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchemeIdValue(event.target.value)
    setIsSchemeIdReadyForValidation(false)
  }
  const handleLocationLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationLabelValue(event.target.value)
    setIsLocationLabelReadyForValidation(false)
  }
  const handleVisaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisaChecked(event.target.checked)
  }
  const handleMastercardChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMastercardChecked(event.target.checked)
  }
  const handleAmexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmexChecked(event.target.checked)
  }

  const validateMerchant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsNameReadyForValidation(true)
    setIsSlugReadyForValidation(true)
    setIsSchemeIdReadyForValidation(true)
    setIsLocationLabelReadyForValidation(true)

    // TODO: Perform relevant validation and submit, placeholder for now:
    console.log({
      image: imageValue,
      name: nameValue,
      slug: slugValue,
      schemeId: schemeIdValue,
      locationLabel: locationLabelValue,
      visaChecked,
      mastercardChecked,
      amexChecked,
    })
  }

  const renderAddImageInput = () => (
    <div className='w-full flex items-center justify-center my-[4px]'>
      <div className='h-[140px] w-[140px] rounded-[35px] border-2 border-grey-400 dark:border-grey-600 flex items-center justify-center focus-within:ring-2 focus-within:ring-lightBlue'>
        <label htmlFor='merchant-add-image' className='h-[127px] w-[127px] rounded-[30px] flex items-center justify-center text-center bg-grey-100 dark:bg-grey-800 font-heading-9 text-grey-700 dark:text-grey-300'>Add Image</label>
        <input aria-label='Add Image' className='cursor-pointer absolute block opacity-0 h-[140px] w-[140px] pin-r pin-t' type='file' name='merchant-add-image' onChange={handleImageInput}/>
      </div>
    </div>
  )

  const renderTextFields = () => (
    <>
      <TextInputGroup
        name='merchant-name'
        label='Name'
        error={null} // TODO: add any errors as per validation
        value={nameValue}
        onChange={handleNameChange}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={isNameReadyForValidation ? InputColour.RED : InputColour.GREY} // TODO: Add validation check function to conditional
      />
      <div className='flex gap-[22px]'>
        <TextInputGroup
          name='merchant-slug'
          label='Slug'
          error={null} // TODO: add any errors as per validation
          value={slugValue}
          onChange={handleSlugChange}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={isSlugReadyForValidation ? InputColour.RED : InputColour.GREY} // TODO: Add validation check function to conditional
        />
        <TextInputGroup
          name='merchant-scheme-id'
          label='Django Scheme Id'
          error={null} // TODO: add any errors as per validation
          value={schemeIdValue}
          onChange={handleSchemeIdChange}
          inputType={InputType.TEXT}
          inputStyle={InputStyle.FULL}
          inputWidth={InputWidth.FULL}
          inputColour={isSchemeIdReadyForValidation ? InputColour.RED : InputColour.GREY} // TODO: Add validation check function to conditional
        />
      </div>
      <TextInputGroup
        name='merchant-location-label'
        label='Location Label'
        error={null} // TODO: add any errors as per validation
        value={locationLabelValue}
        onChange={handleLocationLabelChange}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={isLocationLabelReadyForValidation ? InputColour.RED : InputColour.GREY} // TODO: Add validation check function to conditional
      />
    </>
  )

  const renderPaymentSchemeInputs = () => { //TODO: Generic functions can probably be used for functionality instead of different for each scheme
    const paymentSchemeArray = [
      {
        name: 'visa',
        imageSrc: visaImage,
        checkedState: visaChecked,
        onChangeFn: handleVisaChange,
      }, {
        name: 'mastercard',
        imageSrc: mastercardImage,
        checkedState: mastercardChecked,
        onChangeFn: handleMastercardChange,
      }, {
        name: 'amex',
        imageSrc: amexImage,
        checkedState: amexChecked,
        onChangeFn: handleAmexChange,
      },
    ]
    return (
      <div className='w-full flex flex-col justify-center text-center mt-[12px]'>
        <div className='flex gap-[30px] justify-center'>
          {paymentSchemeArray.map(scheme => (
            <div key={scheme.name} className='flex flex-col items-center gap-[4px]'>
              <label htmlFor={`merchant-${scheme.name}`}>
                <Image
                  src={scheme.imageSrc}
                  width={80}
                  height={40}
                  objectFit='contain'
                  alt=''
                />
              </label>
              <input aria-label={scheme.name} className='h-[19px] w-[19px]' type='checkbox' name={`merchant-${scheme.name}`} checked={scheme.checkedState} onChange={scheme.onChangeFn}/>
            </div>
          ))}
        </div>
        <p className='font-body-4 leading-[9px] text-4xs pt-[20px]'>Some merchants may only have MIDs onboarded for a subset of payment schemes.</p>
        <p className='font-body-4 text-4xs'>Select all that are currently supported.</p>
      </div>
    )
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='New Merchant'>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validateMerchant}>
        {renderAddImageInput()}
        {renderTextFields()}
        {renderPaymentSchemeInputs()}
        <div className='flex justify-end border-t-[1px] border-grey-300 dark:border-grey-800 pt-[16px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel='Add Merchant'
          >Add Merchant
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default NewMerchantModal

