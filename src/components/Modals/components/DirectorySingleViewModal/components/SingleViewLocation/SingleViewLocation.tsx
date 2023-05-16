import {useState, useEffect, memo, useCallback} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {
  SingleViewLocationDetails,
  SingleViewLocationMids,
  SingleViewLocationSecondaryMids,
  SingleViewLocationSubLocations,
} from './components'
import SingleViewComments from '../SingleViewComments'
import {DirectoryEntity} from 'types'
import DirectorySingleViewNavigationTab from '../../DirectorySingleViewNavigationTab'

type Props = {
  selectedEntity: DirectoryEntity,
  setHeaderFn: (header: string) => void
  isInEditState: boolean
  onCancelEditState: () => void
  setShouldDisplayEditButton: (shouldDisplayEditButton: boolean) => void
  setIsInEditState: (isInEditState: boolean) => void
  setIsEntityFound: (isEntityFound: boolean) => void
}

const SingleViewLocation = ({selectedEntity, setHeaderFn, isInEditState, setIsInEditState, onCancelEditState, setShouldDisplayEditButton, setIsEntityFound}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {
    getMerchantLocationResponse,
    getMerchantLocationRefresh,
    getMerchantLocationIsFetching,
  } = useMidManagementLocations({
    planRef: planId as string,
    skipGetLocations: true,
    skipGetLocationsByPage: true,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const dispatch = useAppDispatch()

  const [tabSelected, setTabSelected] = useState(DirectorySingleViewTabs.DETAILS)

  useEffect(() => {
    // Edit button should only be visible (currently) on the details tab
    setShouldDisplayEditButton(tabSelected === DirectorySingleViewTabs.DETAILS)
  }, [tabSelected, setShouldDisplayEditButton])

  useEffect(() => {
    if (getMerchantLocationResponse) {
      setIsEntityFound(true)
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantLocationResponse))
      }

      const {name, address_line_1: addressLine1, location_id: locationId} = getMerchantLocationResponse.location_metadata

      const title = name || addressLine1 || `Location ${locationId}`
      setHeaderFn(`${isInEditState && tabSelected === DirectorySingleViewTabs.DETAILS ? 'Editing - ' : ''}${title}`)
    }
  }, [getMerchantLocationResponse, setHeaderFn, isInEditState, dispatch, selectedEntity, tabSelected, setIsEntityFound])

  const handleRefresh = useCallback(() => {
    getMerchantLocationRefresh()
  }, [getMerchantLocationRefresh])

  const renderDetails = () => {
    if (getMerchantLocationIsFetching) {
      return <div className='h-[359px]'></div> // placeholder for loading location details
    } else if (!getMerchantLocationResponse) {
      return <p role='alert' className='font-body-3 text-center text-red pb-[20px]'>Location could not be found. Check that it has not been deleted or refresh your browser</p>
    } else {
      return (
        <SingleViewLocationDetails
          location={getMerchantLocationResponse}
          isInEditState={isInEditState}
          onCancelEditState={onCancelEditState}
          handleRefresh={handleRefresh}
          isRefreshing={getMerchantLocationIsFetching}
        />
      )
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
      case DirectorySingleViewTabs.MIDS:
        return (
          <div className='px-[25px]'>
            <SingleViewLocationMids />
          </div>
        )
      case DirectorySingleViewTabs.SECONDARY_MIDS:
        return (
          <div className='px-[25px]'>
            <SingleViewLocationSecondaryMids />
          </div>
        )
      case DirectorySingleViewTabs.SUB_LOCATIONS:
        return (
          <div className='px-[25px]'>
            <SingleViewLocationSubLocations
              location={getMerchantLocationResponse}
              isInEditState={isInEditState}
              onCancelEditState={onCancelEditState}
              setIsInEditState={setIsInEditState}
            />
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
      <nav className='h-[60px] w-full grid grid-cols-5 mb-[23px] mt-[5px]'>
        { [DirectorySingleViewTabs.DETAILS,
          DirectorySingleViewTabs.MIDS,
          DirectorySingleViewTabs.SECONDARY_MIDS,
          DirectorySingleViewTabs.SUB_LOCATIONS,
          DirectorySingleViewTabs.COMMENTS,
        ].map(tab => (
          <DirectorySingleViewNavigationTab key={tab} tab={tab} tabSelected={tabSelected} setTabSelectedFn={setTabSelected} isEntityFound={Boolean(getMerchantLocationResponse)}/>
        ))}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewLocation)
