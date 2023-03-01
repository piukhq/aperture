import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {Button, DirectoryMerchantLocationForm} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryLocationMetadata, DirectorySubLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'
import SingleViewEditableField from '../../../SingleViewEditableField'
import {getLocationList} from 'utils/locationStrings'

type Props = {
  isInEditState: boolean
  setIsInEditState: (isInEditState: boolean) => void
  location: DirectorySubLocation
  onCancelEditState: () => void
  handleRefresh: () => void
  isRefreshing: boolean
}

const SingleViewSubLocationDetails = ({isInEditState, location, setIsInEditState, onCancelEditState, handleRefresh, isRefreshing}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref, sub_location_ref: subLocationRef} = router.query


  const {
    getMerchantLocationsResponse,
    getMerchantLocationsIsFetching: isGetLocationsFetching,
  } = useMidManagementLocations({
    skipGetLocation: true,
    getAll: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const {
    putMerchantLocationSubLocation,
    putMerchantLocationSubLocationIsSuccess: isPutSuccess,
    putMerchantLocationSubLocationIsLoading: isPutLoading,
    putMerchantLocationSubLocationError: putError,
    resetPutMerchantLocationSubLocationResponse: resetPutResponse,
    patchMerchantLocationSubLocation,
    patchMerchantLocationSubLocationIsSuccess: isPatchSuccess,
    patchMerchantLocationSubLocationIsLoading: isPatchLoading,
    patchMerchantLocationSubLocationError: patchError,
    patchMerchantLocationSubLocationResponse: patchResponse,
    resetPatchMerchantLocationSubLocationResponse: resetPatchResponse,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocations: true,
    skipGetSubLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
    subLocationRef: subLocationRef as string,
  })


  const locationsData = useMemo(() => getMerchantLocationsResponse || [], [getMerchantLocationsResponse])
  const locationStringsList = getLocationList(locationsData)
  const locationValues = useMemo(() => locationStringsList ? ['None', ...locationStringsList.map(location => location.title)] : [], [locationStringsList])

  const {parent_location: parentLocation, sub_location: subLocation} = location
  const parentLocationTitle = parentLocation?.location_title

  const [selectedParentLocationName, setSelectedParentLocationName] = useState(parentLocationTitle || '')

  const {
    date_added: dateAdded,
    location_metadata,
  } = subLocation || {}

  const {
    address_line_1: addressLine1,
    address_line_2: addressLine2,
    town_city: townCity,
    county,
    country,
    postcode,
    is_physical_location: isPhysicalLocation,
  } = location_metadata || {}

  // Take component out of edit state when unmounted
  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  useEffect(() => {
    if (isPatchSuccess) {
      const routerSuffix = patchResponse.parent_ref ? `${patchResponse.parent_ref}&sub_location_ref=${patchResponse.location_ref}` : `${patchResponse.location_ref}`
      resetPatchResponse()
      router.push(`${router.basePath}/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${routerSuffix}`)
    }
  }, [isPatchSuccess, merchantId, patchResponse, planId, resetPatchResponse, router])

  const handleParentLocationChange = useCallback((selectedLocationString: string) => {
    setSelectedParentLocationName(selectedLocationString || null)
  }, [])

  const handlePatchSave = useCallback(() => {
    const parentRef = locationsData.find(location => location.location_metadata.name === selectedParentLocationName)?.location_ref || null
    patchMerchantLocationSubLocation({parentRef, planRef: planId as string, merchantRef: merchantId as string, locationRef: ref as string, subLocationRef: subLocationRef as string})
  }, [locationsData, merchantId, patchMerchantLocationSubLocation, planId, ref, selectedParentLocationName, subLocationRef])

  const renderReadOnlyState = () => {
    return (
      <>
        <div data-testid='sub-location-refresh-button' className='flex w-full justify-end mb-[12px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
            handleClick={handleRefresh}
            ariaLabel='Refresh Sub-location details'
            isDisabled={isRefreshing}
          ><RefreshSvg />{isRefreshing ? 'Refreshing' : 'Refresh'}
          </Button>
        </div>


        <div className='grid grid-cols-2 gap-[32px] w-full'>
          <section className='col-span-1'>
            <h2 className='font-modal-heading'>DATE ADDED</h2>
            <p className='font-modal-data'>{isoToDateTime(dateAdded)}</p>
          </section>
          <section className='col-span-1'>
            <h2 className='font-modal-heading'>PHYSICAL LOCATION</h2>
            <p className='font-modal-data'>{isPhysicalLocation ? 'Yes' : 'No'}</p>
          </section>
          <section className='col-span-2'>
            <SingleViewEditableField
              header='PARENT LOCATION'
              label='Parent Location'
              actionVerb='save'
              value={selectedParentLocationName}
              dropdownValues={locationValues}
              isSaving={isPatchLoading}
              isDisabled={isPatchLoading || isPutLoading || isRefreshing || isGetLocationsFetching}
              handleValueChange={handleParentLocationChange}
              handleCancel={() => setSelectedParentLocationName(parentLocationTitle)}
              handleSave={handlePatchSave}
              successResponse={isPatchSuccess}
              errorResponse={patchError}
              warningMessage = { selectedParentLocationName === 'None' ? 'This sub-location will be turned into a location and will be able to have MIDs and Secondary MIDs assigned directly. This change is permanent and a location cannot be turned into a sub-location' : null}
            />
          </section>
          {isPhysicalLocation && (
            <section className='col-span-2'>
              <h2 className='font-modal-heading'>ADDRESS</h2>
              {addressLine1 && <p className='font-modal-data'>{addressLine1}</p>}
              {addressLine2 && <p className='font-modal-data'>{addressLine2}</p>}
              {townCity && <p className='font-modal-data'>{townCity}</p>}
              {county && <p className='font-modal-data'>{county}</p>}
              {country && <p className='font-modal-data'>{country}</p>}
              {postcode && <p className='font-modal-data'>{postcode}</p>}
            </section>
          )}
        </div>
      </>
    )
  }

  const handlePutSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    putMerchantLocationSubLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      locationRef: ref as string,
      subLocationRef: subLocationRef as string,
      ...locationMetadata,
    })
  }, [putMerchantLocationSubLocation, planId, merchantId, ref, subLocationRef])


  return (
    <>
      {isInEditState ? (
        <DirectoryMerchantLocationForm
          location={subLocation}
          isExistingSubLocation={true}
          setIsInEditState={setIsInEditState}
          parentLocation={parentLocation.location_title}
          onSaveHandler={handlePutSave}
          onCancelHandler={onCancelEditState}
          isLoading={isPutLoading}
          isSuccess={isPutSuccess}
          resetResponse={resetPutResponse}
          error={putError}
        />
      ) : (
        <div className='pb-[28px]'>
          {renderReadOnlyState()}
        </div>
      )}
    </>
  )
}
export default SingleViewSubLocationDetails
