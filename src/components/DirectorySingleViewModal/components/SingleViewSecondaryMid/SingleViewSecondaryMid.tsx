import React from 'react'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementSecondaryMids} from 'hooks/useMidManagementSecondaryMids'
import SingleViewSecondaryMidDetails from './components/SingleViewSecondaryMidDetails'

type Props = {
  setHeaderFn: (header: string) => void
}

const SingleViewSecondaryMid = ({setHeaderFn}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

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

  const [tabSelected, setTabSelected] = useState('Details')

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[57px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-850 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[57px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-850 dark:hover:text-white  hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return ['Details', 'Comments'].map(tab => (
      <button
        key={tab}
        className={tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => setTabSelected(tab)}
      >
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const renderDetails = () => getMerchantSecondaryMidResponse ? <SingleViewSecondaryMidDetails secondaryMid={getMerchantSecondaryMidResponse} /> : null

  const renderComments = () => <i className='font-body-4'> There are no comments to view.</i> // TODO: Placeholder for comments

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[25px]'>
        {tabSelected === 'Details' ? renderDetails() : renderComments()}
      </div>
    </>
  )
}

export default React.memo(SingleViewSecondaryMid)
