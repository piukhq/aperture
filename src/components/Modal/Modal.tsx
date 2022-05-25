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
      <CloseIcon className='w-[14px] h-[14px]' fill='#92929D' />
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


  const getModalStyle = () => {
    switch(modalStyle) {
      case ModalStyle.WIDE:
        return {
          outerContainer: 'w-[750px] py-[53px]',
          headerContainer: 'h-[61px] flex-row-reverse rounded-t-[20px] border-b-[1px] border-grey-200 dark:border-grey-800',
          childrenContainer: 'max-h-[calc(100%-61px)] rounded-b-[20px] px-[70px]',
          isHeaderAtTop: false,
          header: 'font-heading-7 font-medium ',
        }
      case ModalStyle.COMPACT:
        return {
          outerContainer: 'w-[485px] pt-[20%] pb-[10%]',
          headerContainer: 'h-[41px] place-content-between rounded-t-[15px] border-b-[1px] border-grey-200 dark:border-grey-800',
          childrenContainer: 'max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px]',
          isHeaderAtTop: true,
          header: 'font-heading-7 font-medium',
        }
      case ModalStyle.CENTERED_HEADING:
        return {
          outerContainer: 'w-[600px] pt-[20%] pb-[10%]',
          headerContainer: 'h-[41px] place-content-between rounded-t-[15px]',
          childrenContainer: 'max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px]',
          isHeaderAtTop: true,
          header: 'font-semibold font-heading-5 w-full text-center',
        }
    }
  }

  const renderModal = () => (
    <div role='dialog' aria-label={modalHeader} className={`h-full ${getModalStyle().outerContainer} z-50`} onClick={(e) => e.stopPropagation()}>
      <div className={`flex px-[20px] items-center w-full bg-white dark:bg-grey-850 ${getModalStyle().headerContainer}`}>
        {getModalStyle().isHeaderAtTop && <h1 className={`mt-[10px] mb-[5px] ${getModalStyle().header}`}>{modalHeader}</h1>}
        {renderCloseButton()}
      </div>
      <div aria-live='assertive' className={`overflow-y-scroll scrollbar-hidden bg-white dark:bg-grey-850 ${getModalStyle().childrenContainer}`}>
        {!getModalStyle().isHeaderAtTop && modalHeader && <h1 className='mt-[19px] mb-[10px] font-heading-4'>{modalHeader}</h1>}
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
