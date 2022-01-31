// TODO: More information needed with regards to how these are used in reality.

import {Heading2, Heading6Title, Heading7Medium} from 'components/elements/Text'

import NavigationItem from 'components/elements/NavigationItem'

import DashboardSvg from 'icons/svgs/dashboard.svg'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchSvg from 'icons/svgs/search.svg'

export default function MenuElements ({sectionClass}) {
  return (
    <>
      <section className={sectionClass}>
        <Heading2>Menu</Heading2>
        <div className='flex flex-col gap-4'>
          <Heading6Title>SIDE MENU</Heading6Title>
          <div className='grid grid-cols-3 gap-4'>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-blue dark:border-l-white'><DashboardSvg /></span>
              <span className='col-span-7 text-left'>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white px-1'>3</span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-semibold text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-100 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-blue dark:border-l-white'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu Active</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-semibold font-base text-sm tracking-[0.1px] text-white bg-blue'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'><DashboardSvg /></span>
              <span className='col-span-8 text-left'>Menu Active</span>
              <span className='col-span-1'><ArrowDownSvg /></span>
            </button>

            <button className='grid grid-cols-12 items-center w-[250px] h-[52px] pr-[10px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-3 h-[32px] pl-4 flex items-center'><DashboardSvg /></span>
              <span className='col-span-7 text-left '>Menu</span>
              {/* Different Red circle below, better IMO esp if there is double digits at some point */}
              <span className='col-span-2 rounded-full bg-red font-body text-sm p-1 text-white'>3</span>
            </button>

          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>SUB MENU</Heading6Title>
          <div className='grid grid-cols-3 gap-4'>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500  hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-white/50 dark:text-grey-500 bg-blue hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-300'>102</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-900 dark:text-grey-500  hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 text-red text-3xl border-l-transparent'>&bull;</span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu Active</span>
              <span className='col-span-2 rounded-full font-body text-sm pr-6 text-right text-grey-500'>1</span>
            </button>
            <button className='grid grid-cols-12 items-center pr-[10px] w-[250px] h-[52px] font-heading font-base font-regular text-sm tracking-[0.1px] text-grey-100 dark:text-grey-500 bg-blue hover:text-blue dark:hover:text-white'>
              <span className='col-span-2 h-[32px] pl-4 flex items-center border-l-4 border-l-transparent'></span>
              <span className='col-span-8 pl-4 text-left'>Sub Menu Active</span>
              <span className='col-span-2 rounded-full bg-white/10 font-body text-sm p-1 text-grey-300'>102</span>
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>PEOPLE & GROUP</Heading6Title>
          <div className='grid grid-cols-1'>
            <Heading7Medium>[Not Implemented]</Heading7Medium>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Heading6Title>NAV MENU</Heading6Title>
          <div className='grid grid-cols-1 gap-4'>
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-medium text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-grey-800 dark:text-grey-500 hover:text-blue dark:hover:text-white'>
              <span className='w-[110px] h-[70px] flex items-center gap-1 border-t-4 border-t-transparent'><SearchSvg className='scale-75' />Schedule</span>
            </button>
            <button className='grid place-content-center w-[147px] h-[70px] font-heading font-semibold text-sm tracking-[0.1px] bg-white dark:bg-grey-850 text-blue dark:text-white'>
              <span className='w-[110px] h-[70px] flex items-center gap-1 border-t-[3px] border-t-blue dark:border-t-white'><DashboardSvg className='scale-75' />Dashboard</span>
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-4'>
            <Heading6Title>NAV MENU [Extra Design]</Heading6Title>
            <div className='flex flex-col gap-4'>
              <NavigationItem
                path='/style-guide'
                label='Style Guide'
                svgIcon={<DashboardSvg/>}
              />
              <NavigationItem
                path='/'
                label='Home'
                svgIcon={<DashboardSvg/>}
              />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <Heading6Title>USER PROFILE</Heading6Title>
            <div className='flex flex-col gap-4'>
              <Heading7Medium>[Not Implemented]</Heading7Medium>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='flex flex-col gap-8'>
            <Heading2>Tab Menu</Heading2>
            <div className='grid grid-cols-3 gap-4'>
              <button className='grid place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <span className='flex items-center gap-3 border-b-4 border-b-transparent'>Jobs</span>
              </button>
              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-sm font-normal text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
              </button>
              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-transparent font-heading tracking-[0.1px] bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-base font-medium text-grey-900 tracking-[.1px] dark:text-grey-100'>12,2K</p>
                <p className='text-sm font-normal  text-grey-700 tracking-[0.2px] dark:text-grey-100'>Likes</p>
              </button>
              <button className='grid gap-1 place-content-center w-[80px] h-[50px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <span className='place-content-center flex w-[60px] h-[50px] items-center gap-3 border-b-4 border-b-blue'>Home</span>
              </button>
              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-sm font-normal  tracking-[0.2px] dark:text-grey-100'>Posts</p>
                <p className='text-base font-medium tracking-[.1px] dark:text-grey-100'>10,3K</p>
              </button>
              <button className='grid gap-1 place-content-center w-[71px] h-[67px] border-b-[4px] border-b-blue font-heading tracking-[0.1px]  text-blue bg-white dark:bg-grey-825 hover:text-blue dark:hover:text-white'>
                <p className='text-base font-medium tracking-[.1px] dark:text-grey-100'>10,3K</p>
                <p className='text-sm font-normal  tracking-[0.2px] dark:text-grey-100'>Posts</p>
              </button>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
