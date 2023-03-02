import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Modal, DirectoryMerchantLocationForm} from 'components'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'
import {midManagementPlansApi} from 'services/midManagementPlans'
import {getLocationLabel, reset} from 'features/directoryLocationSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
import {DirectoryLocationMetadata} from 'types'
import {getLocationList} from 'utils/locationStrings'

const DirectoryLocationModal = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query

  const dispatch = useAppDispatch()

  const {
    postMerchantLocation,
    postMerchantLocationIsSuccess,
    postMerchantLocationIsLoading,
    postMerchantLocationError,
    resetPostMerchantLocationResponse,
    getMerchantLocationsResponse,
  } = useMidManagementLocations({
    skipGetLocation: true,
    getAll: true,
    skipGetLocationsByPage: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const {
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: null as string,
  })

  const locationLabel = useAppSelector(getLocationLabel)

  const [parentLocation, setParentLocation] = useState('None')
  const [isCloseButtonFocused, setIsCloseButtonFocused] = useState(false)

  const closeModal = useCallback(() => {
    resetPostMerchantLocationResponse()
    resetPostMerchantLocationSubLocationResponse()
    dispatch(reset())
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
      const locationRef = locationList.find(location => location.title === parentLocation).location_ref

      postMerchantLocationSubLocation({
        planRef: planId as string,
        merchantRef: merchantId as string,
        locationRef,
        secondaryMidRef: '',
        ...locationMetadata,
      })
    } else {
      postMerchantLocation({
        planRef: planId as string,
        merchantRef: merchantId as string,
        secondaryMidRef: '',
        ...locationMetadata,
      })
    }
    dispatch(midManagementPlansApi.util.resetApiState()) // Update plan list as location count has changed
  }, [parentLocation, dispatch, locationList, postMerchantLocationSubLocation, planId, merchantId, postMerchantLocation])

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
