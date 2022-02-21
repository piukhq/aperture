import React from 'react'

type Props = {
  planSlug: string
}

// build array of image arrays e.g hero 1 [dssp], icon 1[dssp],
// MAYBE FOCUS ON HERO FIRST?

const AssetGrid = ({planSlug}: Props) => {

  return (
    <div className='grid grid-cols-5 w-full text-center bg-red'>
      <p className='h-[95px] bg-blue'>{planSlug}</p>

    </div>
  )
}

export default AssetGrid
