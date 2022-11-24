import {useCallback, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {Modal, DirectoryMerchantLocationForm} from 'components'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {getLocationLabel, reset} from 'features/directoryLocationSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
import {DirectoryLocationMetadata} from 'types'

const DirectoryLocationModal = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query

  const dispatch = useAppDispatch()

  const {
    postMerchantLocation,
    postMerchantLocationIsSuccess: isSuccess,
    postMerchantLocationIsLoading: isLoading,
    postMerchantLocationError: postError,
    resetPostMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
  })

  const locationLabel = useAppSelector(getLocationLabel)

  const closeModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch])

  // TODO: Handle unhappy path
  const handleErrorResponse = useCallback(() => {
    console.error(postError)
  }, [postError])

  useEffect(() => {
    if (postError) {
      handleErrorResponse()
    } else if (isSuccess) {
      resetPostMerchantLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [
    isSuccess,
    postError,
    resetPostMerchantLocationResponse,
    handleErrorResponse,
    dispatch,
    router,
  ])

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    postMerchantLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      secondaryMidRef: '',
      ...locationMetadata,
    })
  }, [postMerchantLocation, planId, merchantId])

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={`New ${locationLabel}`} onCloseFn={closeModal}>
      <div className='mt-[20px] mx-[25px]'>
        <DirectoryMerchantLocationForm onSaveHandler={handleSave} onCancelHandler={closeModal} isLoading={isLoading} />
      </div>
    </Modal>
  )
}

export default DirectoryLocationModal
