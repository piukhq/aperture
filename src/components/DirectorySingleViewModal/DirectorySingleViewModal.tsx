import {useRouter} from 'next/router'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {NavigationTab} from 'utils/enums'
import {useEffect, useState} from 'react'
import SingleViewMidDetails from './components/SingleViewMidDetails'
import {mockMidsData} from 'utils/mockMidsData'

const DirectorySingleViewModal = () => {
  const [tabSelected, setTabSelected] = useState('Details')
  const [entityTitle, setEntityTitle] = useState('')
  const [entityValue, setEntityValue] = useState('')
  const router = useRouter()
  const {merchantId, planId, tab, ref} = router.query
  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)

  const dispatch = useAppDispatch()


  useEffect(() => {
    // TODO: Placeholder logic to be replaced by API calls, probably will become utils. Add logic to get correct entity based on tab selected
    const getEntityFromApi = () => {
      const mid = mockMidsData.find(mid => mid.mid_ref === ref)
      dispatch(setSelectedDirectoryMerchantEntity(mid))
      return mid
    }
    const entity = selectedEntity || getEntityFromApi()
    switch(tab) {
      case NavigationTab.MIDS:
        setEntityTitle('MID')
        setEntityValue(entity.mid_metadata.mid)
    }
  }, [tab, selectedEntity, dispatch, ref])


  const closeSingleViewModal = () => {
    dispatch(reset())
    router.isReady && router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}`)
  }

  const renderNavigationTabs = () => {
    const tabSelectedClasses = 'font-heading-8 h-[57px] font-medium text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'
    const tabUnselectedClasses = 'font-heading-8 h-[57px] font-regular text-sm text-grey-600 dark:text-grey-400 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900 border-b-[1px] border-b-grey-200'
    return ['Details', 'Comments'].map(tab => (
      <button
        key={tab}
        className={tab === tabSelected ? tabSelectedClasses : tabUnselectedClasses}
        onClick={() => setTabSelected(tab)}
      >
        <span className='place-content-center flex h-[51px] items-center'>{tab}</span>
      </button>
    ))
  }


  const renderDetails = () => { // TODO: Add logic to get correct details based on tab selected
    return tab === NavigationTab.MIDS ? <SingleViewMidDetails mid={selectedEntity} /> : ''
  }


  const renderComments = () => ( // TODO: placeholder till we have comments to render, check if modal height should be fixed or not
    <div className='min-h-[200px]'>
      <i className='font-body-4'> There are no comments to view.</i>
    </div>
  )

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={`${entityTitle} - ${entityValue}`} onCloseFn={closeSingleViewModal}>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[40px]'>
        {selectedEntity && tabSelected === 'Details' ? renderDetails() : renderComments()}
      </div>
      <div className='flex justify-between border-t-[1px] border-t-grey-200 pt-[14px]'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.LIGHT_GREY}
          labelColour={LabelColour.GREY}
          labelWeight={LabelWeight.SEMIBOLD}
        ><LinkSvg/> Copy link
        </Button>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >Delete
        </Button>
      </div>
    </Modal>
  )
}

export default DirectorySingleViewModal

