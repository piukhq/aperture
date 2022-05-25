import {useRouter} from 'next/router'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {ModalStyle} from 'utils/enums'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getSelectedDirectoryMerchantEntity, reset as merchantReset, setSelectedDirectoryMerchantEntity} from 'features/directoryMerchantSlice'
import {reset as modalReset} from 'features/modalSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {DirectoryNavigationTab} from 'utils/enums'
import {useEffect, useState} from 'react'
import SingleViewMidDetails from './components/SingleViewMidDetails'

// Temporary Mock Imports for testing
import {mockMidsData} from 'utils/mockMidsData'
import {mockIdentifiersData} from 'utils/mockIdentifiersData'
import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {mockLocationData} from 'utils/mockLocationData'


const DirectorySingleViewModal = () => {
  const [tabSelected, setTabSelected] = useState('Details')
  const [entityHeading, setEntityHeading] = useState('')
  const [entityDetailsComponent, setEntityDetailsComponent] = useState(null)
  const router = useRouter()
  const {merchantId, planId, tab, ref} = router.query
  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  // Address differences between different entity types
  useEffect(() => {
    // TODO: Placeholder logic to be replaced using tab and ref to make the right API call (though watch out for secondary mids hyphen/underscore)
    const getEntityFromApiResponse = (apiLabel, mockData) => {
      const entityFromApi = mockData.find(mockEntity => mockEntity[`${apiLabel}_ref`] === ref) || null
      dispatch(setSelectedDirectoryMerchantEntity(entityFromApi))
      return entityFromApi
    }
    if (tab === DirectoryNavigationTab.MIDS) {
      const entity = selectedEntity || getEntityFromApiResponse('mid', mockMidsData)
      setEntityHeading(`MID - ${entity.mid_metadata.mid}`)
      setEntityDetailsComponent(<SingleViewMidDetails mid={entity} />)
    } else if (tab === DirectoryNavigationTab.IDENTIFIERS) {
      const entity = selectedEntity || getEntityFromApiResponse('identifier', mockIdentifiersData)
      setEntityHeading(`Identifier - ${entity.identifier_metadata.value}`)
      setEntityDetailsComponent(<p>Identifier Details Placeholder</p>)
    } else if (tab === DirectoryNavigationTab.SECONDARY_MIDS) {
      const entity = selectedEntity || getEntityFromApiResponse('secondary_mid', mockSecondaryMidsData)
      setEntityHeading(`Secondary Mid - ${entity.secondary_mid_metadata.secondary_mid}`)
      setEntityDetailsComponent(<p>Secondary Mid Details Placeholder</p>)
    } else if (tab === DirectoryNavigationTab.LOCATIONS) {
      const entity = selectedEntity || getEntityFromApiResponse('location', mockLocationData)
      setEntityHeading(`Location - ${entity.location_metadata.name}`)
      setEntityDetailsComponent(<p>Location Details Placeholder</p>)
    } else { // Tab is unknown redirect back to the merchant details page
      dispatch(merchantReset())
      dispatch(modalReset())
      router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=mids`)
    }
  }, [tab, selectedEntity, dispatch, ref, merchantId, planId, router])


  const closeSingleViewModal = () => {
    dispatch(merchantReset())
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
        <span className='place-content-center flex h-[57px] items-center'>{tab}</span>
      </button>
    ))
  }

  const renderComments = () => ( // TODO: placeholder till we have comments to render, confirm modal height design
    <div>
      <i className='font-body-4'> There are no comments to view.</i>
    </div>
  )

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={entityHeading} onCloseFn={closeSingleViewModal}>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[40px]'>
        {selectedEntity && tabSelected === 'Details' ? entityDetailsComponent : renderComments()}
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

