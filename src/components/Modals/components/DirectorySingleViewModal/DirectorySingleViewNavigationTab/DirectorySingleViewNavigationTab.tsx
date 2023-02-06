import {classNames} from 'utils/classNames'
import {DirectorySingleViewTabs} from 'utils/enums'

type Props = {
  tab: DirectorySingleViewTabs,
  tabSelected: DirectorySingleViewTabs,
  setTabSelectedFn: (tab: DirectorySingleViewTabs) => void,
  isEntityFound: boolean
}

const DirectorySingleViewNavigationTab = ({tab, tabSelected, setTabSelectedFn, isEntityFound}:Props) => {
  const tabSelectedClasses = 'font-medium text-grey-900 dark:text-grey-100 border-b-2 border-b-blue'
  const tabUnselectedClasses = 'font-regular text-sm text-grey-600 dark:text-grey-400 dark:hover:text-white hover:text-grey-900 border-b-[1px] border-b-grey-200'
  const tabDisabledClasses = 'border-b-2 border-b-grey-200 text-grey-400 opacity-70 cursor-not-allowed hover:text-grey-400'
  const tabsAvailableWhenEntityNotFound = [DirectorySingleViewTabs.DETAILS, DirectorySingleViewTabs.COMMENTS]

  const isTabSelected = tab === tabSelected
  const isTabDisabled = !isEntityFound && !tabsAvailableWhenEntityNotFound.includes(tab)


  return (
    <button
      key={tab}
      className={classNames(
        'font-heading-8 h-[57px]',
        isTabSelected ? tabSelectedClasses : tabUnselectedClasses,
        isTabDisabled && tabDisabledClasses

      )}
      onClick={() => setTabSelectedFn(tab)}
      disabled={isTabDisabled}
    >
      <span className='justify-center flex h-[57px] items-center'>{tab}</span>
    </button>
  )
}

export default DirectorySingleViewNavigationTab
