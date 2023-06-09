import {useState, useEffect, memo} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import SingleViewMidDetails from './components/SingleViewMidDetails'
import SingleViewComments from '../SingleViewComments'
import {CommentsSubjectTypes} from 'utils/enums'
import {classNames} from 'utils/classNames'
import {DirectoryEntity} from 'types'

type Props = {
  selectedEntity: DirectoryEntity,
  resetError: () => void
  setError: (errorMessage: string) => void
  setHeaderFn: (header: string) => void
  setIsEntityFound: (isEntityFound: boolean) => void
}

const SingleViewMid = ({selectedEntity, setError, resetError, setHeaderFn, setIsEntityFound}: Props) => {

  const {merchantId, planId, ref} = useGetRouterQueryString()

  const {getMerchantMidResponse, getMerchantMidIsLoading} = useDirectoryMids({
    skipGetMids: true,
    skipGetMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    midRef: ref,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getMerchantMidResponse) {
      setIsEntityFound(true)
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantMidResponse))
      }

      const {mid} = getMerchantMidResponse
      const {mid_metadata: midMetadata} = mid
      setHeaderFn(`MID - ${midMetadata.mid}`)
    }
  }, [getMerchantMidResponse, setHeaderFn, dispatch, selectedEntity, setIsEntityFound])

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

  const renderDetails = () => {
    if (getMerchantMidResponse && !getMerchantMidIsLoading) {
      return <SingleViewMidDetails merchantMid={getMerchantMidResponse} setError={setError} resetError={resetError} />
    } else if (getMerchantMidIsLoading) {
      return <div className='h-[420px]'></div> // placeholder for loading mid details
    } else {
      return <p role='alert' className='font-body-3 text-center text-red pb-[15px]'>MID could not be found. Check that it has not been deleted or refresh your browser</p>
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[23px] mt-[5px]'>
        {renderNavigationTabs()}
      </nav>
      {tabSelected === 'Details' ? (
        <div className='px-[25px]'>
          {renderDetails()}
        </div>
      ) : (
        <div className='pt-[11px]'>
          <SingleViewComments subjectType={CommentsSubjectTypes.MID} />
        </div>
      )}
    </>
  )
}

export default memo(SingleViewMid)
