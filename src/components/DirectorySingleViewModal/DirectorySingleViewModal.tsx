import {useRouter} from 'next/router'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {ModalStyle} from 'utils/enums'
// import {useAppDispatch, useAppSelector} from 'app/hooks'
// import {getSelectedDirectoryMid, reset} from 'features/directoryMidSlice'
import LinkSvg from 'icons/svgs/link.svg'
import {useState} from 'react'

const DirectorySingleViewModal = () => {
  const [tabSelected, setTabSelected] = useState('Details')
  const router = useRouter()
  const {merchantId, planId, tab} = router.query
  // const item = useAppSelector(getSelectedDirectoryMid)
  // const dispatch = useAppDispatch()


  const closeSingleViewModal = () => {
    // dispatch(reset())
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

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={'MID - 4444259847329'} onCloseFn={closeSingleViewModal}>
      <nav className='h-[60px] w-full grid grid-cols-2 mb-[34px]'>
        {renderNavigationTabs()}
      </nav>
      <div className='px-[40px]'>
        <div className='mb-[34px]'>
          <label className='font-modal-form-label'>DATE ADDED </label>
          <p className='font-body-2 font-medium text-grey-800'>Tue, 21 May 2019</p>
        </div>
        <div className='mb-[34px] grid grid-cols-2 h-[50px]'>
          <div>
            <label className='font-modal-form-label'>PAYMENT SCHEME</label>
            <p className='font-body-2 font-medium text-grey-800'>Visa</p>
          </div>
          <form>
            <div className='flex flex-col'>
              <label className='font-modal-form-label'>PAYMENT SCHEME STATUS</label>
              <select className='font-body-3 font-medium text-grey-600 w-[148px] bg-transparent rounded-[10px] border-[1px] border-grey-300 h-[28px] px-[10px] my-[5px]'>

                <option className='font-body-3 font-medium text-grey-600 '>Not enrolled</option>
              </select>
            </div>
          </form>
        </div>
        <form className=' h-[38px] flex justify-between mb-[34px]'>
          <div>
            <label className='font-modal-form-label'>LOCATION </label>
            <p className='font-body-2 font-medium text-grey-800'>Unknown</p>
          </div>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add location
          </Button>
        </form>
        <form className='h-[38px] flex justify-between mb-[34px]'>
          <div>
            <label className='font-modal-form-label'>BIN</label>
            <p className='font-body-2 font-medium text-grey-800'>Unknown</p>
          </div>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          >Add BIN
          </Button>
        </form>
        <form className='h-[38px] flex justify-between mb-[34px]'>
          <div>
            <label className='font-modal-form-label'>HARMONIA STATUS</label>
            <p className='font-body-2 font-medium text-grey-800'>Not onboarded</p>
          </div>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.LIGHT_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          >Edit
          </Button>
        </form>
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

