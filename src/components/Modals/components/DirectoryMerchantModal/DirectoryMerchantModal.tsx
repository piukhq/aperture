import {useState, useCallback, useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {Button, Modal, TextInputGroup} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {reset as merchantSliceReset, getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {reset as planSliceReset, getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useMidManagementMerchants} from 'hooks/useMidManagementMerchants'
import {RTKQueryErrorResponse} from 'types'
import {requestModal} from 'features/modalSlice'
import {ModalStyle, ModalType} from 'utils/enums'

const DirectoryMerchantModal = () => {
  const router = useRouter()
  const {planId} = router.query
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan) // Used for when coming from Plans page

  const {
    postMerchant,
    postMerchantResponse,
    postMerchantError,
    resetPostMerchantResponse,
    putMerchant,
    putMerchantResponse,
    putMerchantError,
    resetPutMerchantResponse,
  } = useMidManagementMerchants({
    skipGetMerchant: true,
    skipGetMerchantCounts: true,
    planRef: planId as string,
  })

  const dispatch = useAppDispatch()
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const {merchant_ref: merchantRef, merchant_metadata: merchantMetadata} = selectedMerchant
  const {name, icon_url: iconUrl, location_label: locationLabel} = merchantMetadata

  const isNewMerchant = !merchantRef

  // TODO: Input field logic could be refactored when functionality story is worked upon
  const [imageValue, setImageValue] = useState(null)
  const [nameValue, setNameValue] = useState(name || '')
  const [locationLabelValue, setLocationLabelValue] = useState(locationLabel || 'Locations')

  const [nameValidationError, setNameValidationError] = useState(null)
  const [locationLabelValidationError, setLocationLabelValidationError] = useState(null)
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState(false)

  useEffect(() => { // Reset error when close button is focused
    isCloseButtonFocused && setNameValidationError(null)
  }, [isCloseButtonFocused])

  const handleMerchantError = useCallback((merchantError: RTKQueryErrorResponse) => {
    const {status, data} = merchantError

    if (data && data.detail) {
      const {detail} = data
      // TODO: Handle error responses other that 409 (duplicate) and everything else
      detail.forEach(err => {
        const {loc = [], msg} = err
        const location = loc?.[1]
        if (location === 'name') {
          setNameValidationError(status as unknown === 409 ? 'Name already exists' : msg)
        } else if (location === 'location_label') {
          setLocationLabelValidationError(msg)
        } else {
          setNameValidationError(msg)
        }
      })
    }
  }, [])

  const resetSelectors = useCallback(() => {
    dispatch(merchantSliceReset())
    dispatch(planSliceReset())
  }, [dispatch])

  useEffect(() => {
    if (postMerchantError || putMerchantError) {
      handleMerchantError(postMerchantError as RTKQueryErrorResponse || putMerchantError as RTKQueryErrorResponse)
    } else if (postMerchantResponse || putMerchantResponse) {
      postMerchantResponse ? resetPostMerchantResponse() : resetPutMerchantResponse()
      resetSelectors()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [
    postMerchantError,
    putMerchantError,
    handleMerchantError,
    postMerchantResponse,
    putMerchantResponse,
    resetPostMerchantResponse,
    resetPutMerchantResponse,
    resetSelectors,
    dispatch,
  ])

  // TODO: Add code to display selected Image when added (and also check it is an actual image and other validation)
  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => setImageValue(event.target.files[0])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value)
    setNameValidationError(null)
  }

  const handleLocationLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationLabelValue(event.target.value)
    setLocationLabelValidationError(null)
  }

  const handleNameBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setNameValidationError('Enter name')
    }
  }

  const handleLocationLabelBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setLocationLabelValidationError('Enter location label')
    }
  }

  const validateMerchant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!nameValidationError && !locationLabelValidationError) {
      if (nameValue !== '' && locationLabelValue !== '') {
        if (isNewMerchant) {
          const planRef = planId as string || selectedPlan.plan_ref
          postMerchant({name: nameValue, location_label: locationLabelValue, iconUrl: imageValue, planRef})
        } else {
          putMerchant({name: nameValue, location_label: locationLabelValue, iconUrl: imageValue, planRef: planId as string, merchantRef})
        }
      } else {
        if (nameValue === '') {
          setNameValidationError('Enter name')
        }

        if (locationLabelValue === '') {
          setLocationLabelValidationError('Enter location label')
        }
      }
    }
  }

  const renderAddImageLabel = () => (
    <label
      htmlFor='merchant-add-image'
      className='h-[127px] w-[127px] rounded-[30px] flex items-center justify-center bg-grey-100 dark:bg-grey-800 text-center font-heading-9 text-grey-700 dark:text-grey-300'
    >Add Image</label>
  )
  const renderExistingImage = () => <Image className='rounded-[35px] flex items-center justify-center' src={iconUrl} width={140} height={140} alt={`${name} plan image`}/>

  const renderTextFields = () => (
    <>
      <TextInputGroup
        name='merchant-name'
        label='Name'
        error={nameValidationError}
        value={nameValue}
        onChange={handleNameChange}
        onFocus={() => setNameValidationError(null)}
        onBlur={handleNameBlur}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={nameValidationError ? InputColour.RED : InputColour.GREY}
      />
      <TextInputGroup
        name='merchant-location-label'
        label='Location Label'
        error={locationLabelValidationError}
        value={locationLabelValue}
        onChange={handleLocationLabelChange}
        onFocus={() => setLocationLabelValidationError(null)}
        onBlur={handleLocationLabelBlur}
        inputType={InputType.TEXT}
        inputStyle={InputStyle.FULL}
        inputWidth={InputWidth.FULL}
        inputColour={locationLabelValidationError ? InputColour.RED : InputColour.GREY}
      />
    </>
  )

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`${isNewMerchant ? 'New' : 'Edit'} Merchant`} onCloseFn={() => resetSelectors()} setIsCloseButtonFocused={setIsCloseButtonFocused}>
      <form className='flex flex-col gap-[20px] mt-[30px]' onSubmit={validateMerchant}>
        <div className='w-full flex items-center justify-center my-[4px]'>
          <div className={`flex items-center rounded-[35px] justify-center focus-within:ring-2 focus-within:ring-lightBlue ${!iconUrl && 'h-[140px] w-[140px] border-2 border-grey-400 dark:border-grey-600'}`}>
            {iconUrl ? renderExistingImage() : renderAddImageLabel()}
            <input aria-label='Add Image' className='cursor-pointer absolute block opacity-0 h-[140px] w-[140px] pin-r pin-t' type='file' name='merchant-add-image' onChange={handleImageInput}/>
          </div>
        </div>

        {renderTextFields()}
        <div className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >{isNewMerchant ? 'Add Merchant' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DirectoryMerchantModal

