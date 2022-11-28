import {useEffect, useCallback} from 'react'
import {useRouter} from 'next/router'
import {DirectoryLocation, DirectoryLocationMetadata} from 'types'
import {DirectoryMerchantLocationForm} from 'components'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {useAppDispatch} from 'app/hooks'

type Props = {
  location: DirectoryLocation
  onCancelEditState: () => void
}

const EditLocationForm = ({location, onCancelEditState}: Props) => {
  const router = useRouter()
  const {planId, merchantId, tab, ref} = router.query

  const dispatch = useAppDispatch()

  const {
    putMerchantLocation,
    putMerchantLocationIsSuccess: isSuccess,
    putMerchantLocationIsLoading: isLoading,
    putMerchantLocationError: putError,
    resetPutMerchantLocationResponse,
  } = useMidManagementLocations({
    skipGetLocations: true,
    skipGetLocation: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const baseRoute = `/mid-management/directory/${planId}/${merchantId}?tab=${tab}`

  // TODO: Handle unhappy path
  const handleErrorResponse = useCallback(() => {
    console.error(putError)
  }, [putError])

  useEffect(() => {
    if (putError) {
      handleErrorResponse()
    } else if (isSuccess) {
      resetPutMerchantLocationResponse()
      dispatch(requestModal(ModalType.NO_MODAL))
      router.isReady && router.replace(baseRoute)
    }
  }, [
    isSuccess,
    putError,
    resetPutMerchantLocationResponse,
    handleErrorResponse,
    dispatch,
    router,
    baseRoute,
  ])

  const handleSave = useCallback((locationMetadata: DirectoryLocationMetadata) => {
    putMerchantLocation({
      planRef: planId as string,
      merchantRef: merchantId as string,
      locationRef: ref as string,
      ...locationMetadata,
    })
  }, [putMerchantLocation, planId, merchantId, ref])

  return (
    <DirectoryMerchantLocationForm
      location={location}
      onSaveHandler={handleSave}
      onCancelHandler={onCancelEditState}
      isLoading={isLoading}
      error={putError}
    />
  )

}
export default EditLocationForm
