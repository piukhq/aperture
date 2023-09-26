import {useState, useEffect, memo} from 'react'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {useAppDispatch} from 'app/hooks'
import {setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {SingleViewSecondaryMidDetails, SingleViewSecondaryMidLocations} from './components'
import SingleViewComments from '../SingleViewComments'
import {CommentsSubjectTypes, DirectorySingleViewTabs} from 'utils/enums'
import {DirectoryEntity} from 'types'
import DirectorySingleViewNavigationTab from '../../DirectorySingleViewNavigationTab'

type Props = {
  selectedEntity: DirectoryEntity | null,
  setHeaderFn: (header: string) => void
  setIsEntityFound: (isEntityFound: boolean) => void
}

const SingleViewSecondaryMid = ({selectedEntity, setHeaderFn, setIsEntityFound}: Props) => {
  const {merchantId, planId, ref} = useGetRouterQueryString()
  const [tabSelected, setTabSelected] = useState<DirectorySingleViewTabs>(DirectorySingleViewTabs.DETAILS)

  const {getMerchantSecondaryMidResponse, getMerchantSecondaryMidIsLoading} = useDirectorySecondaryMids({
    skipGetSecondaryMids: true,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
    secondaryMidRef: ref,
  })

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (getMerchantSecondaryMidResponse) {
      setIsEntityFound(true)
      if (!selectedEntity) {
        dispatch(setSelectedDirectoryMerchantEntity(getMerchantSecondaryMidResponse))
      }

      const {secondary_mid_metadata: secondaryMidMetadata} = getMerchantSecondaryMidResponse
      setHeaderFn(`Secondary MID - ${secondaryMidMetadata.secondary_mid}`)
    }
  }, [getMerchantSecondaryMidResponse, setHeaderFn, dispatch, selectedEntity, setIsEntityFound])

  const renderDetails = () => {
    if (getMerchantSecondaryMidIsLoading) {
      return <div className='h-[278px] '></div>
    } else if (!getMerchantSecondaryMidResponse) {
      return <p role='alert' className='font-body-3 text-center text-red pb-[15px]'>Secondary MID could not be found. Check that it has not been deleted or refresh your browser</p>
    } else {
      return <SingleViewSecondaryMidDetails secondaryMid={getMerchantSecondaryMidResponse} />
    }
  }

  const renderSelectedTabContent = () => {
    switch (tabSelected) {
      case DirectorySingleViewTabs.DETAILS:
        return (
          <div className='pl-[25px] pr-[10px]'>
            {renderDetails()}
          </div>
        )
      case DirectorySingleViewTabs.LOCATIONS:
        return (
          <div className='px-[25px]'>
            <SingleViewSecondaryMidLocations />
          </div>
        )
      case DirectorySingleViewTabs.COMMENTS:
        return (
          <div className='pt-[11px]'>
            <SingleViewComments subjectType={CommentsSubjectTypes.SECONDARY_MID} />
          </div>
        )
    }
  }

  return (
    <>
      <nav className='h-[60px] w-full grid grid-cols-3 mb-[23px] mt-[5px]'>
        { [DirectorySingleViewTabs.DETAILS,
          DirectorySingleViewTabs.LOCATIONS,
          DirectorySingleViewTabs.COMMENTS,
        ].map(tab => (
          <DirectorySingleViewNavigationTab key={tab} tab={tab} tabSelected={tabSelected} setTabSelectedFn={setTabSelected} isEntityFound={Boolean(getMerchantSecondaryMidResponse)}/>
        ))}
      </nav>
      {renderSelectedTabContent()}
    </>
  )
}

export default memo(SingleViewSecondaryMid)
