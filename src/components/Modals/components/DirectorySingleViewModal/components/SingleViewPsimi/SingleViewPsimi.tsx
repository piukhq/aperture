import {useState, useEffect, memo} from 'react'
import {useRouter} from 'next/router'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useMidManagementPsimis} from 'hooks/useMidManagementPsimis'
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
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantPsimiResponse, getMerchantPsimiIsLoading} = useMidManagementPsimis({
    skipGetPsimis: true,
    planRef: planId as string,
    merchantRef: merchantId as string,
    psimiRef: ref as string,
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

  const [tabSelected, setTabSelected] = useState(DirectorySingleViewTabs.DETAILS)

  const renderDetails = () => {
    if (getMerchantPsimiIsLoading) {
      return <div className='h-[277px]'>i</div> // placeholder for loading mid details
    } else if (!getMerchantPsimiResponse) {
      return <p className='font-body-3 text-center text-red pb-[20px]'>PSIMI could not be found. Check that it has not been deleted or refresh your browser</p>
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
