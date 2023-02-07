const DirectoryTileSkeleton = () => {

  return (
    <div className='relative w-[363px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825 animate-pulse'>
      <div className='absolute top-[17px] right-[20px] bg-grey-400 rounded-lg'></div>
      <div className='flex flex-col items-center mt-[28px]'>
        <div className='w-[93px] rounded-[30px] bg-grey-200'></div>
        <div className='font-subheading-5 mt-[6px] w-24 h-24 bg-grey-200 rounded-[30px]'></div>
        <div className='flex mt-[16px] w-[118px] h-[40px] justify-between bg-grey-200 rounded-lg'></div>
        <div className='flex mt-[16px] mb-[20px] w-[218px] h-[40px] justify-between bg-grey-100 rounded-md'></div>
        <div className='w-[220px] h-10 bg-blue/20 rounded-md'></div>
      </div>
    </div>
  )
}

export default DirectoryTileSkeleton
