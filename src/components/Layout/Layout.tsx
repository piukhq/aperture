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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className={`flex min-h-screen h-max ${isSidebarOpen ? 'flex-row' : 'flex-col sticky'} duration-400 bg-gradient-to-b from-grey-200 to-grey-400 dark:from-grey-900 dark:to-grey-850 [scrollbar-gutter: stable]`}>
      {modalRequested !== ModalType.NO_MODAL && <ModalFactory modalRequested={modalRequested} />}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <div className={`flex w-full min-h-screen pt-1 ${!isSidebarOpen && 'mt-8'} duration-200 ease-in-out`}>
        {children}
      </div>
    </div>
  )
}


export default Layout
