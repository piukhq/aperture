import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationSecondaryMids} from 'hooks/useMidManagementLocationSecondaryMids'
import {DirectoryMerchantLocationSecondaryMid, DirectorySecondaryMid} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import CloseIcon from 'icons/svgs/close.svg'
import PaymentCardIcon from '../PaymentCardIcon'
import {LinkableEntities} from 'utils/enums'

const SingleViewLocationSecondaryMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const [shouldRenderDropdownMenu, setShouldRenderDropdownMenu] = useState(false)
  const [selectedAvailableSecondaryMid, setSelectedAvailableSecondaryMid] = useState(null)
  const [selectedUnlinkSecondaryMidIndex, setSelectedUnlinkSecondaryMidIndex] = useState(null) // The index of the secondary mid that is selected to be unlinked

  const {
    getMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading,
    postMerchantLocationLinkedSecondaryMid,
    postMerchantLocationLinkedSecondaryMidIsLoading,
    deleteMerchantLocationSecondaryMidLink,
    deleteMerchantLocationSecondaryMidLinkIsLoading,
    deleteMerchantLocationSecondaryMidLinkIsSuccess,
    resetDeleteMerchantLocationSecondaryMidLinkResponse,
  } = useMidManagementLocationSecondaryMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const {getMerchantSecondaryMidsResponse} = useMidManagementSecondaryMids({ // Using location ref in query string to only return secondary mids NOT linked to this location
    planRef: planId as string,
    merchantRef: merchantId as string,
    skipGetSecondaryMid: true,
    locationRef: ref as string,
  })

  useEffect(() => { // If the user has successfully unlinked a MID, revert to initial state
    if (deleteMerchantLocationSecondaryMidLinkIsSuccess) {
      resetDeleteMerchantLocationSecondaryMidLinkResponse()
      setSelectedUnlinkSecondaryMidIndex(null)
    }
  }, [deleteMerchantLocationSecondaryMidLinkIsSuccess, resetDeleteMerchantLocationSecondaryMidLinkResponse])

  const hasNoLinkedSecondaryMids = (!getMerchantLocationLinkedSecondaryMidsResponse || getMerchantLocationLinkedSecondaryMidsResponse.length === 0) && !getMerchantLocationLinkedSecondaryMidsIsLoading

  const renderLocationSecondaryMid = (locationSecondaryMid: DirectoryMerchantLocationSecondaryMid, index: number) => {
    const {
      payment_scheme_code: paymentSchemeCode,
      secondary_mid_value: secondaryMidValue,
      secondary_mid_ref: secondaryMidRef,
      link_ref: linkRef,
    } = locationSecondaryMid

    return (
      <LinkedListItem
        key={index}
        index={index}
        paymentSchemeCode={paymentSchemeCode}
        value={secondaryMidValue}
        refValue={secondaryMidRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkSecondaryMidIndex}
        isInUnlinkingConfirmationState={selectedUnlinkSecondaryMidIndex === index}
        unlinkFn={() => deleteMerchantLocationSecondaryMidLink({
          linkRef,
          planRef: planId as string,
          merchantRef: merchantId as string,
        })}
        isUnlinking={deleteMerchantLocationSecondaryMidLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={setShouldRenderDropdownMenu}
        entityType={LinkableEntities.SECONDARY_MID}
      />
    )
  }

  const handleLinkNewSecondaryMidButtonClick = () => {
    if (getMerchantSecondaryMidsResponse?.length > 0) {
      setShouldRenderDropdownMenu(true)
      setSelectedUnlinkSecondaryMidIndex(null)
    }
  }

  const renderLinkNewSecondaryMidButton = () => (
    <section className='flex justify-end items-center mb-[10px]'>
      <Button
        handleClick={handleLinkNewSecondaryMidButtonClick}
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

  const renderAvailableSecondaryMidDropdown = () => {
    const onSaveHandler = () => {
      if (selectedAvailableSecondaryMid) {
        postMerchantLocationLinkedSecondaryMid({
          planRef: planId as string,
          merchantRef: merchantId as string,
          locationRef: ref as string,
          secondaryMidRef: selectedAvailableSecondaryMid.secondary_mid_ref,
        })
      }
    }

    const onCloseHandler = () => {
      setShouldRenderDropdownMenu(false)
      setSelectedAvailableSecondaryMid(null)
    }

    const renderDropdownSecondaryMid = (secondaryMid: DirectorySecondaryMid) => {
      const {secondary_mid: midValue, payment_scheme_code: paymentSchemeCode} = secondaryMid.secondary_mid_metadata
      return (
        <div className='flex items-center'>
          <div className='w-[32px] h-[23px]'>
            <PaymentCardIcon paymentSchemeCode={paymentSchemeCode} />
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
            displayValue={selectedAvailableSecondaryMid || 'Select MID'}
            displayValues={getMerchantSecondaryMidsResponse}
            onChangeDisplayValue={setSelectedAvailableSecondaryMid}
            renderFn={renderDropdownSecondaryMid}
          />
        </div>

        <div className='flex items-center gap-[10px]'>
          <Button
            handleClick={!postMerchantLocationLinkedSecondaryMidIsLoading ? onSaveHandler : null}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Save Secondary Mid'}
          >{postMerchantLocationLinkedSecondaryMidIsLoading ? 'Saving...' : 'Save'}
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
    if (hasNoLinkedSecondaryMids) {
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
      {shouldRenderDropdownMenu ? renderAvailableSecondaryMidDropdown() : renderLinkNewSecondaryMidButton() }
      {getMerchantLocationLinkedSecondaryMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedSecondaryMids()}
    </div>
  )
}
export default SingleViewLocationSecondaryMids
