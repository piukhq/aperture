import type {NextPage} from 'next'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import usePermissions from 'hooks/usePermissions'
import {UserPermissions, Admin} from 'utils/enums'
import ApertureSVG from 'icons/svgs/aperture-logo-large.svg'
import {Button, HeadMetadata} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour} from 'components/Button/styles'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'


const IndexPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const {hasRequiredPermission} = usePermissions()
  const [isLearnMoreClicked, setIsLearnMoreClicked] = useState(false)
  const [isAppHovered, setIsAppHovered] = useState(false)
  const [appClicked, setAppClicked] = useState(null)
  const isMobileViewport = useIsMobileViewportDimensions()

  const fadeInOutClasses = `${isLearnMoreClicked ? 'opacity-100' : 'opacity-[0] h-0 scale-25'}`
  const fadeOutInClasses = `${isLearnMoreClicked ? 'opacity-0 hidden' : 'opacity-100'}`
  const appButtonClasses = `${fadeInOutClasses} duration-1000 ease-out font-heading-4 w-3/5  p-4 mx-2 flex flex-col items-center  border-orange bg-orange/5 border-2 rounded-lg shadow-sm hover:shadow-lg hover:border-red hover:bg-red/10 h-max`

  const menuOptions = [
    {
      title: 'Asset Comparator',
      description: 'Compare the images for a given plan across environments',
      link: 'asset-comparator',
    },
    {
      title: 'Plan Comparator',
      description: 'Compare everything else for a given plan across environments',
      link: 'plan-comparator',
    },
    {
      title: 'MID Management',
      description: 'Manage MIDs, locations, secondary MIDs and PSIMIs',
      link: 'mid-management/directory',
      requiredPermission: UserPermissions.MERCHANT_DATA_READ_ONLY,
    },
    {
      title: 'Customer Wallets',
      description: 'View a customer\'s transactions, payment and loyalty cards',
      link: 'customer-wallets',
      requiredPermission: UserPermissions.CUSTOMER_WALLET_READ_ONLY,
    },
  ]

  const renderMenuOptions = () => {
    return menuOptions.map((option) => {
      const {title, description, link, requiredPermission} = option
      if(!requiredPermission || hasRequiredPermission(requiredPermission)) {
        return <button
          key={link}
          className={appButtonClasses}
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          disabled= {!isLearnMoreClicked}
          onClick={() => setAppClicked(link)}
        >
          <h2 className='font-heading-5 italic'>{title}</h2>
          <p className='font-body-3'>{description}</p>
        </button>
      }
    })
  }

  useEffect(() => { // Delay redirect for page transition
    if (appClicked) {
      setTimeout(() => {
        router.push(router.asPath, appClicked)
      }, 200)
    }
  }, [appClicked, router])

  return (
    <div className={`w-full h-max flex-col items-center gap-4 overflow-hidden ${!isLearnMoreClicked && 'pb-112 overflow-clip'}`}>
      <HeadMetadata pageTitle='Home' pageDescription='The Internal Tooling Portal for Bink' />
      {/* Aperture Rings and Title */}
      <div className={
        `${isLearnMoreClicked ? 'pt-12' : 'pt-64'}  mt-8 flex flex-col gap-4 justify-center items-center duration-500 pb-4 ${isMobileViewport && 'scale-[85%]'} overflow-visible`}>
        {/* Outer Ring */}
        <div className=
          {`absolute skew-x-12 z-20 transform-gpu overflow-hidden
            ${isLearnMoreClicked ? 'scale-[40%] -translate-x-[260px] -translate-y-6 delay-100' : 'scale-[120%] delay-0'} ml-4 duration-500 ease-in
            ${appClicked && 'scale-[400%] translate-x-12 translate-y-48 skew-x-0 blur-sm delay-0 overflow-hidden'}`

          }
        >
          <ApertureSVG className={`${isLearnMoreClicked ? 'animate-spin-15s opacity-70 fill-orange' : 'animate-spin-80s opacity-20 fill-blue'} duration-1000 ease-out ${isAppHovered && 'fill-red rounded-full'}
          ${appClicked && 'z-20 bg-grey-100 animate-spin-medium dark:bg-grey-850 fill-grey-500 opacity-80 dark:fill-grey-900'}`}/>
        </div>

        {/* Inner Ring */}
        <div className=
          {`absolute skew-x-12 -translate-x-2 -translate-y-2 z-10 opacity-70 transform-gpu overflow-hidden
            ${isLearnMoreClicked ? 'scale-[30%] -translate-x-[261px]  -translate-y-[20px] delay-0' : 'scale-[90%] delay-100'} ml-4 duration-500 ease-in 
            ${appClicked && 'scale-[400%] translate-x-12 translate-y-48 skew-x-0 delay-100 overflow-hidden'}`
          }
        >
          <ApertureSVG className={`${isLearnMoreClicked ? 'animate-spin-30s opacity-40 fill-orange bg-orange/50' : 'animate-spin-50s opacity-40 fill-blue/40'} duration-500 ease-out ${isAppHovered && 'fill-red rounded-full bg-red/50 z-10'}
          ${appClicked && 'z-20 bg-grey-100 animate-spin-2s dark:bg-orange/30 fill-grey-500 opacity-80 dark:fill-grey-900'}`}/>
        </div>

        {/* Title Text and Button */}
        <div className={`flex flex-col gap-4 ${appClicked && 'opacity-0 duration-500 z-40'}`}>
          <h1 className='font-heading-1 -skew-x-12 text-[5rem] z-40 pl-8 '>APERTURE</h1>
          <div className='ml-48 z-40 duration-500'>
            <span className={`${!isLearnMoreClicked && fadeOutInClasses} font-heading-6 text-center z-10`}>
              {!isLearnMoreClicked && 'Select a tool or'}
            </span>
            <span className={`ml-2 ${isLearnMoreClicked && 'ml-[125px]'}`}>
              <Button
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={isLearnMoreClicked ? ButtonBackground.ORANGE : ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                handleClick={() => setIsLearnMoreClicked(!isLearnMoreClicked)}
                additionalStyles='duration-500 ease-out'
              >{isLearnMoreClicked ? 'go back' : 'learn more'}
              </Button>
            </span>
          </div>
        </div>
      </div>

      {/* Learn more Elements */}
      <div className={`${fadeInOutClasses} duration-500 flex flex-col gap-4 items-center z-40 ${appClicked && 'opacity-0'} w-full`}>
        <div className='bg-orange/10 p-8 rounded-lg'>
          <h2 className='font-heading-7'>What&apos;s Missing for launch? 🦕</h2>
          <p className='font-body-4'>March 2023</p>
          <ul className='font-body-3 list-disc list-inside'>
            <li>File uploading</li>
            <li>Comment & sub-location revamp</li>
            <li>Harmonia updating</li>
          </ul>
        </div>
        {renderMenuOptions()}
        <a className='mt-4 text-white text-md hover:bg-red/75 bg-orange p-4 rounded-lg font-heading-7 duration-500' target='_blank' href={`https://teams.microsoft.com/l/chat/0/0?users=${Admin.EMAIL}&topicName=Aperture Feedback&message=Hey ${Admin.FIRST_NAME}, I was using Aperture and I thought that...`} rel='noreferrer'>
            Give praise, ideas, or rants
        </a>
      </div>
    </div>
  )
})

export default IndexPage
