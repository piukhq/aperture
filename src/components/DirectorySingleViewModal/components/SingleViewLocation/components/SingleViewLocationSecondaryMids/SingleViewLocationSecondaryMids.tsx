import {useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationMids} from 'hooks/useMidManagementLocationMids'
import {DirectoryMerchantLocationSecondaryMid, DirectorySecondaryMid} from 'types'
import LocationMidsListItem from '../LocationMidsListItem'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {PaymentSchemeCode} from 'utils/enums'
import VisaSvg from 'icons/svgs/add-visa.svg'
import MastercardSvg from 'icons/svgs/add-mastercard.svg'
import AmexSvg from 'icons/svgs/add-amex.svg'
import CloseIcon from 'icons/svgs/close.svg'

const SingleViewLocationSecondaryMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const [isInNewLinkSelectionState, setIsInNewLinkSelectionState] = useState(false)
  const [selectedAvailableMid, setSelectedAvailableMid] = useState(null)

  const {getMerchantLocationLinkedSecondaryMidsResponse, getMerchantLocationLinkedSecondaryMidsIsLoading} = useMidManagementLocationMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
    skipGetLocationLinkedMids: true,
  })
  const {getMerchantSecondaryMidsResponse} = useMidManagementSecondaryMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    skipGetSecondaryMids: false,
  })

  const availableSecondaryMids: DirectorySecondaryMid[] = useMemo(() => { // filter getMerchantSecondaryMidsResponse to only include MIDs that are not already linked
    if (getMerchantSecondaryMidsResponse) {
      return getMerchantSecondaryMidsResponse.filter(
        (secondaryMid: DirectorySecondaryMid) => !getMerchantLocationLinkedSecondaryMidsResponse?.some(
          (locationSecondaryMid: DirectoryMerchantLocationSecondaryMid) => locationSecondaryMid.secondary_mid_ref === secondaryMid.secondary_mid_ref
        )
      )
    }
    return []
  }, [getMerchantLocationLinkedSecondaryMidsResponse, getMerchantSecondaryMidsResponse])

  const noLinkedSecondaryMids = (!getMerchantLocationLinkedSecondaryMidsResponse || getMerchantLocationLinkedSecondaryMidsResponse.length === 0) && !getMerchantLocationLinkedSecondaryMidsIsLoading

  const onSaveHandler = () => {
    console.log('Save button clicked')
    console.log('Selected available mid: ', selectedAvailableMid)
  }

  const onCloseHandler = () => {
    setIsInNewLinkSelectionState(false)
    setSelectedAvailableMid(null)
  }

  const renderLocationSecondaryMid = (locationSecondaryMid: DirectoryMerchantLocationSecondaryMid, index: number) => {
    const {payment_scheme_code: paymentSchemeCode, secondary_mid_value: secondaryMidValue, secondary_mid_ref: secondaryMidRef} = locationSecondaryMid
    return <LocationMidsListItem key={index} index={index} paymentSchemeCode={paymentSchemeCode} value={secondaryMidValue} refValue={secondaryMidRef} />
  }

  const renderLinkNewSecondaryMidButton = () => (
    <section className='flex justify-end items-center mb-[10px]'>
      <Button
        handleClick={() => setIsInNewLinkSelectionState(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[12px] leading-[12px]'
      >Link New Secondary MID
      </Button>
    </section>
  )


  const renderAvailableMidSelection = () => {
    const paymentSchemeIconStyles = 'flex w-full h-full justify-center items-center rounded-[4px]'

    const renderPaymentCardIcon = (paymentSchemeCode: number) => {
      switch (paymentSchemeCode) {
        case PaymentSchemeCode.VISA:
          return (
            <div className={`${paymentSchemeIconStyles} bg-visaBlue`}>
              <VisaSvg data-testid='visa-icon' className='scale-[90%] mr-[1px]' alt='Visa' />
            </div>
          )
        case PaymentSchemeCode.MASTERCARD:
          return (
            <div className={`${paymentSchemeIconStyles} bg-mastercardBlue`}>
              <MastercardSvg data-testid='mastercard-icon' className='scale-[78%] mb-[1px]' alt='Mastercard' />
            </div>
          )
        case PaymentSchemeCode.AMEX:
          return (
            <div className={`${paymentSchemeIconStyles} bg-amexBlue`}>
              <AmexSvg data-testid='amex-icon' className='scale-[85%]' alt='Amex' />
            </div>
          )
      }
    }

    const renderDropdownMid = (secondaryMid: DirectorySecondaryMid) => {
      const {secondary_mid: midValue, payment_scheme_code: paymentSchemeCode} = secondaryMid.secondary_mid_metadata
      return (
        <div className='flex items-center'>
          <div className='w-[32px] h-[23px]'>
            {renderPaymentCardIcon(paymentSchemeCode)}
          </div>
          <p className='ml-[13px] font-single-view-data'>
            {midValue}
          </p>
        </div>
      )
    }

    return (
      <section className='flex items-center justify-end gap-[10px] mb-[10px]'>
        <div className='h-[36px] w-[210px]'>
          <Dropdown
            displayValue={selectedAvailableMid || 'Secondary Mid'}
            displayValues={availableSecondaryMids}
            onChangeDisplayValue={setSelectedAvailableMid}
            renderFn={renderDropdownMid}
          />
        </div>

        <div className='flex items-center gap-[10px]'>
          <Button
            handleClick={onSaveHandler}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Save Secondary Mid'}
          >Save
          </Button>

          <Button
            handleClick={onCloseHandler}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            ariaLabel='Cancel New Secondary Mid Link'
          ><CloseIcon className='w-[14px] h-[14px] fill-grey-700' />
          </Button>
        </div>
      </section>
    )
  }

  const renderLinkedSecondaryMids = () => {
    if (noLinkedSecondaryMids) {
      return <i className='font-body-4'>There are no Secondary MIDs to view.</i>
    }
    return (
      <>
        <section>
          <h2 className='font-single-view-heading'>LINKED SECONDARY MIDS</h2>
          <div className='flex flex-col gap-[14px]'>
            {getMerchantLocationLinkedSecondaryMidsResponse.map((locationSecondaryMid, index) => renderLocationSecondaryMid(locationSecondaryMid, index))}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='pb-[28px]'>
      {isInNewLinkSelectionState ? renderAvailableMidSelection() : renderLinkNewSecondaryMidButton() }
      {getMerchantLocationLinkedSecondaryMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedSecondaryMids()}
    </div>
  )
}
export default SingleViewLocationSecondaryMids
