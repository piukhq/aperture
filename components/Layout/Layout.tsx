import Link from 'next/link'
import Image from 'next/Image'

export default function Layout({children}){
  return (
    <div className='flex flex-none h-full min-h-screen'>
      <nav className='flex flex-col items-center bg-white w-72 shrink-0 sticky top-0 drop-shadow-lg'>
        <ul className='flex flex-col items-center shrink-0 sticky top-0'>
          <li>
            <Link href='/' passHref>
              <Image src='/images/menu-bink.png' width='280' height='200' alt='Home' />
            </Link>
          </li>
          <li>
            <Link href='/design' passHref>
              <button className='flex justify-start items-center w-60 h-12 bg-primaryGreen/12 text-primaryGreen font-semibold rounded-xl'>
                <span className='px-3 pt-2'><Image src='/images/menu-assets.png'alt='' height='18' width='23' /></span><span>Design system - dev only</span>
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}