import React from 'react'
import {Sidebar} from 'components'

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex h-screen bg-grey-200 dark:bg-grey-950'>
      <Sidebar />
      <div className='flex w-full'>
        {children}
      </div>
    </div>
  )
}


export default Layout
