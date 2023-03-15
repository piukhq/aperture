import type {NextPage} from 'next'
import Link from 'next/link'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {ApertureHeader} from 'components'
import {Admin} from 'utils/enums'

const Custom404: NextPage = withPageAuthRequired(() => (
  <div className='w-full flex-col justify-center items-center gap-4 overflow-hidden'>
    <ApertureHeader />
    <div className={'flex flex-col gap-4 items-center'}>
      <h2 className='font-heading-4'>Oops! Page not found</h2>
      <p className='font-body-1 font-medium mt-4 mb-8'>Sorry, the page you&apos;re looking for doesn&apos;t exist</p>
      <Link href='/' passHref >
        <p className='flex justify-center items-center mt-4 text-white text-md hover:bg-orange/75 bg-orange text-center rounded-lg font-heading-7 text-sm duration-500 w-[120px] h-[38px] pointer-cursor'>Go Home</p>
      </Link>
      <a className='flex justify-center items-center mt-4 text-white text-md hover:bg-red/75 bg-red text-center rounded-lg font-heading-7 text-sm duration-500 w-[120px] h-[38px]' target='_blank' href={`https://teams.microsoft.com/l/chat/0/0?users=${Admin.EMAIL}&topicName=Aperture Feedback&message=Hey ${Admin.FIRST_NAME}, I was using Aperture when I received a 'Page Not Found' error when I was...`} rel='noreferrer'>
            Let Us Know
      </a>
    </div>
  </div>
))

export default Custom404
