import React from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {ModalStyle} from 'utils/enums'
import FocusTrap from 'focus-trap-react'

type Props = {
  modalStyle: string
  modalHeader?: string,
  children: React.ReactNode
}

const Modal = ({modalStyle, modalHeader, children}: Props) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(requestModal('NO_MODAL'))
  }

  const renderCloseButton = () => (
    <button aria-label='Close' onClick={handleClose}>
      <CloseIcon className='w-[14px] h-[14px]' />
    </button>
  )
  const renderRegularModal = () => (
    <div className='h-full w-[750px] py-[53px]'>
      <div className='flex h-[61px] px-[20px] flex-row-reverse items-center w-full rounded-t-[20px] border-b-[1px] border-grey-300 dark:border-grey-800 bg-white dark:bg-grey-850'>
        {renderCloseButton()}
      </div>
      <div aria-live='assertive' className='max-h-[calc(100%-61px)] rounded-b-[20px] px-[70px] overflow-y-scroll scrollbar-hidden bg-white dark:bg-grey-850'>
        {modalHeader && <h1 className='mt-[19px] mb-[10px] font-heading-4'>{modalHeader}</h1>}
        {children}
      </div>
    </div>
  )
  const renderCompactModal = () => (
    <div className='h-full w-[485px] pt-[30%] pb-[10%]'>
      <div className='flex h-[41px] px-[20px] items-center place-content-between w-full rounded-t-[15px] border-b-[1px] border-grey-300 dark:border-grey-800 bg-white dark:bg-grey-850'>
        {modalHeader && <h1 className='mt-[10px] mb-[5px] font-heading-7 font-medium'>{modalHeader}</h1>}
        {renderCloseButton()}
      </div>
      <div aria-live='assertive' className='max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px] overflow-y-scroll scrollbar-hidden bg-white dark:bg-grey-850'>
        {children}
      </div>
    </div>
  )

  return (
    <FocusTrap>
      <div id='modal-download-target'> {/* Allows the downloadAsset service to work inside of modals when focus trapped*/}
        <div className='fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33] z-50' onClick={handleClose} />
        <div className='fixed left-2/4 translate-x-[-50%] h-screen justify-center z-50'>
          {modalStyle === ModalStyle.REGULAR ? renderRegularModal() : renderCompactModal()}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
