import React, {useEffect, useCallback} from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {ModalType, ModalStyle} from 'utils/enums'
import FocusTrap from 'focus-trap-react'

type Props = {
  modalStyle: string,
  modalHeader?: string,
  children: React.ReactNode,
  onCloseFn?: VoidFunction,
}

interface KeyboardEvent {
  key: string;
}

const Modal = ({modalStyle, modalHeader, children, onCloseFn}: Props) => {
  const dispatch = useAppDispatch()

  const handleClose = useCallback(() => {
    onCloseFn && onCloseFn()
    dispatch(requestModal(ModalType.NO_MODAL))
  }, [dispatch, onCloseFn])

  const renderCloseButton = () => (
    <button aria-label='Close' onClick={handleClose}>
      <CloseIcon className='w-[14px] h-[14px]' />
    </button>
  )

  useEffect(() => {
    const closeCheck = (e:KeyboardEvent) => {
      if(e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', closeCheck)
    return () => window.removeEventListener('keydown', closeCheck)
  }, [handleClose])

  const outerModalStyle = modalStyle === ModalStyle.REGULAR ? 'w-[750px] py-[53px]' : 'w-[485px] pt-[20%] pb-[10%]'
  const modalHeaderContainerStyle = modalStyle === ModalStyle.REGULAR ? 'h-[61px] flex-row-reverse rounded-t-[20px]' : 'h-[41px] place-content-between rounded-t-[15px]'
  const modalChildrenContainerStyle = modalStyle === ModalStyle.REGULAR ? 'max-h-[calc(100%-61px)] rounded-b-[20px] px-[70px]' : 'max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px]'

  const renderModal = () => (
    <div className={`h-full ${outerModalStyle} z-50`} onClick={(e) => e.stopPropagation()}>
      <div className={`flex px-[20px] items-center w-full border-b-[1px] border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-850 ${modalHeaderContainerStyle}`}>
        {modalStyle !== ModalStyle.REGULAR && modalHeader && <h1 className='mt-[10px] mb-[5px] font-heading-7 font-medium'>{modalHeader}</h1>}
        {renderCloseButton()}
      </div>
      <div aria-live='assertive' className={`overflow-y-scroll scrollbar-hidden bg-white dark:bg-grey-850 ${modalChildrenContainerStyle}`}>
        {modalStyle === ModalStyle.REGULAR && modalHeader && <h1 className='mt-[19px] mb-[10px] font-heading-4'>{modalHeader}</h1>}
        {children}
      </div>
    </div>
  )

  return (
    <FocusTrap>
      <div id='modal-download-target'> {/* Allows the downloadAsset service to work inside of modals when focus trapped*/}
        <div className='fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33] z-30' onClick={handleClose} />
        <div className='fixed left-2/4 translate-x-[-50%] h-screen justify-center z-40' onClick={handleClose}>
          {renderModal()}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
