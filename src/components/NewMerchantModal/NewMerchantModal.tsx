import {useState} from 'react'
import {Button, Modal, TextInputGroup} from 'components'

import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {ModalStyle} from 'utils/enums'

const NewMerchantModal = () => {
  // TODO: Input field logic could be refactored when functionality story is worked upon
  const [imageValue, setImageValue] = useState(null)
  const [nameValue, setNameValue] = useState('')
  const [locationLabelValue, setLocationLabelValue] = useState('Locations')

  const [isNameReadyForValidation, setIsNameReadyForValidation] = useState(false)
  const [isLocationLabelReadyForValidation, setIsLocationLabelReadyForValidation] = useState(false)

  // TODO: Add code to display selected Image when added (and also check it is an actual image and other validation)
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => setImageValue(event.target.files[0])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setIsNameReadyForValidation(false)
  }

  const handleLocationLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationLabelValue(event.target.value)
    setIsLocationLabelReadyForValidation(false)
  }

  const validateMerchant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsNameReadyForValidation(true)
    setIsLocationLabelReadyForValidation(true)

    // TODO: Perform relevant validation and submit, placeholder for now:
    console.log({
      image: imageValue,
      name: nameValue,
      locationLabel: locationLabelValue,
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

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='New Merchant'>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validateMerchant}>
        {renderAddImageInput()}
        {renderTextFields()}
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

