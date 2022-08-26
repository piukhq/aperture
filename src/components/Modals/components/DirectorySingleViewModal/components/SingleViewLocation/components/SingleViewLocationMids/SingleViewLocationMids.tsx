import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationMids} from 'hooks/useMidManagementLocationMids'
import {DirectoryMerchantLocationAvailableMid, DirectoryMerchantLocationMid} from 'types'
import CloseIcon from 'icons/svgs/close.svg'
import PaymentCardIcon from '../PaymentCardIcon'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities} from 'utils/enums'

// TODO: Potentially refactor to share more elements with SingleViewLocationSecondaryMids component once all functionality is settled between the two components
const SingleViewLocationMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const [shouldPrepareDropdownMenu, setShouldPrepareDropdownMenu] = useState(false)
  const [shouldRenderDropdownMenu, setShouldRenderDropdownMenu] = useState(false)
  const [selectedAvailableMid, setSelectedAvailableMid] = useState(null)
  const [selectedUnlinkMidIndex, setSelectedUnlinkMidIndex] = useState(null) // The index of the mid that is selected to be unlinked
  const [availableMidLocationWarning, setAvailableMidLocationWarning] = useState('')

  const {
    getMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationAvailableMidsResponse,
    postMerchantLocationLinkedMid,
    postMerchantLocationLinkedMidIsLoading,
    deleteMerchantLocationMidLink,
    deleteMerchantLocationMidLinkIsLoading,
    deleteMerchantLocationMidLinkIsSuccess,
    resetDeleteMerchantLocationMidLinkResponse,
  } = useMidManagementLocationMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
    skipGetLocationAvailableMids: !shouldPrepareDropdownMenu,
  })

  useEffect(() => { // If the user has successfully unlinked a MID, revert to initial state
    if (deleteMerchantLocationMidLinkIsSuccess) {
      resetDeleteMerchantLocationMidLinkResponse()
      setSelectedUnlinkMidIndex(null)
      setShouldPrepareDropdownMenu(false)
    }
  }, [deleteMerchantLocationMidLinkIsSuccess, resetDeleteMerchantLocationMidLinkResponse, shouldPrepareDropdownMenu])

  useEffect(() => {
    if (getMerchantLocationAvailableMidsResponse?.length > 0 && shouldPrepareDropdownMenu) {
      setShouldRenderDropdownMenu(true)
      setSelectedUnlinkMidIndex(null)
    }
  }, [getMerchantLocationAvailableMidsResponse?.length, shouldPrepareDropdownMenu])


  useEffect(() => {
    selectedAvailableMid?.locationLink ? setAvailableMidLocationWarning(`Linking this MID will break its association with ${selectedAvailableMid.locationLink.location_title}`) : setAvailableMidLocationWarning('')
  }, [selectedAvailableMid?.locationLink])


  const hasNoLinkedMids = (!getMerchantLocationLinkedMidsResponse || getMerchantLocationLinkedMidsResponse.length === 0) && !getMerchantLocationLinkedMidsIsLoading

  const renderLocationMid = (locationMid: DirectoryMerchantLocationMid, index: number) => {
    const {
      payment_scheme_code: paymentSchemeCode,
      mid_value: midValue,
      mid_ref: midRef,
      link_ref: linkRef,
    } = locationMid

    return (
      <LinkedListItem
        key={index}
        index={index}
        paymentSchemeCode={paymentSchemeCode}
        value={midValue}
        refValue={midRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkMidIndex}
        isInUnlinkingConfirmationState={selectedUnlinkMidIndex === index}
        unlinkFn={() => deleteMerchantLocationMidLink({
          linkRef,
          planRef: planId as string,
          merchantRef: merchantId as string,
        })}
        isUnlinking={deleteMerchantLocationMidLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={setShouldRenderDropdownMenu}
        entityType={LinkableEntities.MID}
      />
    )
  }

  const renderLinkNewMidButton = () => (
    <section className='flex justify-end items-center mb-[40px]'>
      <Button
        handleClick={() => setShouldPrepareDropdownMenu(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[12px] leading-[12px]'
      >Link New MID
      </Button>
    </section>
  )

  const renderAvailableMidDropdown = () => {
    const onSaveHandler = () => {
      if (selectedAvailableMid) {
        postMerchantLocationLinkedMid({
          planRef: planId as string,
          merchantRef: merchantId as string,
          locationRef: ref as string,
          midRef: selectedAvailableMid.mid_ref,
        })
      }
    }

    const onCloseHandler = () => {
      setShouldRenderDropdownMenu(false)
      setSelectedAvailableMid(null)
      setShouldPrepareDropdownMenu(false)
    }

    const renderDropdownMid = (mid: DirectoryMerchantLocationAvailableMid) => {
      const {mid_value: midValue, payment_scheme_code: paymentSchemeCode} = mid.mid
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
      <>
        <section className='flex items-center justify-end gap-[10px] mb-[5px]'>
          <div className='h-[36px] w-full'>
            <Dropdown
              displayValue={selectedAvailableMid || 'Select MID'}
              displayValues={getMerchantLocationAvailableMidsResponse}
              onChangeDisplayValue={setSelectedAvailableMid}
              renderFn={renderDropdownMid}
            />
          </div>

          <div className='flex items-center gap-[10px]'>
            <Button
              handleClick={!postMerchantLocationLinkedMidIsLoading ? onSaveHandler : null}
              buttonType={ButtonType.SUBMIT}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
              buttonBackground={ButtonBackground.BLUE}
              labelColour={LabelColour.WHITE}
              labelWeight={LabelWeight.SEMIBOLD}
              ariaLabel={'Save Mid'}
            >{postMerchantLocationLinkedMidIsLoading ? 'Saving...' : 'Save'}
            </Button>

            <Button
              handleClick={onCloseHandler}
              buttonSize={ButtonSize.MEDIUM_ICON}
              buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
              buttonBackground={ButtonBackground.LIGHT_GREY}
              ariaLabel='Cancel New Mid Link'
            ><CloseIcon className='w-[14px] h-[14px] fill-grey-700' />
            </Button>
          </div>
        </section>
        <section className='font-body-4 text-red h-[35px]'>
          <p>{availableMidLocationWarning}</p>
        </section>
      </>
    )
  }

  const renderLinkedMids = () => {
    if (hasNoLinkedMids) {
      return <i className='font-body-4'>There are no MIDs to view.</i>
    }
    return (
      <section>
        <h2 className='font-single-view-heading'>LINKED MIDS</h2>
        <div className='flex flex-col gap-[14px]'>
          {getMerchantLocationLinkedMidsResponse.map((locationMid, index) => renderLocationMid(locationMid, index))}
        </div>
      </section>
    )
  }

  return (
    <div className='pb-[28px]'>
      {shouldRenderDropdownMenu ? renderAvailableMidDropdown() : renderLinkNewMidButton() }
      {getMerchantLocationLinkedMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedMids()}
    </div>
  )
}
export default SingleViewLocationMids

