import React from 'react'

type Props = {
  children: React.ReactNode,
}

const ContentTile = ({children}: Props) => {
  return (
    <div className='flex flex-col items-center shadow-black rounded-xl h-[937px] mt-[42px] pt-[145px] bg-white'>
      {children}
    </div>
  )
}

export default ContentTile
