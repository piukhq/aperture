import {useState, useEffect, memo} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementMids} from 'hooks/useMidManagementMids'
import SingleViewMidDetails from './components/SingleViewMidDetails'
import SingleViewComments from '../SingleViewComments'
import {CommentsSubjectTypes} from 'utils/enums'
import {classNames} from 'utils/classNames'

type Props = {
  resetError: () => void
  setError: (errorMessage: string) => void
  setHeaderFn: (header: string) => void
}

const SingleViewMid = ({setError, resetError, setHeaderFn}: Props) => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantMidResponse} = useMidManagementMids({
    skipGetMids: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    midRef: ref as string,
  })

  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getMerchantMidResponse) {
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantMidResponse))
      }

      const {mid} = getMerchantMidResponse
      const {mid_metadata: midMetadata} = mid
      setHeaderFn(`MID - ${midMetadata.mid}`)
    }
  }, [getMerchantMidResponse, setHeaderFn, dispatch, selectedEntity])

  const [tabSelected, setTabSelected] = useState('Details')

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-medium text-grey-900 dark:text-grey-100 border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-regular text-sm text-grey-600 dark:text-grey-400 dark:hover:text-white hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return ['Details', 'Comments'].map(tab => (
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

  const renderDetails = () => getMerchantMidResponse ? (
    <div className='px-[25px]'>
      <SingleViewMidDetails merchantMid={getMerchantMidResponse} setError={setError} resetError={resetError} />
    </div>
  ) : null

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[23px] mt-[5px]'>
        {renderNavigationTabs()}
      </nav>
      {tabSelected === 'Details' ? renderDetails() : (
        <div className='pt-[11px]'>
          <SingleViewComments subjectType={CommentsSubjectTypes.MID} />
        </div>
      )}
    </>
  )
}

export default memo(SingleViewMid)
