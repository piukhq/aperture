import {useCallback, useEffect, useMemo, useState} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Modal, DirectoryMerchantLocationForm} from 'components'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
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
    postMerchantLocationSubLocation,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationIsLoading,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
  } = useMidManagementLocations({
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const locationLabel = useAppSelector(getLocationLabel)

  const [parentLocation, setParentLocation] = useState('None')

  const closeModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch])

  // TODO: Handle unhappy path
  const handleErrorResponse = useCallback((error) => {
    console.error(error)
  }, [])

  useEffect(() => {
    if (postMerchantLocationError || postMerchantLocationSubLocationError) {
      handleErrorResponse(postMerchantLocationError || postMerchantLocationSubLocationError)
    } else if (postMerchantLocationIsSuccess || postMerchantLocationSubLocationIsSuccess) {
      postMerchantLocationIsSuccess && resetPostMerchantLocationResponse()
      postMerchantLocationSubLocationIsSuccess && resetPostMerchantLocationSubLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [
    postMerchantLocationIsSuccess,
    postMerchantLocationError,
    resetPostMerchantLocationResponse,
    postMerchantLocationSubLocationIsSuccess,
    postMerchantLocationSubLocationError,
    resetPostMerchantLocationSubLocationResponse,
    handleErrorResponse,
    dispatch,
    router,
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
  }, [locationList, parentLocation, postMerchantLocation, postMerchantLocationSubLocation, planId, merchantId])

  const handleParentLocationChange = useCallback((parentLocation) => {
    setParentLocation(parentLocation)
  }, [])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={`New ${locationLabel}`} onCloseFn={closeModal}>
      <div className='mt-[20px] mx-[25px]'>
        <DirectoryMerchantLocationForm
          parentLocationStrings={locationValues}
          parentLocation={parentLocation}
          parentLocationChangeHandler={handleParentLocationChange}
          onSaveHandler={handleSave}
          onCancelHandler={closeModal}
          isLoading={postMerchantLocationIsLoading || postMerchantLocationSubLocationIsLoading}
          error={postMerchantLocationError || postMerchantLocationSubLocationError}
        />
      </div>
    </Modal>
  )
}

export default DirectoryLocationModal
