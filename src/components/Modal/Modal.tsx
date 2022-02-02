import React from 'react'
import CloseIcon from 'icons/svgs/close.svg'

type Props = {
  modalHeader?: string,
  children: React.ReactNode
}

const Modal = ({modalHeader, children}: Props) => {
  return (
    <div className='absolute top-0 left-0 right-0 h-screen w-screen bg-grey-transparent flex justify-center pt-[53px]'>
      <div className='flex flex-col w-[750px] h-[780px] bg-white rounded-[20px]'>
        <div className='flex h-[61px] flex-row-reverse items-center w-full border-b-[1px] border-grey-300'>
          <button className='mr-[29px]'>
            <CloseIcon className='w-[14px] h-[14px]' />
          </button>
        </div>

        <div className='px-[70px]'>
          {modalHeader &&
            <h1 className='mt-[19px] mb-[15px] text-[28px] font-semibold'>{modalHeader}</h1>
          }
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
