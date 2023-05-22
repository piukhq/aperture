import {useEffect, useCallback} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import Link from 'next/link'
import {Button, DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryLocation, DirectoryLocationMetadata} from 'types'
import {UserPermissions} from 'utils/enums'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'

type Props = {
  location: DirectoryLocation,
  isInEditState: boolean,
  setIsInEditState: (isInEditState: boolean) => void,
  onCancelEditState: () => void,
}

const SingleViewLocationSubLocations = ({location, isInEditState, setIsInEditState, onCancelEditState}: Props) => {
  const {merchantId, planId, ref} = useGetRouterQueryString()

  const {
    getMerchantLocationSubLocationsResponse,
    getMerchantLocationSubLocationsIsLoading,
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocation: true,
    planRef: planId,
    merchantRef: merchantId,
    locationRef: ref,
  })

  const hasNoLinkedSubLocations = (!getMerchantLocationSubLocationsResponse || getMerchantLocationSubLocationsResponse.length === 0) && !getMerchantLocationSubLocationsIsLoading

  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    postMerchantLocationSubLocation({
      planRef: planId,
      merchantRef: merchantId,
      locationRef: ref,
      secondaryMidRef: '',
      ...locationMetadata,
    })
  }, [postMerchantLocationSubLocation, planId, merchantId, ref])

  const renderNewSubLocationForm = () => (
    <DirectoryMerchantLocationForm
      location={location}
      isNewLocationSubLocation={true}
      parentLocation={location.location_metadata.name}
      onSaveHandler={handleSave}
      setIsInEditState={setIsInEditState}
      onCancelHandler={onCancelEditState}
      isLoading={postMerchantLocationSubLocationIsLoading}
      isSuccess={postMerchantLocationSubLocationIsSuccess}
      resetResponse={resetPostMerchantLocationSubLocationResponse}
      error={postMerchantLocationSubLocationError}
    />
  )

  const renderSubLocation = (subLocation: DirectoryLocation) => {
    const {
      location_metadata: subLocationMetadata,
      location_ref: subLocationRef,
    } = subLocation

    return (
      <li className='flex items-center overflow-x-hidden font-modal-data text-blue w-[500px] truncate' key={subLocationRef}>
        <Link
          href={`/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${ref}&sub_location_ref=${subLocationRef}`}
          passHref
        >
          {subLocationMetadata.name}
        </Link>
      </li>
    )
  }

  const renderLinkNewSubLocationButton = () => (
    <div className='flex justify-end items-center'>
      <Button
        handleClick={() => setIsInEditState(true)}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        additionalStyles='text-[.75rem] leading-3'
        requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
      >New Sub-location
      </Button>
    </div>
  )

  const renderLinkedSubLocations = () => (
    <section>
      <h2 className='font-modal-heading'>SUB-LOCATIONS</h2>
      <div className='flex flex-col gap-[14px]'>
        {getMerchantLocationSubLocationsResponse.map((subLocation) => renderSubLocation(subLocation))}
      </div>
    </section>
  )

  if (!getMerchantLocationSubLocationsResponse && !hasNoLinkedSubLocations) { return <i className='font-body-4'>Loading...</i> }

  if (isInEditState) { return renderNewSubLocationForm() }

  return (
    <div className='pb-[28px]'>
      {hasNoLinkedSubLocations && (
        <section className='font-body-4 h-[40px] mb-[20px]'>
          <p>Creating a sub-location will make {location.location_metadata.name} non-physical. Any address details for this location will be copied to the new sub-location but can be edited. Continue?</p>
        </section>
      )}
      <section className='h-[40px]'>
        {renderLinkNewSubLocationButton()}
      </section>
      {!hasNoLinkedSubLocations && renderLinkedSubLocations()}
      {isInEditState && renderNewSubLocationForm()}
    </div>
  )
}

export default SingleViewLocationSubLocations
