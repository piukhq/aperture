import React from 'react'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({children}: Props) => {
  return (
    <main className='flex w-full flex-col min-h-[100vh] min-w-[600px] mt-[50px] px-[5%] mb-[100px]'>
      {children}
    </main>
  )
}


export default PageLayout
