import {useEffect, useState} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useDirectoryLocationMids} from 'hooks/useDirectoryLocationMids'
import {DirectoryMerchantLocationAvailableMid, DirectoryMerchantLocationMid} from 'types'
import SingleViewCombobox from '../../../SingleViewCombobox'
import CloseIcon from 'icons/svgs/close.svg'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities, UserPermissions} from 'utils/enums'

// TODO: Potentially refactor to share more elements with SingleViewLocationSecondaryMids component once all functionality is settled between the two components
const SingleViewLocationMids = () => {
  const {merchantId, planId, ref} = useGetRouterQueryString()

  const [shouldPrepareDropdownMenu, setShouldPrepareDropdownMenu] = useState<boolean>(false) // When true, checks for (or requests) required API data before allowing rendering of the dropdown menu
  const [shouldRenderDropdownMenu, setShouldRenderDropdownMenu] = useState<boolean>(false)
  const [selectedAvailableMid, setSelectedAvailableMid] = useState<DirectoryMerchantLocationAvailableMid | null>(null)
  const [selectedUnlinkMidIndex, setSelectedUnlinkMidIndex] = useState<number | null>(null) // The index of the mid that is selected to be unlinked
  const [availableMidNotification, setAvailableMidNotification] = useState<string>('')

  const {
    getMerchantLocationLinkedMidsResponse,
    resetGetMerchantLocationLinkedMidsResponse,
    getMerchantLocationLinkedMidsIsLoading,
    getMerchantLocationAvailableMidsResponse,
    resetGetMerchantLocationAvailableMidsResponse,
    postMerchantLocationLinkedMids,
    postMerchantLocationLinkedMidsIsLoading,
    postMerchantLocationLinkedMidsIsSuccess,
    resetPostMerchantLocationLinkedMidsResponse,
    deleteMerchantLocationMidLink,
    deleteMerchantLocationMidLinkIsLoading,
    deleteMerchantLocationMidLinkIsSuccess,
    resetDeleteMerchantLocationMidLinkResponse,
  } = useDirectoryLocationMids({
    planRef: planId,
    merchantRef: merchantId,
    locationRef: ref,
    skipGetLocationAvailableMids: !shouldPrepareDropdownMenu,
  })

  useEffect(() => { // If the user has successfully unlinked a MID, revert to initial state
    if (deleteMerchantLocationMidLinkIsSuccess) {
      resetDeleteMerchantLocationMidLinkResponse()
      resetGetMerchantLocationAvailableMidsResponse()
      setSelectedUnlinkMidIndex(null)
    }

  }, [deleteMerchantLocationMidLinkIsSuccess, getMerchantLocationAvailableMidsResponse, postMerchantLocationLinkedMidsIsSuccess, resetDeleteMerchantLocationMidLinkResponse, resetGetMerchantLocationAvailableMidsResponse])

  useEffect(() => { // If the user has successfully linked a mid, revert to initial state
    if (postMerchantLocationLinkedMidsIsSuccess) {
      resetPostMerchantLocationLinkedMidsResponse()
      resetGetMerchantLocationLinkedMidsResponse()
      resetGetMerchantLocationAvailableMidsResponse()
      setShouldPrepareDropdownMenu(false)
      setShouldRenderDropdownMenu(false)
      setSelectedAvailableMid(null)
    }
  }, [deleteMerchantLocationMidLinkIsSuccess, postMerchantLocationLinkedMidsIsSuccess, resetDeleteMerchantLocationMidLinkResponse, resetGetMerchantLocationAvailableMidsResponse, resetGetMerchantLocationLinkedMidsResponse, resetPostMerchantLocationLinkedMidsResponse])

  useEffect(() => {
    if (getMerchantLocationAvailableMidsResponse && getMerchantLocationAvailableMidsResponse.length > 0 && shouldPrepareDropdownMenu) {
      setShouldRenderDropdownMenu(true)
      setSelectedUnlinkMidIndex(null)
      setAvailableMidNotification('')
    } else if (getMerchantLocationAvailableMidsResponse?.length === 0 && shouldPrepareDropdownMenu) {
      setSelectedUnlinkMidIndex(null)
      setAvailableMidNotification('No MIDs available to link for this Location.')
    } else {
      setShouldRenderDropdownMenu(false)
    }
  }, [getMerchantLocationAvailableMidsResponse, shouldPrepareDropdownMenu])

  useEffect(() => {
    const warningMessage = selectedAvailableMid?.locationLink ? `Linking this MID will break its association with ${selectedAvailableMid.locationLink.location_title}` : ''
    setAvailableMidNotification(warningMessage)
  }, [selectedAvailableMid?.locationLink])

  const hasNoLinkedMids = (!getMerchantLocationLinkedMidsResponse || getMerchantLocationLinkedMidsResponse.length === 0) && !getMerchantLocationLinkedMidsIsLoading

  const renderLocationMid = (locationMid: DirectoryMerchantLocationMid, index) => {
    const {
      payment_scheme_slug: paymentSchemeSlug,
      mid_value: midValue,
      mid_ref: midRef,
    } = locationMid

    return (
      <LinkedListItem
        key={midRef}
        index={index}
        paymentSchemeSlug={paymentSchemeSlug}
        value={midValue}
        link={`/mid-management/directory/${planId}/${merchantId}?tab=mids&ref=${midRef}`}
        refValue={midRef}
        setSelectedUnlinkIndexFn={setSelectedUnlinkMidIndex}
        isInUnlinkingConfirmationState={selectedUnlinkMidIndex === index}
        unlinkFn={() => deleteMerchantLocationMidLink({
          planRef: planId,
          merchantRef: merchantId,
          locationRef: ref,
          midRef,
        })}
        isUnlinking={deleteMerchantLocationMidLinkIsLoading}
        setShouldRenderNewLinkDropdownMenuFn={setShouldPrepareDropdownMenu}
        setNewLinkNotificationFn={setAvailableMidNotification}
        entityType={LinkableEntities.MID}
      />
    )
  }

  const renderLinkNewMidButton = () => (
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
      >Link New MID
      </Button>
    </div>
  )

  const renderAvailableMidDropdown = () => {
    const onSaveHandler = () => {
      if (selectedAvailableMid) {
        postMerchantLocationLinkedMids({
          planRef: planId,
          merchantRef: merchantId,
          locationRef: ref,
          midRefs: [selectedAvailableMid.mid.mid_ref],
        })
      }
    }

    const onCloseHandler = () => {
      setShouldRenderDropdownMenu(false)
      setSelectedAvailableMid(null)
      setShouldPrepareDropdownMenu(false)
    }

    return (
      <div className='flex items-center justify-end gap-[10px]'>
        <div className='h-[36px] w-full'>
          <SingleViewCombobox
            selectedEntity={selectedAvailableMid }
            availableEntities={getMerchantLocationAvailableMidsResponse || []}
            entityValueFn={(entity: DirectoryMerchantLocationAvailableMid) => entity?.mid?.mid_value}
            entityPaymentSchemeSlugFn={(entity: DirectoryMerchantLocationAvailableMid) => entity?.mid?.payment_scheme_slug || ''}
            onChangeFn={setSelectedAvailableMid}
            shouldRenderPaymentCardIcon
            entityLabel = 'MID'
            isDisabled={postMerchantLocationLinkedMidsIsLoading}
          />
        </div>

        <div className='flex items-center gap-[10px]'>
          <Button
            handleClick={() => !postMerchantLocationLinkedMidsIsLoading && onSaveHandler() }
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_SMALL}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Save Mid'}
            isDisabled={!selectedAvailableMid || postMerchantLocationLinkedMidsIsLoading}
          >{postMerchantLocationLinkedMidsIsLoading ? 'Saving...' : 'Save'}
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
      </div>

    )
  }

  const renderLinkedMids = () => {
    if (hasNoLinkedMids) {
      return <i className='font-body-4'>There are no MIDs to view.</i>
    }
    return (
      <section>
        <h2 className='font-modal-heading'>LINKED MIDS</h2>
        <div className='flex flex-col gap-[14px]'>
          {getMerchantLocationLinkedMidsResponse?.map((locationMid, index) => renderLocationMid(locationMid, index))}
        </div>
      </section>
    )
  }

  return (
    <div className='pb-[28px]'>
      <section className='h-[40px]'>
        {shouldRenderDropdownMenu ? renderAvailableMidDropdown() : renderLinkNewMidButton() }
      </section>
      <section className='font-body-4 text-red h-[40px]'>
        <p>{availableMidNotification}</p>
      </section>
      {getMerchantLocationLinkedMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderLinkedMids()}
    </div>
  )
}

export default SingleViewLocationMids
