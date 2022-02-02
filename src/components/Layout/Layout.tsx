import React from 'react'
import Sidebar from 'components/Sidebar'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex h-screen bg-grey-200'>
      <Sidebar />
      <div className='flex w-full'>
        {children}
      </div>
    </div>
  )
}


export default Layout
