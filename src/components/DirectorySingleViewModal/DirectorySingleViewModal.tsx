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
import {DirectoryEntity} from 'types'

// Temporary Mock Imports for testing
import {mockMidsData} from 'utils/mockMidsData'
import {mockIdentifiersData} from 'utils/mockIdentifiersData'
import {mockSecondaryMidsData} from 'utils/mockSecondaryMidsData'
import {mockLocationData} from 'utils/mockLocationData'
import SingleViewSecondaryMidDetails from './components/SingleViewSecondaryMidDetails'

enum EntityApiLabel {
  MID = 'mid',
  SECONDARY_MID = 'secondary_mid',
  IDENTIFIER = 'identifier',
  LOCATION = 'location',
}

type EntityArray = DirectoryEntity[]

const DirectorySingleViewModal = () => {
  const [tabSelected, setTabSelected] = useState('Details')
  const [entityHeading, setEntityHeading] = useState('')
  const router = useRouter()
  const {merchantId, planId, tab, ref} = router.query
  const selectedEntity = useAppSelector(getSelectedDirectoryMerchantEntity)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // TODO: Placeholder logic to simulate using data from API when not in redux
    const getEntityFromApiResponse = (entityType: EntityApiLabel, apiEntityArray) => {
      const entityFromApi = apiEntityArray.find(entity => entity[`${entityType}_ref`] === ref)
      dispatch(setSelectedDirectoryMerchantEntity(entityFromApi))
      return entityFromApi
    }

    // Horrible function due to inconsistency between entity types in api
    const getDataFromEntity = (
      entityType: EntityApiLabel,
      apiEntityArray: EntityArray, // TODO: Placeholder, replace with function to get relevant API data if needed
      entityHeading: string,
      valueLabel: string // what metadata property to use to display in the table heading
    ) => {
      const entity = selectedEntity || getEntityFromApiResponse(entityType, apiEntityArray)
      setEntityHeading(`${entityHeading} - ` + entity[`${entityType}_metadata`][valueLabel])
    }

    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return getDataFromEntity(EntityApiLabel.MID, mockMidsData, 'MID', 'mid')
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return getDataFromEntity(EntityApiLabel.SECONDARY_MID, mockSecondaryMidsData, 'Secondary MID', 'secondary_mid')
      case DirectoryNavigationTab.IDENTIFIERS:
        return getDataFromEntity(EntityApiLabel.IDENTIFIER, mockIdentifiersData, 'Identifier', 'identifier')
      case DirectoryNavigationTab.LOCATIONS:
        return getDataFromEntity(EntityApiLabel.LOCATION, mockLocationData, 'Location', 'location')
      default:
        dispatch(merchantReset())
        dispatch(modalReset())
        router.isReady && router.push(`/mid-management/directory/${planId}/${merchantId}?tab=mids`)
    }
  }, [dispatch, selectedEntity, ref, tab, merchantId, planId, router])

  const closeSingleViewModal = () => {
    dispatch(merchantReset())
    router.isReady && router.replace(`/mid-management/directory/${planId}/${merchantId}?tab=${tab}`)
  }

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

  const renderEntityDetails = () => {
    switch (tab) {
      case DirectoryNavigationTab.MIDS:
        return <SingleViewMidDetails />
      case DirectoryNavigationTab.SECONDARY_MIDS:
        return <SingleViewSecondaryMidDetails />
      case DirectoryNavigationTab.IDENTIFIERS:
        return <p>Placeholder for Identifiers</p>
      case DirectoryNavigationTab.LOCATIONS:
        return <p>Placeholder for Locations</p>
    }
  }

  const renderComments = () => <i className='font-body-4'> There are no comments to view.</i> // TODO: Placeholder for comments

  return (
    <Modal modalStyle={ModalStyle.CENTERED_HEADING} modalHeader={entityHeading} onCloseFn={closeSingleViewModal}>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[40px] min-h-[300px]'>
        {selectedEntity && tabSelected === 'Details' ? renderEntityDetails() : renderComments()}
      </div>
      <div className='flex justify-between border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[14px]'>
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
