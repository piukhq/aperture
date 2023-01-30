import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import ApertureSVG from 'icons/svgs/aperture-logo-large.svg'
import {Button} from 'components'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour} from 'components/Button/styles'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

const IndexPage: NextPage = withPageAuthRequired(() => {
  const router = useRouter()
  const [isLearnMoreClicked, setIsLearnMoreClicked] = useState(false)
  const [isAppHovered, setIsAppHovered] = useState(false)
  const [appClicked, setAppClicked] = useState(null)

  const fadeInOutClasses = `${isLearnMoreClicked ? 'opacity-100' : 'opacity-[0] h-0 scale-25'}`
  const fadeOutInClasses = `${isLearnMoreClicked ? 'opacity-0 hidden' : 'opacity-100'}`
  const appButtonClasses = `${fadeInOutClasses} duration-1000 ease-out font-heading-4 w-3/5 p-4 flex flex-col items-center  border-orange border-2 rounded-lg shadow-sm hover:shadow-lg hover:border-red hover:bg-red/10 h-max`

  useEffect(() => {
    if (appClicked) {
      setTimeout(() => {
        router.push(router.asPath, appClicked)
      }, 200)
    }
  }, [appClicked, router])
  return (
    <div className='w-[70vw] flex-col items-center gap-4 overflow-hidden'>
      <div className={
        `${isLearnMoreClicked ? 'pt-16' : 'pt-64'} w-full  flex flex-col gap-4 justify-center items-center overflow-hidden duration-500 ease-out`}>
        <div className=
          {`absolute overflow-hidden skew-x-12
            ${isLearnMoreClicked ? 'scale-[40%] -translate-x-[170px] -translate-y-6' : 'scale-[120%]'} ml-4 duration-500 transform-gpu ease-out 
            ${appClicked && 'scale-[300%] translate-x-12 translate-y-48 skew-x-0 blur-sm'}`
          }
        >
          <ApertureSVG className={`${isLearnMoreClicked ? 'animate-spin-slow opacity-80 fill-orange' : 'animate-spin-super-slow opacity-20 fill-blue'} duration-1000 ease-out ${isAppHovered && 'fill-red rounded-full'}
          ${appClicked && 'z-30 bg-grey-100 animate-spin-medium dark:bg-grey-850 fill-grey-500 opacity-80 dark:fill-grey-900'}`}/>

        </div>
        <div className={`flex flex-col gap-4 ${appClicked && 'opacity-0 duration-500'}`}>
          <h1 className='font-heading-1 -skew-x-12 text-[5rem] ml-48'>APERTURE</h1>
          <div className='ml-48 z-20 duration-500'>
            <span className={`${!isLearnMoreClicked && fadeOutInClasses} font-heading-6 text-center z-10`}>
              {!isLearnMoreClicked && 'Select a tool or'}
            </span>
            <span className={`ml-2 ${isLearnMoreClicked && 'ml-[125px]'}`}>
              <Button
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={isLearnMoreClicked ? ButtonBackground.RED : ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                handleClick={() => setIsLearnMoreClicked(!isLearnMoreClicked)}
                additionalStyles='duration-500 ease-out'
              >{isLearnMoreClicked ? 'go back' : 'learn more'}
              </Button>
            </span>
          </div>
        </div>
      </div>

      <div className={`${fadeInOutClasses} duration-500 p-4 flex flex-col gap-4 items-center mt-8 z-50 ${appClicked && 'opacity-0'}`}>
        <p className='font-body-3 w-3/5'>Aperture is Bink&apos;s internal services portals where we can support merchant onboarding and customers. Let us hope that I can come up with something more useful to add here else this paragraph can be deleted. Any feedback? let us know!</p>
        <button className={appButtonClasses}
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          disabled= {!isLearnMoreClicked}
          onClick={() => setAppClicked('asset-comparator')}
        >
          <h2 className='font-heading-5 italic'>ASSET COMPARATOR</h2>
          <p className='font-body-3'>Compare the images for a given plan across environments</p>
        </button>
        <button
          className={appButtonClasses}
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          disabled= {!isLearnMoreClicked}
          onClick={() => setAppClicked('plan-comparator')}
        >
          <h2 className='font-heading-5 italic'>PLAN COMPARATOR</h2>
          <p className='font-body-3'>Compare everything else for a given plan across environments</p>
        </button>
        <button
          className={appButtonClasses}
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          disabled= {!isLearnMoreClicked}
          onClick={() => setAppClicked('mid-management/directory')}
        >
          <h2 className='font-heading-5 italic'>MID MANAGEMENT</h2>
          <p className='font-body-3'>Manage MIDs, locations, secondary MIDs and PSIMIs</p>
        </button>
        <button
          onMouseEnter={() => setIsAppHovered(true)}
          onMouseLeave={() => setIsAppHovered(false)}
          disabled= {!isLearnMoreClicked}
          className={appButtonClasses}
          onClick={() => setAppClicked('customer-wallets')}
        >
          <h2 className='font-heading-5 italic'>CUSTOMER WALLETS</h2>
          <p className='font-body-3'>View a customers transactions, payment and loyalty cards</p>
        </button>
        <a className='mt-4 text-white text-md hover:bg-red/75 bg-red p-2 rounded-lg font-heading-7 duration-500' href={'https://teams.microsoft.com/l/chat/0/0?users=cmorrow@bink.com&topicName=Aperture Feedback&message=I was using Aperture and I thought...'}>
            Give praise, suggestions or rants
        </a>
      </div>
    </div>
  )
})

export default IndexPage
