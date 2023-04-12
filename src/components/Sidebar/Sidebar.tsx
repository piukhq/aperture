import {useState, useEffect, memo} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import {useRouter} from 'next/router'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import Button from 'components/Button'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelWeight} from 'components/Button/styles'
import SidebarOption from './components/SidebarOption'
import {ModalType, RouteDisplayNames, UserPermissions} from 'utils/enums'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {toggleUseApiReflector, getUseApiReflector} from 'features/apiReflectorSlice'
import {requestModal} from 'features/modalSlice'
import {useUser} from '@auth0/nextjs-auth0'
import {AuthUser} from 'types'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({isOpen, setIsOpen}: Props) => {
  const router = useRouter()
  const {pathname} = router
  const dispatch = useAppDispatch()

  const {user = {}} = useUser()
  const {permissions = []} = user as AuthUser
  const [sidebarWidthClass, setSidebarWidthClass] = useState('w-64')
  const isApiReflectorEnabled = useAppSelector(getUseApiReflector)

  const [selectedTool, setSelectedTool] = useState('')
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('/')
  const isMobileViewport = useIsMobileViewportDimensions()

  const sidebarOptions = Object.keys(RouteDisplayNames)

  useEffect(() => {
    // Remove the / at the start of the route path
    setSelectedTool(pathname.substring(1))
    const path = pathname.split('/')[1]
    setCurrentLocation('/' + path)
  }, [pathname])


  useEffect(() => {
    if (isOpen) {
      setSidebarWidthClass('w-64')
    } else {
      setSidebarWidthClass('w-0')
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setSidebarWidthClass('w-64')
    } else {
      setSidebarWidthClass('w-0')
    }
  }, [isOpen])


  const allowedSidebarOptions = sidebarOptions.filter(option => {
    if (option === 'mid-management') {
      return permissions.includes(UserPermissions.MERCHANT_DATA_READ_ONLY)
    } else if (option === 'customer-wallets') {
      return permissions.includes(UserPermissions.CUSTOMER_WALLET_READ_ONLY)
    }
    return true
  })

  const sidebarSubHeadingClasses = 'my-2 font-header text-grey-600 dark:text-grey-700 uppercase font-semibold text-[14px] tracking-widest ml-5'

  const renderApertureLink = (renderAperture = true) => (
    <Link href='/' passHref>
      <a onMouseOver={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)} className={`flex gap-2 justify-center items-center cursor-pointer ${!isMobileViewport && 'h-16 pl-[25px]  ml-6'}`}>
        <Image className={`${isLogoHovered && 'hue-rotate-[170deg]'} opacity-60 duration-[7s] skew-x-12`} data-testid='logo' src='/icons/svgs/aperture-logo-large.svg' height={35} width={35} alt='' />
        {renderAperture && (
          <>
            <div className='absolute h-[14px] w-[15px] translate-x-[28px] -skew-x-[30deg] bg-white dark:bg-grey-850' />
            <h1 className='font-heading-1 text-[1.25rem] -translate-x-[14px] -skew-x-12'>APERTURE</h1>
          </>
        )}
      </a>
    </Link>
  )
  // Render Topbar for mobile viewports
  const renderTopBar = () => {
    const handleTopBarSelectChange = () => (e: React.ChangeEvent<HTMLSelectElement>) => {
      router.push(e.target.value)
      setCurrentLocation(e.target.value)
    }
    return (
      <>
        <div className='flex items-center justify-between w-full px-12 py-3 bg-grey-200 dark:bg-grey-900'>
          <div className='flex'>
            {renderApertureLink(false)}
            <select className='w-34 font-heading-7 italic text-2xs uppercase p-1 m-1 bg-transparent col-span-10' value={currentLocation} onChange={handleTopBarSelectChange()}>
              <option value='/'>Home</option>
              {allowedSidebarOptions.map(option => <option key={option} value={`/${option}`}>{RouteDisplayNames[option as keyof typeof RouteDisplayNames]}</option>) }
            </select>
          </div>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.SMALL }
            buttonBackground={ButtonBackground.RED}
            buttonWidth={ButtonWidth.AUTO}
            labelWeight={LabelWeight.SEMIBOLD}
            handleClick={() => dispatch(requestModal(ModalType.LOGOUT))}
            additionalStyles='p-4 flex justify-center items-center'
          >Log out</Button>
        </div>
        <div className=''></div>
      </>
    )
  }

  const renderSidebarToggle = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center justify-center h-8 w-8 ease-in-out border-grey-400 dark:border-grey-825 hover:scale-125 rounded-full border-2 bg-white/90 dark:bg-black/50 duration-200 ${isOpen ? 'translate-x-12 ml-[6px] translate-y-12 rotate-90' : 'translate-x-2 translate-y-4 -rotate-90'}`}
    >
      <ArrowDownSvg fill='grey' className='scale-125 pt-[1px]' />
    </button>
  )

  // Render the Mobile Topbar
  if (isMobileViewport) {
    return (
      <nav className='flex flex-col w-full space-between duration-200 fixed z-40'>
        {renderTopBar()}
      </nav>
    )
  }

  // Render the collapsed sidebar
  if (!isOpen) {
    return (
      <nav className='flex w-full space-between duration-200 fixed z-40 bg-gradient-to-b from-grey-200 via-grey-200 to-grey-200/5 dark:from-grey-900 dark:via-grey-900 dark:to-grey-900/5'>
        {renderApertureLink()}
        {renderSidebarToggle()}
      </nav>
    )
  }

  // Render the expanded sidebar
  return (
    <div className='pr-64 z-40'>
      <nav className={`fixed ${sidebarWidthClass} h-full border-r-2 border-grey-300 dark:border-grey-825 bg-grey-100 dark:bg-grey-850 shadow-sm duration-200 ease-out`}>
        <a href='#main-content' className='absolute font-heading-7 uppercase m-2 z-40 bg-white dark:bg-black/50 focus:opacity-100 opacity-0 duration-300 pointer-events-none'>Skip to content</a>
        <div className='flex w-64'>
          {renderApertureLink()}
          <div className='-translate-x-2'>
            {renderSidebarToggle()}
          </div>
        </div>

        <div className='flex flex-col justify-between h-[90%] overflow-auto'>
          <div className='pt-6 border-t border-grey-300 dark:border-grey-900'>
            <div className='mt-5 overflow-hidden h-[90%]'>
              {allowedSidebarOptions.map(option => {
                const selected = selectedTool === option || selectedTool.includes(option)
                // Not the most robust way to handle subheadings but it is fine till the sidebar grows
                return (
                  <div key={option + '-container'}>
                    {option === 'mid-management' && <h2 className={sidebarSubHeadingClasses}>MID Management</h2>}
                    {option === 'asset-comparator' && <h2 className={sidebarSubHeadingClasses}>Plan Management</h2>}
                    {option === 'customer-wallets' && <h2 className={sidebarSubHeadingClasses}>Customer Support</h2>}
                    <SidebarOption key={option} option={option} selected={selected} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className='w-full flex flex-col items-center pb-6'>
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
      </nav>
    </div>
  )
}

export default memo(Sidebar)
