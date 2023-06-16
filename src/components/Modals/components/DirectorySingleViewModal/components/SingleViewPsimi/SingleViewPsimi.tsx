import {useState, useEffect, memo} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {SingleViewPsimiDetails} from './components'
import SingleViewComments from '../SingleViewComments'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {DirectoryEntity} from 'types'
import DirectorySingleViewNavigationTab from '../../DirectorySingleViewNavigationTab'

type Props = {
  selectedEntity: DirectoryEntity,
  setHeaderFn: (header: string) => void
  setIsEntityFound: (isEntityFound: boolean) => void
}

const SingleViewPsimi = ({selectedEntity, setHeaderFn, setIsEntityFound}: Props) => {
  const {merchantId, planId, ref} = useGetRouterQueryString()

  const {getMerchantPsimiResponse, getMerchantPsimiIsLoading} = useDirectoryPsimis({
    skipGetPsimis: true,
    skipGetPsimisByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    psimiRef: ref,
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getMerchantPsimiResponse) {
      setIsEntityFound(true)
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantPsimiResponse))
      }

      const {psimi_metadata: psimiMetadata} = getMerchantPsimiResponse
      setHeaderFn(`PSIMI - ${psimiMetadata.value}`)
    }
  }, [getMerchantPsimiResponse, setHeaderFn, dispatch, selectedEntity, setIsEntityFound])

  const [tabSelected, setTabSelected] = useState<DirectorySingleViewTabs>(DirectorySingleViewTabs.DETAILS)

  const renderDetails = () => {
    if (getMerchantPsimiIsLoading) {
      return <div className='h-[277px]'>i</div> // placeholder for loading mid details
    } else if (!getMerchantPsimiResponse) {
      return <p role='alert' className='font-body-3 text-center text-red pb-[20px]'>PSIMI could not be found. Check that it has not been deleted or refresh your browser</p>
    } else {
      return <SingleViewPsimiDetails psimi={getMerchantPsimiResponse} />
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[23px] mt-[5px]'>
        { [DirectorySingleViewTabs.DETAILS,
          DirectorySingleViewTabs.COMMENTS,
        ].map(tab => (
          <DirectorySingleViewNavigationTab key={tab} tab={tab} tabSelected={tabSelected} setTabSelectedFn={setTabSelected} isEntityFound={Boolean(getMerchantPsimiResponse)}/>
        ))}
      </nav>

      {tabSelected === 'Details' ? (
        <div className='pt-[11px] px-[25px]'>
          {renderDetails()}
        </div>
      ) : (
        <SingleViewComments subjectType={CommentsSubjectTypes.PSIMI} />
      )}
    </>
  )
}

export default memo(SingleViewPsimi)
