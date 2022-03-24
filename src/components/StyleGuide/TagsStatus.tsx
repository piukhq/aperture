import {Tag} from 'components'
import {TagStyle, TagSize} from 'components/Tag/styles'

type Props = {
  sectionClass: string,
}

const TagsStatus = ({sectionClass}: Props) => {
  return (
    <section className={sectionClass}>
      <h2 className='font-heading-3'>Tag & Status</h2>
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
            <p className={'text-sm font-body font-normal leading-6 tracking-[.1px] text-grey-600  dark:text-grey-100 text-center'}>
            1
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h4 className='font-heading-6 text-grey-600'>ENVIRONMENT</h4>
          <Tag tagSize={TagSize.MEDIUM} tagStyle={TagStyle.AQUAMARINE_FILLED} label='Develop' />
          <Tag tagSize={TagSize.MEDIUM} tagStyle={TagStyle.YELLOW_FILLED} label='Staging' />
          <Tag tagSize={TagSize.MEDIUM} tagStyle={TagStyle.LIGHT_BLUE_FILLED} label='Sandbox' />
          <Tag tagSize={TagSize.MEDIUM} tagStyle={TagStyle.RED_FILLED} label='Production' />
        </div>
        <div className='flex flex-col gap-4 p-4'>
          <h4 className='font-heading-6 text-grey-600'>STATUS 2</h4>
          <Tag tagSize={TagSize.SMALL} tagStyle={TagStyle.AQUAMARINE_OUTLINE} label='Verified' />
          <Tag tagSize={TagSize.SMALL} tagStyle={TagStyle.YELLOW_OUTLINE} label='Pending' />
          <Tag tagSize={TagSize.SMALL} tagStyle={TagStyle.GREY_OUTLINE} label='Unverified' />
          <Tag tagSize={TagSize.SMALL} tagStyle={TagStyle.RED_OUTLINE} label='Failed' />
        </div>
      </div>
    </section>
  )
}

export default TagsStatus
