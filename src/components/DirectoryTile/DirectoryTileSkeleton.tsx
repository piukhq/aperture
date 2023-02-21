const DirectoryTileSkeleton = () => {

  return (
    <div aria-hidden className='relative w-[363px] h-[331px] rounded-[20px] bg-white dark:bg-grey-850 animate-pulse'>
      <div className='flex flex-col items-center mt-[28px] blur-sm'>
        <div className='w-[93px] rounded-[30px]'></div>
        <div className='w-24 h-24 bg-grey-200 dark:bg-grey-700 rounded-[30px] '></div>
        <p className='font-heading-5 opacity-50 w-[118px] h-[30px] justify-between text-center rounded-lg'>Loading</p>
        <p className='font-subheading-5'>0 Locations</p>
        <div className='flex mt-[15px] mb-[25px] w-[218px] h-[40px] justify-between rounded-md'>
          <div className='flex flex-col items-center '>
            <p className='font-subheading-4'>VISA</p>
            <p className='font-heading-5'>0</p>
          </div>
          <div className='flex flex-col items-center '>
            <p className='font-subheading-4'>MASTERCARD</p>
            <p className='font-heading-5'>0</p>
          </div>
          <div className='flex flex-col items-center '>
            <p className='font-subheading-4'>AMEX</p>
            <p className='font-heading-5'>0</p>
          </div>
        </div>
        <div className='w-[220px] h-10 bg-blue/20 rounded-md font-body-3 flex items-center justify-center text-white'>View</div>
      </div>
    </div>
  )
}

export default DirectoryTileSkeleton
