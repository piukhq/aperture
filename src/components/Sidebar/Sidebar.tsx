import {useState, useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import Button from 'components/Button'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelWeight} from 'components/Button/styles'
import SidebarOption from './components/SidebarOption'
import {ModalType, RouteDisplayNames} from 'utils/enums'
import {toggleUseApiReflector, getUseApiReflector} from 'features/apiReflectorSlice'
import {requestModal} from 'features/modalSlice'

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
    <div className='pr-64 z-[1]'>
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

        <div className='absolute bottom-[45px] w-full flex flex-col items-center'>
          {process.env.NEXT_PUBLIC_ENV !== 'production' && (
            <div className='mb-[20px]'>
              <label className='flex items-center font-bold dark:text-white'>
                Enable API Reflector
                <input className='ml-[20px]' type='checkbox' checked={isApiReflectorEnabled} onChange={() => dispatch(toggleUseApiReflector())} />
              </label>
            </div>
          )}

          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonBackground={ButtonBackground.RED}
            buttonWidth={ButtonWidth.MEDIUM}
            labelWeight={LabelWeight.SEMIBOLD}
            handleClick={() => dispatch(requestModal(ModalType.LOGOUT))}
          >Log out</Button>
        </div>
      </div>
    </div>
  )
}


export default Sidebar
