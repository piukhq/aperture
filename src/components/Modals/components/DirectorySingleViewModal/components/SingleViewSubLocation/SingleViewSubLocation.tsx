import {useState, useEffect, memo, useCallback} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {SingleViewSubLocationDetails} from './components'
import SingleViewComments from '../SingleViewComments'
import {classNames} from 'utils/classNames'
import {DirectoryEntity} from 'types'
import {useMidManagementLocationSubLocations} from 'hooks/useMidManagementLocationSubLocations'

type Props = {
  selectedEntity: DirectoryEntity,
  setHeaderFn: (header: string) => void
  isInEditState: boolean
  setIsInEditState: (isInEditState: boolean) => void
  onCancelEditState: () => void
  setShouldDisplayEditButton: (shouldDisplayEditButton: boolean) => void
  setShouldDisableEditButton: (shouldDisableEditButton: boolean) => void
}

const SingleViewSubLocation = ({selectedEntity, setHeaderFn, isInEditState, setIsInEditState, onCancelEditState, setShouldDisplayEditButton, setShouldDisableEditButton}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref, sub_location_ref} = router.query

  const {
    getMerchantLocationSubLocationResponse,
    getMerchantLocationSubLocationRefresh,
    getMerchantLocationSubLocationIsFetching,
  } = useMidManagementLocationSubLocations({
    skipGetSubLocations: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
    subLocationRef: sub_location_ref as string,
  })

  const dispatch = useAppDispatch()

  const [tabSelected, setTabSelected] = useState('Details')

  useEffect(() => {
    // Edit button should only be visible (currently) on the details tab
    setShouldDisplayEditButton(tabSelected === DirectorySingleViewTabs.DETAILS)
  }, [tabSelected, setShouldDisplayEditButton])

  useEffect(() => {
    // Edit button should be disabled when refetching data
    setShouldDisableEditButton(getMerchantLocationSubLocationIsFetching)
  }, [getMerchantLocationSubLocationIsFetching, setShouldDisableEditButton])

  useEffect(() => {
    if (getMerchantLocationSubLocationResponse) {
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantLocationSubLocationResponse))
      }

      const subLocationMetadata = getMerchantLocationSubLocationResponse.sub_location?.location_metadata
      const {name, address_line_1: addressLine1, location_id: locationId} = subLocationMetadata || {}

      const title = name || addressLine1 || `Location ${locationId}`
      setHeaderFn(`${isInEditState ? 'Editing - ' : ''}${title}`)
    }
  }, [getMerchantLocationSubLocationResponse, setHeaderFn, isInEditState, dispatch, selectedEntity])


  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-medium text-grey-900 dark:text-grey-100 border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-regular text-sm text-grey-600 dark:text-grey-400 dark:hover:text-white hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return [
      DirectorySingleViewTabs.DETAILS,
      DirectorySingleViewTabs.COMMENTS,
    ].map(tab => (
      <button
        key={tab}
        className={classNames(
          'font-heading-8 h-[57px]',
          tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses
        )}
        onClick={() => setTabSelected(tab)}
      >
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const handleRefresh = useCallback(() => {
    getMerchantLocationSubLocationRefresh()
  }, [getMerchantLocationSubLocationRefresh])

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return getMerchantLocationSubLocationResponse ? (
          <div className='pl-[25px] pr-[10px]'>
            <SingleViewSubLocationDetails
              location={getMerchantLocationSubLocationResponse}
              isInEditState={isInEditState}
              setIsInEditState={setIsInEditState}
              onCancelEditState={onCancelEditState}
              handleRefresh={handleRefresh}
              isRefreshing={getMerchantLocationSubLocationIsFetching}
            />
          </div>
        ) : null
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
        {renderNavigationTabs()}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewSubLocation)
