import React from 'react'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({children}: Props) => <div className='flex w-full flex-col mt-[57px] mr-[139px] mb-[133px] ml-[61px]'>
  {children}
</div>


export default PageLayout
