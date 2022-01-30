import {Heading2, Heading6Title} from 'components/Text'

export default function TagsStatus ({sectionClass}) {
  return (
    <section className={sectionClass}>
      <Heading2>Tag & Status</Heading2>
      <div className='grid grid-cols-5 gap-4'>
        <div className='flex flex-col gap-4 p-4'>
          <Heading6Title>SKILL</Heading6Title>
          <Heading6Title>Not implemented</Heading6Title>

        </div>
        <div className='flex flex-col gap-4 p-4'>
          <Heading6Title>STATUS 1</Heading6Title>
          <div className='h-[26px] w-[82px] bg-aquamarine/10'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-aquamarine dark:text-grey-100 text-center'}>
            Completed
            </p>
          </div>
          <div className='h-[26px] w-[82px] bg-lightBlue/10'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-lightBlue dark:text-grey-100 text-center'}>
            For Pickup
            </p>
          </div>
          <div className='h-[26px] w-[82px] bg-yellow/10'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-yellow dark:text-grey-100 text-center'}>
            It&lsquo;s Enough
            </p>
          </div>
          <div className='h-[26px] w-[82px] bg-red/10'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-red dark:text-grey-100 text-center'}>
            Declined
            </p>
          </div>


        </div>
        <div className='flex flex-col gap-4 p-4'>
          <Heading6Title>PAGINATION</Heading6Title>
          <div className='h-[24px] w-[9px] bg-lightBlue/10'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-blue dark:text-grey-100 text-center'}>
            1
            </p>
          </div>
          <div className='h-[24px] w-[9px] items-center'>
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-grey-500  dark:text-grey-100 text-center'}>
            1
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <Heading6Title>ENVIRONMENT</Heading6Title>
          <div className='flex items-center justify-center bg-aquamarine rounded-[10px] h-[38px] w-[129px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Develop</p>
          </div>
          <div className='flex items-center justify-center bg-yellow rounded-[10px] h-[38px] w-[129px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Staging</p>
          </div>
          <div className='flex items-center justify-center bg-lightBlue rounded-[10px] h-[38px] w-[129px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Sandbox</p>
          </div>
          <div className='flex items-center justify-center bg-red rounded-[10px] h-[38px] w-[129px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px] text-grey-100'}>Production</p>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <Heading6Title>STATUS 2</Heading6Title>
          <div className='flex items-center justify-center border border-lightBlue text-lightBlue rounded-[10px] h-[38px] w-[93px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Verified</p>
          </div>
          <div className='flex items-center justify-center border border-yellow text-yellow rounded-[10px] h-[38px] w-[93px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Pending</p>
          </div>
          <div className='flex items-center justify-center border border-grey-600 text-grey-600 rounded-[10px] h-[38px] w-[93px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Unverified</p>
          </div>
          <div className='flex items-center justify-center border border-red text-red rounded-[10px] h-[38px] w-[93px]'>
            <p className={'text-sm font-heading font-medium tracking-[.1px]'}>Failed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
