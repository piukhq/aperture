import {useState, useEffect, memo} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import {SingleViewSecondaryMidDetails, SingleViewSecondaryMidLocations} from './components'
import SingleViewComments from '../SingleViewComments'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {classNames} from 'utils/classNames'

type Props = {
  setHeaderFn: (header: string) => void
}

const SingleViewSecondaryMid = ({setHeaderFn}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query
  const [tabSelected, setTabSelected] = useState(DirectorySingleViewTabs.DETAILS)

  const {getMerchantSecondaryMidResponse} = useMidManagementSecondaryMids({
    skipGetSecondaryMids: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    secondaryMidRef: ref as string,
  })

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getMerchantSecondaryMidResponse) {
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantSecondaryMidResponse))
      }

      const {secondary_mid_metadata: secondaryMidMetadata} = getMerchantSecondaryMidResponse
      setHeaderFn(`Secondary MID - ${secondaryMidMetadata.secondary_mid}`)
    }
  }, [getMerchantSecondaryMidResponse, setHeaderFn, dispatch, selectedEntity])

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-medium text-grey-900 dark:text-grey-100 border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-regular text-sm text-grey-600 dark:text-grey-400 dark:hover:text-white hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return [DirectorySingleViewTabs.DETAILS, DirectorySingleViewTabs.LOCATIONS, DirectorySingleViewTabs.COMMENTS].map(tab => (
      <button
        key={tab}
        className={classNames(
          'font-heading-8 h-[57px]',
          tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses
        )}
        onClick={() => setTabSelected(tab as DirectorySingleViewTabs)}
      >
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return getMerchantSecondaryMidResponse ? (
          <div className='px-[25px]'>
            <SingleViewSecondaryMidDetails secondaryMid={getMerchantSecondaryMidResponse} />
          </div>
        ) : null
      case DirectorySingleViewTabs.LOCATIONS:
        return (
          <div className='px-[25px]'>
            <SingleViewSecondaryMidLocations />
          </div>
        )
      case DirectorySingleViewTabs.COMMENTS:
        return <SingleViewComments subjectType={CommentsSubjectTypes.SECONDARY_MID} />
    }
  }


  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-3 mb-[34px] mt-[5px]'>
        {renderNavigationTabs()}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewSecondaryMid)
