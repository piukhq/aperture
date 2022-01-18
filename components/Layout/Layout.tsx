import Link from 'next/link'
import Image from 'next/Image'

export default function Layout({children}){
  return (
    <div className='flex flex-none h-full min-h-screen'>
      <nav className='flex flex-col items-center bg-white w-24 shrink-0 sticky top-0 drop-shadow-lg'>
        <ul className='flex flex-col items-center shrink-0 sticky top-0'>
          <li>
            <Link href='/' passHref>Home</Link>
          </li>
          <li>
            <Link href='/style-guide' passHref>
              <button className='flex justify-start items-center w-20 h-12 bg-grey-500 rounded-xl'>Style Guide</button>
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