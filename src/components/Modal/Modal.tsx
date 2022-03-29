import React from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import FocusTrap from 'focus-trap-react'

type Props = {
  modalHeader?: string,
  children: React.ReactNode
}

const Modal = ({modalHeader, children}: Props) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(requestModal('NO_MODAL'))
  }

  return (
    <FocusTrap>
      <div>
        <div className='fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33] z-50' onClick={handleClose} />
        <div className='fixed left-2/4 translate-x-[-50%] max-h-[80%] w-[750px] bg-white dark:bg-grey-850 rounded-[20px] justify-center mt-[53px] z-50 border-white border-4 overflow-y-auto scrollbar-hidden'>
          <div className='flex h-[61px] flex-row-reverse items-center w-full border-b-[1px] border-grey-300 dark:border-grey-800'>
            <button className='mr-[29px]' aria-label='Close' onClick={handleClose}>
              <CloseIcon className='w-[14px] h-[14px]' />
            </button>
          </div>
          <div aria-live='assertive' className='px-[70px]'>
            {modalHeader &&
              <h1 className='mt-[19px] mb-[10px] font-heading-4'>{modalHeader}</h1>
            }
            {children}
          </div>
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
