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
  const dispatch = useAppDispatch()

  const {user = {}} = useUser()
  const {permissions = []} = user as AuthUser
  const [sidebarWidthClass, setSidebarWidthClass] = useState('w-64')

  const isApiReflectorEnabled = useAppSelector(getUseApiReflector)

  const [selectedTool, setSelectedTool] = useState('')
  const [isLogoHovered, setIsLogoHovered] = useState(false)

  const sidebarOptions = Object.keys(RouteDisplayNames)

  useEffect(() => {
    // Remove the / at the start of the route path
    setSelectedTool(router.pathname.substring(1))
  }, [router.pathname])

  useEffect(() => {
    if (isOpen) {
      setSidebarWidthClass('w-64')
    } else {
      setSidebarWidthClass('w-0')
    }
  }, [isOpen])


  const getSidebarOptions = () => {
    return sidebarOptions.filter(option => {
      if (option === 'mid-management') {
        return permissions.includes(UserPermissions.MERCHANT_DATA_READ_ONLY)
      } else if (option === 'customer-wallets') {
        return permissions.includes(UserPermissions.CUSTOMER_WALLET_READ_ONLY)
      }
      return true
    })
  }

  const renderSidebarToggle = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className='flex items-center justify-center h-16 w-16 hover:scale-125 duration-200'
    >
      <ArrowDownSvg fill='blue' className={`${isOpen ? 'rotate-90' : '-rotate-90'} scale-125`} />
    </button>
  )

  // Render the collapsed sidebar
  if (!isOpen) {
    return (
      <nav className='flex w-full space-between duration-200 fixed z-50 bg-grey-200 dark:bg-grey-900'>
        <Link href='/' passHref>
          <div onMouseOver={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)} className='flex h-16 pl-[25px] items-center ml-6 cursor-pointer'>
            <Image className={`${isLogoHovered && 'hue-rotate-[170deg]'} opacity-60 duration-[7s] skew-x-12`} data-testid='logo' src='/icons/svgs/aperture-logo-large.svg' height={35} width={35} alt='' />
            <div className='absolute h-[14px] w-[15px] translate-x-[28px] -skew-x-[30deg] bg-white dark:bg-grey-850' />
            <h1 className='font-heading-1 text-[1.25rem] -translate-x-[9px] -skew-x-12'>APERTURE {isLogoHovered}</h1>
          </div>
        </Link>
        {renderSidebarToggle()}
      </nav>
    )
  }

  // Render the expanded sidebar
  return (
    <div className='pr-64 z-[1]'>
      <nav className={`fixed ${sidebarWidthClass} h-full border-r-2 border-grey-300 dark:border-grey-900 bg-grey-100 dark:bg-grey-850 shadow-sm duration-200`}>
        <div className='flex w-64'>
          <Link href='/' passHref>
            <div onMouseOver={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)} className='flex h-16 pl-[25px] items-center ml-6 cursor-pointer'>
              <Image className={`${isLogoHovered && 'hue-rotate-[170deg]'} opacity-60 duration-[7s] skew-x-12`} data-testid='logo' src='/icons/svgs/aperture-logo-large.svg' height={35} width={35} alt='' />
              <div className='absolute h-[14px] w-[15px] translate-x-[28px] -skew-x-[30deg] bg-white dark:bg-grey-850' />
              <h1 className='font-heading-1 text-[1.25rem] -translate-x-[9px] -skew-x-12'>APERTURE {isLogoHovered}</h1>
            </div>
          </Link>
          {renderSidebarToggle()}
        </div>

        <div className='pt-6 border-t border-grey-300 dark:border-grey-900 '>
          <div className='mt-5 overflow-hidden'>
            {getSidebarOptions().map(option => {
              // TODO: Remove this secondary condition once refactor takes place to include mid/mgn sub-menus
              const selected = selectedTool === option || selectedTool.includes(option)
              return <SidebarOption key={option} option={option} selected={selected} />
            })}
          </div>
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
      </nav>
    </div>
  )
}

export default memo(Sidebar)
