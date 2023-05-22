import {useState, useEffect, memo, useCallback} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {SingleViewSubLocationDetails} from './components'
import SingleViewComments from '../SingleViewComments'
import {DirectoryEntity} from 'types'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'
import DirectorySingleViewNavigationTab from '../../DirectorySingleViewNavigationTab'

type Props = {
  selectedEntity: DirectoryEntity,
  setHeaderFn: (header: string) => void
  isInEditState: boolean
  setIsInEditState: (isInEditState: boolean) => void
  onCancelEditState: () => void
  setShouldDisplayEditButton: (shouldDisplayEditButton: boolean) => void
  setIsEntityFound: (isEntityFound: boolean) => void
}

const SingleViewSubLocation = ({selectedEntity, setHeaderFn, isInEditState, setIsInEditState, onCancelEditState, setShouldDisplayEditButton, setIsEntityFound}: Props) => {
  const {merchantId, planId, ref, sub_location_ref} = useGetRouterQueryString()

  const {
    getMerchantLocationSubLocationResponse,
    getMerchantLocationSubLocationRefresh,
    getMerchantLocationSubLocationIsLoading,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocations: true,
    planRef: planId,
    merchantRef: merchantId,
    locationRef: ref,
    subLocationRef: sub_location_ref,
  })

  const dispatch = useAppDispatch()

  const [tabSelected, setTabSelected] = useState(DirectorySingleViewTabs.DETAILS)

  useEffect(() => {
    // Edit button should only be visible (currently) on the details tab
    setShouldDisplayEditButton(tabSelected === DirectorySingleViewTabs.DETAILS)
  }, [tabSelected, setShouldDisplayEditButton])

  useEffect(() => {
    if (getMerchantLocationSubLocationResponse) {
      setIsEntityFound(true)
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantLocationSubLocationResponse))
      }

      const subLocationMetadata = getMerchantLocationSubLocationResponse.sub_location?.location_metadata
      const {name, address_line_1: addressLine1, location_id: locationId} = subLocationMetadata || {}

      const title = name || addressLine1 || `Location ${locationId}`
      setHeaderFn(`${isInEditState ? 'Editing - ' : ''}${title}`)
    }
  }, [getMerchantLocationSubLocationResponse, setHeaderFn, isInEditState, dispatch, selectedEntity, setIsEntityFound])

  const handleRefresh = useCallback(() => {
    getMerchantLocationSubLocationRefresh()
  }, [getMerchantLocationSubLocationRefresh])

  const renderDetails = () => {
    if (getMerchantLocationSubLocationIsLoading) {
      return <div className='h-[230px]'></div> // Placeholder for loading state (height is the same as the SingleViewLocationDetails component when no address is present)
    } else if (!getMerchantLocationSubLocationResponse) {
      return <p role='alert' className='font-body-3 text-center text-red pb-[20px]'>Sub-location could not be found. Check that it has not been deleted or refresh your browser</p>
    } else {
      return <SingleViewSubLocationDetails
        location={getMerchantLocationSubLocationResponse}
        isInEditState={isInEditState}
        setIsInEditState={setIsInEditState}
        onCancelEditState={onCancelEditState}
        handleRefresh={handleRefresh}
        isRefreshing={getMerchantLocationSubLocationIsLoading}
      />
    }
  }

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return (
          <div className='pl-[25px] pr-[10px]'>
            {renderDetails()}
          </div>
        )
      case DirectorySingleViewTabs.COMMENTS:
        return (
          <div className='pt-[11px]'>
            <SingleViewComments subjectType={CommentsSubjectTypes.LOCATION} />
          </div>
        )
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[23px] mt-[5px]'>
        {[DirectorySingleViewTabs.DETAILS,
          DirectorySingleViewTabs.COMMENTS,
        ].map(tab => (
          <DirectorySingleViewNavigationTab key={tab} tab={tab} tabSelected={tabSelected} setTabSelectedFn={setTabSelected} isEntityFound={Boolean(getMerchantLocationSubLocationResponse)}/>
        ))}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewSubLocation)
