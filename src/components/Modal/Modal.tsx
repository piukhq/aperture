import React from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'

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
    <>
      <div className='fixed inset-0 bg-grey-975/[0.33] dark:bg-grey-200/[0.33] z-50' onClick={handleClose} />
      <div className='fixed left-2/4 translate-x-[-50%] w-[750px] h-[780px] bg-white dark:bg-grey-850 rounded-[20px] justify-center mt-[53px] z-50'>
        <div className='flex h-[61px] flex-row-reverse items-center w-full border-b-[1px] border-grey-300'>
          <button className='mr-[29px]' onClick={handleClose}>
            <CloseIcon className='w-[14px] h-[14px]' />
          </button>
        </div>

        <div className='px-[70px]'>
          {modalHeader &&
            <h1 className='mt-[19px] mb-[30px] font-heading-4'>{modalHeader}</h1>
          }
          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
