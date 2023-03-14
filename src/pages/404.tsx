import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour} from 'components/Button/styles'
import {Button, ApertureHeader} from 'components'
import {Admin} from 'utils/enums'

const Custom404: NextPage = withPageAuthRequired(() => (
  <div className='w-full flex-col justify-center items-center gap-4 overflow-hidden'>
    <ApertureHeader />
    <div className={'flex flex-col gap-4 items-center'}>
      <h2 className='font-heading-4'>Oops! Page not found</h2>
      <p className='font-body-1 font-medium mt-4 mb-8'>Sorry, the page you&apos;re looking for doesn&apos;t exist</p>
      <Button
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.MEDIUM}
        buttonBackground={ButtonBackground.ORANGE}
        labelColour={LabelColour.WHITE}
        handleClick={() => { window.location.href = '/' }}
      >Go Home
      </Button>
      <a className='flex justify-center items-center mt-4 text-white text-md hover:bg-red/75 bg-red text-center rounded-lg font-heading-7 text-sm duration-500 w-[120px] h-[38px]' target='_blank' href={`https://teams.microsoft.com/l/chat/0/0?users=${Admin.EMAIL}&topicName=Aperture Feedback&message=Hey ${Admin.FIRST_NAME}, I was using Aperture when I received a 'Page Not Found' error when I was...`} rel='noreferrer'>
            Let Us Know
      </a>
    </div>
  </div>
))

export default Custom404
