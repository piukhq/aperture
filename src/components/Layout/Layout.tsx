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
    <div className={`flex min-w-[650px] ${isSidebarOpen ? 'flex-row' : 'flex-col sticky'} duration-400 [scrollbar-gutter: stable]`}>
      {modalRequested !== ModalType.NO_MODAL && <ModalFactory modalRequested={modalRequested} />}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <div className={`flex w-full pt-1 ${!isSidebarOpen && 'mt-8'} duration-200 ease-in-out`}>
        {children}
      </div>
    </div>
  )
}


export default Layout
