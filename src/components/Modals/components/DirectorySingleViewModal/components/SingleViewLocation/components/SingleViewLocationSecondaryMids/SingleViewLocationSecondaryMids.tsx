import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, Dropdown, PaymentCardIcon} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {useMidManagementLocationSecondaryMids} from 'hooks/useMidManagementLocationSecondaryMids'
import {midManagementMerchantSecondaryMidsApi} from 'services/midManagementMerchantSecondaryMids'
import {useAppDispatch} from 'app/hooks'
import {DirectoryMerchantLocationSecondaryMid, DirectorySecondaryMid} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import CloseIcon from 'icons/svgs/close.svg'
import {LinkableEntities, UserPermissions} from 'utils/enums'

const SingleViewLocationSecondaryMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const dispatch = useAppDispatch()
  const [shouldPrepareDropdownMenu, setShouldPrepareDropdownMenu] = useState(false) // When true, checks for (or requests) required API data before allowing rendering of the dropdown menu
  const [shouldRenderDropdownMenu, setShouldRenderDropdownMenu] = useState(false)
  const [selectedAvailableSecondaryMid, setSelectedAvailableSecondaryMid] = useState(null)
  const [selectedUnlinkSecondaryMidIndex, setSelectedUnlinkSecondaryMidIndex] = useState(null) // The index of the secondary mid that is selected to be unlinked
  const [availableSecondaryMidNotification, setAvailableSecondaryMidNotification] = useState('')

  const {
    getMerchantLocationLinkedSecondaryMidsResponse,
    getMerchantLocationLinkedSecondaryMidsIsLoading,
    postMerchantLocationLinkedSecondaryMid,
    postMerchantLocationLinkedSecondaryMidIsLoading,
    postMerchantLocationLinkedSecondaryMidIsSuccess,
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
    skipGetSecondaryMid: true,
    skipGetSecondaryMids: !shouldPrepareDropdownMenu,
    skipGetSecondaryMidsByPage: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  useEffect(() => { // If the user has successfully unlinked a MID, revert to initial state
    if (deleteMerchantLocationSecondaryMidLinkIsSuccess) {
      resetDeleteMerchantLocationSecondaryMidLinkResponse()
      dispatch(midManagementMerchantSecondaryMidsApi.util.resetApiState()) // Reset the secondary mids state so that the next time the user opens the dropdown menu, the list of available secondary mids is refreshed
      setSelectedUnlinkSecondaryMidIndex(null)
      setShouldPrepareDropdownMenu(false)
    }
  }, [deleteMerchantLocationSecondaryMidLinkIsSuccess, dispatch, resetDeleteMerchantLocationSecondaryMidLinkResponse])

  useEffect(() => { // If the user has successfully linked a MID, revert to initial state
    if (postMerchantLocationLinkedSecondaryMidIsSuccess) {
      setSelectedAvailableSecondaryMid(null)
      dispatch(midManagementMerchantSecondaryMidsApi.util.resetApiState()) // Reset the secondary mids state so that the next time the user opens the dropdown menu, the list of available secondary mids is refreshed
      setShouldPrepareDropdownMenu(false)
    }
  }, [dispatch, postMerchantLocationLinkedSecondaryMidIsSuccess])

  useEffect(() => {
    if (getMerchantSecondaryMidsResponse?.length > 0 && shouldPrepareDropdownMenu) {
      setShouldRenderDropdownMenu(true)
      setSelectedUnlinkSecondaryMidIndex(null)
      setAvailableSecondaryMidNotification('')
    } else if (getMerchantSecondaryMidsResponse?.length === 0 && shouldPrepareDropdownMenu) {
      setAvailableSecondaryMidNotification('No Secondary MIDs available to link for this Location.')
      setShouldRenderDropdownMenu(false)
      setSelectedUnlinkSecondaryMidIndex(null)
    } else {
      setShouldRenderDropdownMenu(false)
    }
  }, [getMerchantSecondaryMidsResponse?.length, shouldPrepareDropdownMenu])

  const hasNoLinkedSecondaryMids = (!getMerchantLocationLinkedSecondaryMidsResponse || getMerchantLocationLinkedSecondaryMidsResponse.length === 0) && !getMerchantLocationLinkedSecondaryMidsIsLoading

  const renderLocationSecondaryMid = (locationSecondaryMid: DirectoryMerchantLocationSecondaryMid, index: number) => {
    const {
      payment_scheme_slug: paymentSchemeSlug,
      secondary_mid_value: secondaryMidValue,
      secondary_mid_ref: secondaryMidRef,
      link_ref: linkRef,
    } = locationSecondaryMid

    return (
      <LinkedListItem
        key={secondaryMidRef}
        index={index}
        paymentSchemeSlug={paymentSchemeSlug}
        value={secondaryMidValue}
        link={`/mid-management/directory/${planId}/${merchantId}?tab=secondary-mids&ref=${secondaryMidRef}`}
        refValue={secondaryMidRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkSecondaryMidIndex}
        isInUnlinkingConfirmationState={selectedUnlinkSecondaryMidIndex === index}
        unlinkFn={() => deleteMerchantLocationSecondaryMidLink({
          linkRef,
          planRef: planId as string,
          merchantRef: merchantId as string,
          locationRef: ref as string,
        })}
        isUnlinking={deleteMerchantLocationSecondaryMidLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={setShouldPrepareDropdownMenu}
        setNewLinkNotificationFn={setAvailableSecondaryMidNotification}
        entityType={LinkableEntities.SECONDARY_MID}
      />
    )
  }

  const renderLinkNewSecondaryMidButton = () => (
    <div className='flex justify-end items-center'>
      <Button
        handleClick={() => setShouldPrepareDropdownMenu(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
        additionalStyles='text-[.75rem] leading-3'
      >Link New Secondary MID
      </Button>
    </div>
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
      setShouldPrepareDropdownMenu(false)
    }

    const renderDropdownSecondaryMid = (secondaryMid: DirectorySecondaryMid) => {
      const {secondary_mid: midValue, payment_scheme_slug: paymentSchemeSlug} = secondaryMid.secondary_mid_metadata
      return (
        <div className='flex items-center'>
          <div className='w-[32px] h-[23px]'>
            <PaymentCardIcon paymentSchemeSlug={paymentSchemeSlug} />
          </div>
          <p className='ml-[13px] font-modal-data'>
            {midValue}
          </p>
        </div>
      )
    }

    return (
      <div className='flex items-center justify-end gap-[10px]'>
        <div className='h-[36px] w-full'>
          <Dropdown
            displayValue={selectedAvailableSecondaryMid || 'Select Secondary MID'}
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
      </div>
    )
  }

  const renderLinkedSecondaryMids = () => {
    if (hasNoLinkedSecondaryMids) {
      return <i className='font-body-4'>There are no Secondary MIDs to view.</i>
    }
    return (
      <section>
        <h2 className='font-modal-heading'>LINKED SECONDARY MIDS</h2>
        <div className='flex flex-col gap-[14px]'>
          {getMerchantLocationLinkedSecondaryMidsResponse.map((locationSecondaryMid, index) => renderLocationSecondaryMid(locationSecondaryMid, index))}
        </div>
      </section>
    )
  }

  return (
    <div className='pb-[28px]'>
      <section className='h-[40px]'>
        {shouldRenderDropdownMenu ? renderAvailableSecondaryMidDropdown() : renderLinkNewSecondaryMidButton() }
      </section>
      <section className='font-body-4 text-red h-[40px]'>
        <p>{availableSecondaryMidNotification}</p>
      </section>
      {getMerchantLocationLinkedSecondaryMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedSecondaryMids()}
    </div>
  )
}
export default SingleViewLocationSecondaryMids
