import React from 'react'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({children}: Props) => {
  return (
    <main id='main-content' className='flex w-full flex-col min-w-[650px] mt-[60px] px-[5%] mb-[100px]'>
      {children}
    </main>
  )
}


export default PageLayout
