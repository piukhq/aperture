import React, {useEffect, useCallback, useState} from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'
import {MODAL_STYLE_MAPS} from './styles'
import FocusTrap from 'focus-trap-react'

type Props = {
  modalStyle: string,
  modalHeader?: string,
  children: React.ReactNode,
  onCloseFn?: VoidFunction,
  setIsCloseButtonFocused?: (isFocused: boolean) => void,
}
interface KeyboardEvent {
  key: string;
}

const Modal = ({modalStyle, modalHeader, children, onCloseFn, setIsCloseButtonFocused}: Props) => {
  const dispatch = useAppDispatch()
  const [isFadedIn, setIsFadedIn] = useState(false)

  const handleClose = useCallback(() => {
    setIsFadedIn(false)
    setTimeout(() => {
      onCloseFn && onCloseFn()
      dispatch(requestModal(ModalType.NO_MODAL))
    }, 300)
  }, [dispatch, onCloseFn])

  useEffect(() => { // fade in modal
    if (children) {
      setIsFadedIn(true)
    }
  }, [children])

  const renderCloseButton = () => (
    <button
      aria-label='Close'
      onClick={handleClose}
      onFocus={() => setIsCloseButtonFocused && setIsCloseButtonFocused(true)}
      onBlur={() => setIsCloseButtonFocused && setIsCloseButtonFocused(false)}
    >
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

  const styles = MODAL_STYLE_MAPS[modalStyle]

  const renderModal = () => (
    <div role='dialog' aria-label={modalHeader} className={`${styles.outerContainer} z-50 duration-500 ease-out m-auto ${isFadedIn ? 'opacity-100' : 'opacity-0 duration-300'}`}>
      <div className={`bg-white dark:bg-grey-850 ${styles.innerContainer} shadow-md`}>
        <div className={`flex px-[20px] items-center w-full ${styles.headerContainer}`} onClick={(e) => e.stopPropagation()}>
          {styles.isHeaderAtTop && <h1 className={`mt-[10px] mb-[5px] ${styles.header}`}>{modalHeader}</h1>}
          {renderCloseButton()}
        </div>
        <div aria-live='assertive' className={`overflow-y-scroll scrollbar-hidden max-h-[80vh]  ${styles.childrenContainer}`} onClick={(e) => e.stopPropagation()}>
          {!styles.isHeaderAtTop && modalHeader && <h1 className='mt-[19px] mb-[10px] font-heading-4'>{modalHeader}</h1>}
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <FocusTrap>
      <div id='modal-download-target'> {/* Allows the downloadAsset service to work inside of modals when focus trapped*/}
        <div className={`fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33] z-50 duration-500 ease-out ${isFadedIn ? 'opacity-100' : 'opacity-0 duration-300'}`} onClick={handleClose} />
        <div className='fixed z-50 m-auto left-0 right-0' onClick={handleClose}>
          {renderModal()}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
