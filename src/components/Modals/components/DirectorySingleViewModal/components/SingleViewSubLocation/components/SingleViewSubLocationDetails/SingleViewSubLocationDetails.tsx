import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {Button, DirectoryMerchantLocationForm, HeadMetadata, TextInputGroup} from 'components'
import {InputColour, InputStyle, InputType, InputWidth} from 'components/TextInputGroup/styles'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import RefreshSvg from 'icons/svgs/refresh.svg'
import {DirectoryLocationMetadata, DirectorySubLocation} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {useDirectoryLocationSubLocations} from 'hooks/useDirectoryLocationSubLocations'
import SingleViewEditableField from '../../../SingleViewEditableField'
import {getLocationList} from 'utils/locationStrings'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'

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
  const {merchantId, planId = '', ref, sub_location_ref: subLocationRef} = useGetRouterQueryString()
  const {
    getMerchantLocationsResponse,
    getMerchantLocationsIsFetching: isGetLocationsFetching,
  } = useDirectoryLocations({
    skipGetLocation: true,
    skipGetLocationsByPage: true,
    getAll: true,
    planRef: planId,
    merchantRef: merchantId,
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
  } = useDirectoryLocationSubLocations({
    skipGetSubLocations: true,
    skipGetSubLocation: true,
    planRef: planId,
    merchantRef: merchantId,
    locationRef: ref,
    subLocationRef: subLocationRef,
  })

  const locationsData = useMemo(() => getMerchantLocationsResponse || [], [getMerchantLocationsResponse])
  const locationStringsList = getLocationList(locationsData)
  const locationValues = useMemo(() => locationStringsList ? ['None', ...locationStringsList.map(location => location.title)] : [], [locationStringsList])

  const {parent_location: parentLocation, sub_location: subLocation} = location
  const parentLocationTitle = parentLocation?.location_title

  const [selectedParentLocationName, setSelectedParentLocationName] = useState<string>(parentLocationTitle || '')
  const [locationIdValue, setLocationIdValue] = useState<string>('')
  const [locationIdValidationError, setLocationIdValidationError] = useState<string>('')

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
    name,
  } = location_metadata || {}

  useEffect(() => { // Reset Parent location field behaviour when edit mode is entered
    if (isInEditState) {
      setLocationIdValue('')
      setSelectedParentLocationName(parentLocationTitle || '')
    }
  }, [isInEditState, parentLocationTitle])

  // Take component out of edit state when unmounted
  useEffect(() => {
    return () => {
      onCancelEditState()
    }
  }, [onCancelEditState])

  useEffect(() => {
    if (isPatchSuccess && patchResponse) {
      const routerSuffix = patchResponse.parent_ref ? `${patchResponse.parent_ref}&sub_location_ref=${patchResponse.location_ref}` : `${patchResponse.location_ref}`
      resetPatchResponse()
      router.push(`${router.basePath}/mid-management/directory/${planId}/${merchantId}?tab=locations&ref=${routerSuffix}`)
    } else if (patchError) {
      resetPatchResponse()
      //@ts-expect-error - TODO: This is a hacky way to get the status code from the error response. Rethink and type this better
      const {status} = patchError as FetchBaseQueryError & {data?: {detail: {loc: string[]; msg: string}[]}, status: number} | null // TODO: Consider a more global approach for this
      setLocationIdValidationError(status === 409 ? 'Enter Unique Location ID' : 'Error updating sub-location')
    }
  }, [isPatchSuccess, merchantId, patchError, patchResponse, planId, resetPatchResponse, router])

  const handleParentLocationChange = useCallback((selectedLocationString: string) => {
    setSelectedParentLocationName(selectedLocationString || '')
    selectedLocationString !== 'None' && setLocationIdValue('')
    setLocationIdValidationError('')
  }, [])

  const handlePatchSave = useCallback(() => {
    if (locationIdValue !== '' || selectedParentLocationName !== 'None') {
      const parentRef = locationsData.find(location => location.location_metadata.name === selectedParentLocationName)?.location_ref || ''
      patchMerchantLocationSubLocation({parentRef, planRef: planId, merchantRef: merchantId, locationRef: ref, subLocationRef: subLocationRef, locationId: locationIdValue})
    } else {
      setLocationIdValidationError('Enter location ID')
    }
  }, [locationIdValue, locationsData, merchantId, patchMerchantLocationSubLocation, planId, ref, selectedParentLocationName, subLocationRef])

  const handleLocationIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationIdValue(event.target.value)
    setLocationIdValidationError('')
  }

  const handleLocationIdBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setLocationIdValidationError('Enter location ID')
    }
  }
  const renderReadOnlyState = () => {
    return (
      <>
        <HeadMetadata pageTitle={`MID Directory - Sub-location: ${name}`} pageDescription={`View this ${isPhysicalLocation ? 'physical' : 'non-physical'} sub-location in the MID Directory. It is the child location of ${parentLocationTitle}`}/>
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
            noShadow
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
              warningMessage = { selectedParentLocationName === 'None' ? 'This sub-location will be turned into a location and will be able to have MIDs and Secondary MIDs assigned directly. This change is permanent and a location cannot be turned into a sub-location.' : ''}
            />
            {selectedParentLocationName === 'None' && (
              <>
                <p className='font-body-4 dark:text-grey-600 pb-4'>Add a Location ID and save?</p>
                <div className='w-72'>
                  <TextInputGroup
                    name='location-id'
                    label='Location ID'
                    value={locationIdValue}
                    onChange={handleLocationIdChange}
                    onBlur={handleLocationIdBlur}
                    onFocus={() => setLocationIdValidationError('')}
                    error={locationIdValidationError}
                    ariaRequired
                    inputType={InputType.TEXT}
                    inputStyle={InputStyle.FULL}
                    inputWidth={InputWidth.FULL}
                    inputColour={locationIdValidationError ? InputColour.RED : InputColour.GREY}
                  />
                </div>
              </>
            )}
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
      planRef: planId,
      merchantRef: merchantId,
      locationRef: ref,
      subLocationRef: subLocationRef,
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
