import React from 'react'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({children}: Props) => {
  return (
    <main className='flex w-full flex-col mt-[57px] mr-[139px] mb-[133px] ml-[61px]'>
      {children}
    </main>
  )
}


export default PageLayout
