import {useState, useEffect, memo, useCallback} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {
  SingleViewLocationDetails,
  SingleViewLocationMids,
  SingleViewLocationSecondaryMids,
} from './components'
import SingleViewComments from '../SingleViewComments'
import {classNames} from 'utils/classNames'

type Props = {
  setHeaderFn: (header: string) => void
  isInEditState: boolean
  onCancelEditState: () => void
  setShouldDisplayEditButton: (shouldDisplayEditButton: boolean) => void
}

const SingleViewLocation = ({setHeaderFn, isInEditState, onCancelEditState, setShouldDisplayEditButton}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {
    getMerchantLocationResponse,
    getMerchantLocationRefresh,
    getMerchantLocationIsFetching,
  } = useMidManagementLocations({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  const [tabSelected, setTabSelected] = useState('Details')

  useEffect(() => {
    // Edit button should only be visible (currently) on the details tab
    setShouldDisplayEditButton(tabSelected === DirectorySingleViewTabs.DETAILS)
  }, [tabSelected, setShouldDisplayEditButton])

  useEffect(() => {
    if (getMerchantLocationResponse) {
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantLocationResponse))
      }

      const {name, address_line_1: addressLine1, location_id: locationId} = getMerchantLocationResponse.location_metadata

      const title = name || addressLine1 || `Location ${locationId}`
      setHeaderFn(`${isInEditState ? 'Editing - ' : ''}${title}`)
    }
  }, [getMerchantLocationResponse, setHeaderFn, isInEditState, dispatch, selectedEntity])


  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-medium text-grey-900 dark:text-grey-100 border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-regular text-sm text-grey-600 dark:text-grey-400 dark:hover:text-white hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return [
      DirectorySingleViewTabs.DETAILS,
      DirectorySingleViewTabs.MIDS,
      DirectorySingleViewTabs.SECONDARY_MIDS,
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
    getMerchantLocationRefresh()
  }, [getMerchantLocationRefresh])

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return getMerchantLocationResponse ? (
          <div className='pl-[25px] pr-[10px]'>
            <SingleViewLocationDetails
              location={getMerchantLocationResponse}
              isInEditState={isInEditState}
              onCancelEditState={onCancelEditState}
              handleRefresh={handleRefresh}
              isRefreshing={getMerchantLocationIsFetching}
            />
          </div>
        ) : null
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
      <nav className='h-[60px] w-full grid grid-cols-4 mb-[23px] mt-[5px]'>
        {renderNavigationTabs()}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewLocation)
