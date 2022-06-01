import {useState, useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import SidebarOption from './components/SidebarOption'
import {RouteDisplayNames} from 'utils/enums'
import {toggleUseApiReflector, getUseApiReflector} from 'features/apiReflectorSlice'

const Sidebar = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isApiReflectorEnabled = useAppSelector(getUseApiReflector)

  const [selectedTool, setSelectedTool] = useState('')

  const sideOptions = Object.keys(RouteDisplayNames)

  useEffect(() => {
    // Remove the / at the start of the route path
    setSelectedTool(router.pathname.substring(1))
  }, [router.pathname])

  return (
    <div className='pr-64'>
      <div className='fixed w-64 h-full border-r-2 border-grey-300 dark:border-grey-800 bg-white dark:bg-grey-850 '>
        <div className='flex h-16 border-b border-grey-300 dark:border-grey-800 pl-[25px] items-center'>
          <Image data-testid='logo' src='/icons/svgs/logo.svg' height={30} width={30} alt='' />
          <h1 className='font-header text-grey-950 dark:text-grey-400 font-semibold text-[20px] ml-[10px]'>Bink</h1>
        </div>
        <div className='mt-6'>
          <h1 className='font-header text-grey-950 dark:text-grey-400 font-semibold text-[14px] tracking-widest ml-5'>TOOLS</h1>
          <nav className='mt-5'>
            {sideOptions.map(option => {
              // TODO: Remove this secondary condition once refactor takes place to include mid/mgn sub-menus
              const selected = selectedTool === option || selectedTool.includes(option)
              return <SidebarOption key={option} option={option} selected={selected} />
            })}
          </nav>
        </div>

        {process.env.NODE_ENV !== 'production' && (
          <div className='flex items-center mt-[100px]'>
            <label className='ml-[20px] mr-[10px] font-bold dark:text-white'>Enable API Reflector</label>
            <input type='checkbox' checked={isApiReflectorEnabled} onChange={() => dispatch(toggleUseApiReflector())} />
          </div>
        )}
      </div>
    </div>
  )
}


export default Sidebar
