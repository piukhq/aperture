import React from 'react'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({children}: Props) => {
  return (
    <main className='flex w-full flex-col min-w-[200px] mt-[57px] mr-[63px] mb-[133px] ml-[63px]'>
      {children}
    </main>
  )
}


export default PageLayout
