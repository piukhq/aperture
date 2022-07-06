import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useMidManagementLocation} from 'hooks/useMidManagementLocation'
import SingleViewLocationDetails from './components/SingleViewLocationDetails'

type Props = {
    setHeader: (header: string) => void
    isInEditState: boolean
}

enum SingleViewLocationTabs {
    DETAILS = 'Details',
    MIDS = 'MIDs',
    SECONDARY_MIDS = 'Secondary MIDs',
    COMMENTS = 'Comments'
}

const SingleViewLocation = ({setHeader, isInEditState}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantLocationResponse} = useMidManagementLocation(false, planId as string, merchantId as string, ref as string)

  useEffect(() => {
    if (getMerchantLocationResponse) {
      const {name, address_line_1: addressLine1, location_id: locationId} = getMerchantLocationResponse.location_metadata

      const title = name || addressLine1 || `Location ${locationId}`
      setHeader(`${isInEditState ? 'Editing - ' : ''}${title}`)
    }
  }, [getMerchantLocationResponse, setHeader, isInEditState])

  const [tabSelected, setTabSelected] = useState('Details')

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[57px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-850 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[57px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-850 dark:hover:text-white  hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return ['Details', 'MIDs', 'Secondary MIDs', 'Comments'].map(tab => (
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
      case SingleViewLocationTabs.DETAILS:
        return getMerchantLocationResponse ? <SingleViewLocationDetails location={getMerchantLocationResponse} isInEditState={isInEditState} /> : null
      case SingleViewLocationTabs.COMMENTS:
        return <i className='font-body-4'> There are no comments to view.</i>
      case SingleViewLocationTabs.MIDS:
        return <i className='font-body-4'> There are no MIDs to view.</i>
      case SingleViewLocationTabs.SECONDARY_MIDS:
        return <i className='font-body-4'> There are no Secondary MIDs to view.</i>
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-4 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[25px] min-h-[300px]'>
        {renderSelectedTabContent()}
      </div>
    </>
  )
}

export default SingleViewLocation
