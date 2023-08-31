import {useCallback, useEffect, useMemo, useState} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Modal, DirectoryMerchantLocationForm} from 'components'
import {useDirectoryLocations} from 'hooks/useDirectoryLocations'
import {useDirectoryLocationSubLocations} from 'hooks/useDirectoryLocationSubLocations'
import {reset as merchantReset} from 'features/directoryMerchantSlice'
import {getLocationLabel, reset as locationReset} from 'features/directoryLocationSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
import {DirectoryLocationMetadata} from 'types'
import {getLocationList} from 'utils/locationStrings'

const DirectoryLocationModal = () => {
  const {planId, merchantId} = useGetRouterQueryString()
  const dispatch = useAppDispatch()

  const {
    postMerchantLocation,
    postMerchantLocationIsSuccess,
    postMerchantLocationIsLoading,
    postMerchantLocationError,
    resetPostMerchantLocationResponse,
    getMerchantLocationsResponse,
  } = useDirectoryLocations({
    skipGetLocation: true,
    getAll: true,
    skipGetLocationsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
  } = useDirectoryLocationSubLocations({
    skipGetSubLocation: true,
    skipGetSubLocations: true,
    planRef: planId,
    merchantRef: merchantId,
    locationRef: '',
  })

  const locationLabel = useAppSelector(getLocationLabel)
  const [parentLocation, setParentLocation] = useState<string>('None')
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState<boolean>(false)

  const closeModal = useCallback(() => {
    resetPostMerchantLocationResponse()
    resetPostMerchantLocationSubLocationResponse()
    dispatch(locationReset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch, resetPostMerchantLocationResponse, resetPostMerchantLocationSubLocationResponse])

  // TODO: Handle unhappy path
  const handleErrorResponse = useCallback((error) => {
    console.error(error)
  }, [])

  useEffect(() => {
    if (postMerchantLocationError) {
      handleErrorResponse(postMerchantLocationError)
    } else if (postMerchantLocationIsSuccess) {
      resetPostMerchantLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
      dispatch(merchantReset())
      dispatch(locationReset())
    }
  }, [
    postMerchantLocationIsSuccess,
    postMerchantLocationError,
    resetPostMerchantLocationResponse,
    handleErrorResponse,
    dispatch,
  ])

  useEffect(() => {
    if (postMerchantLocationSubLocationError) {
      handleErrorResponse(postMerchantLocationSubLocationError)
    } else if (postMerchantLocationSubLocationIsSuccess) {
      resetPostMerchantLocationSubLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
    handleErrorResponse,
    dispatch,
  ])


  const locationsData = useMemo(() => getMerchantLocationsResponse || [], [getMerchantLocationsResponse])
  const locationList = getLocationList(locationsData)
  const locationValues = useMemo(() => locationList ? ['None'].concat(locationList.map(location => location.title)) : ['None'], [locationList])

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    if (parentLocation !== 'None') {
      const locationRef = locationList?.find(location => location.title === parentLocation)?.location_ref

      postMerchantLocationSubLocation({
        planRef: planId,
        merchantRef: merchantId,
        locationRef,
        secondaryMidRef: '',
        ...locationMetadata,
      })
    } else {
      postMerchantLocation({
        planRef: planId,
        merchantRef: merchantId,
        secondaryMidRef: '',
        ...locationMetadata,
      })
    }
  }, [parentLocation, locationList, postMerchantLocationSubLocation, planId, merchantId, postMerchantLocation])

  const handleParentLocationChange = useCallback((parentLocation) => {
    setParentLocation(parentLocation)
  }, [])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={`New ${locationLabel}`} onCloseFn={closeModal} setIsCloseButtonFocused={setIsCloseButtonFocused}>
      <div className='mt-[20px] mx-[25px]'>
        <DirectoryMerchantLocationForm
          parentLocationStrings={locationValues}
          parentLocation={parentLocation}
          parentLocationChangeHandler={handleParentLocationChange}
          onSaveHandler={handleSave}
          onCancelHandler={closeModal}
          isLoading={postMerchantLocationIsLoading || postMerchantLocationSubLocationIsLoading}
          isSuccess={postMerchantLocationIsSuccess || postMerchantLocationSubLocationIsSuccess}
          resetResponse={parentLocation === 'None' ? resetPostMerchantLocationResponse : resetPostMerchantLocationSubLocationResponse}
          error={postMerchantLocationError || postMerchantLocationSubLocationError}
          isCloseButtonFocused={isCloseButtonFocused}
        />
      </div>
    </Modal>
  )
}

export default DirectoryLocationModal
