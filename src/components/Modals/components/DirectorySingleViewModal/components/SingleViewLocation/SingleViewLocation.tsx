import React from 'react'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementLocations} from 'hooks/useMidManagementLocations'
import {DirectorySingleViewTabs} from 'utils/enums'
import {
  SingleViewLocationDetails,
  SingleViewLocationMids,
  SingleViewLocationSecondaryMids,
} from './components'
import SingleViewComments from '../SingleViewComments'

type Props = {
  setHeaderFn: (header: string) => void
  isInEditState: boolean
  onCancelEditState: () => void
  setShouldDisplayEditButton: (shouldDisplayEditButton: boolean) => void
}

const SingleViewLocation = ({setHeaderFn, isInEditState, onCancelEditState, setShouldDisplayEditButton}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantLocationResponse} = useMidManagementLocations({
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
    const tabSelectedClasses = 'font-heading-8 h-[57px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-850 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[57px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-850 dark:hover:text-white  hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return [
      DirectorySingleViewTabs.DETAILS,
      DirectorySingleViewTabs.MIDS,
      DirectorySingleViewTabs.SECONDARY_MIDS,
      DirectorySingleViewTabs.COMMENTS,
    ].map(tab => (
      <button
        key={tab}
        className={tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => setTabSelected(tab)}
      >
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return getMerchantLocationResponse ? (
          <SingleViewLocationDetails
            location={getMerchantLocationResponse}
            isInEditState={isInEditState}
            onCancelEditState={onCancelEditState}
          />
        ) : null
      case DirectorySingleViewTabs.MIDS:
        return <SingleViewLocationMids />
      case DirectorySingleViewTabs.SECONDARY_MIDS:
        return <SingleViewLocationSecondaryMids />
      case DirectorySingleViewTabs.COMMENTS:
        return <SingleViewComments />
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-4 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[25px]'>
        {renderSelectedTabContent()}
      </div>
    </>
  )
}

export default React.memo(SingleViewLocation)
