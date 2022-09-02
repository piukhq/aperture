import React from 'react'
import {ModalFactory, Sidebar} from 'components'
import {selectModal} from 'features/modalSlice'
import {useAppSelector} from 'app/hooks'
import {ModalType} from 'utils/enums'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  const modalRequested: ModalType = useAppSelector(selectModal)

  return (
    <div className='flex min-h-screen h-max min-w-fit bg-grey-200 dark:bg-grey-950'>
      {modalRequested !== ModalType.NO_MODAL && <ModalFactory modalRequested={modalRequested} />}

      <Sidebar />

      <div className='flex w-full'>
        {children}
      </div>
    </div>
  )
}


export default Layout
