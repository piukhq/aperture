import {Tag} from 'components'

type Props = {
  sectionClass: string,
}

const TagsStatus = ({sectionClass}: Props) => {
  return (
    <section className={sectionClass}>
      <h2 className='font-heading-2'>Tag & Status</h2>
      <div className='grid grid-cols-5 gap-4'>
        <div className='flex flex-col gap-4 p-4'>
          <h4 className='font-heading-6 text-grey-600'>SKILL</h4>
          <h4 className='font-heading-6 text-grey-600'>Not implemented</h4>

        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h4 className='font-heading-6 text-grey-600'>STATUS 1</h4>
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
          <h4 className='font-heading-6 text-grey-600'>PAGINATION</h4>
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
          <h4 className='font-heading-6 text-grey-600'>ENVIRONMENT</h4>
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='Develop' />
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='Staging' />
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.LIGHT_BLUE_FILLED} label='Sandbox' />
          <Tag tagSize={Tag.tagSize.MEDIUM} tagStyle={Tag.tagStyle.RED_FILLED} label='Production' />
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h4 className='font-heading-6 text-grey-600'>STATUS 2</h4>
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.AQUAMARINE_OUTLINE} label='Verified' />
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.YELLOW_OUTLINE} label='Pending' />
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.GREY_OUTLINE} label='Unverified' />
          <Tag tagSize={Tag.tagSize.SMALL} tagStyle={Tag.tagStyle.RED_OUTLINE} label='Failed' />
        </div>
      </div>
    </section>
  )
}

export default TagsStatus
