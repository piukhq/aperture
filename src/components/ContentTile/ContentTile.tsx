import React from 'react'

type Props = {
  children: React.ReactNode,
}

const ContentTile = ({children}: Props) => {
  return (
    <div className='flex flex-col items-center rounded-xl min-h-[715px] h-max pb-[20px] mt-[42px] bg-white dark:bg-grey-825 shadow-md'>
      {children}
    </div>
  )
}

export default ContentTile
