import React from 'react'
import CloseIcon from 'icons/svgs/close.svg'

import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modal'

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
    <div className='absolute top-0 left-0 right-0 h-screen w-screen bg-grey-975/[0.33] dark:bg-grey-200/[0.33] flex justify-center pt-[53px] z-50'>
      <div className='flex flex-col w-[750px] h-[780px] bg-white dark:bg-grey-850 rounded-[20px]'>
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
    </div>
  )
}

export default Modal
