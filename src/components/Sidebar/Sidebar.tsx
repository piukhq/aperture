import {useState, useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import SidebarOption from './components/SidebarOption'

const Sidebar = () => {
  const router = useRouter()
  const [selectedTool, setSelectedTool] = useState('')

  const sideOptions = ['asset-comparator', 'plan-comparator', 'mid-management', 'customer-wallets']

  useEffect(() => {
    console.log(router.pathname)
    setSelectedTool(router.pathname.substring(1))
  }, [router.pathname])

  return (
    <div className='w-64 h-full border-r-2 border-off-white-1 bg-white'>
      <div className='flex h-16 border-b border-off-white-1 pl-[25px] items-center'>
        <Image src='/icons/svgs/logo.svg' height={30} width={30} alt='' />
        <h1 className='text-off-grey-1 font-semibold text-[20px] ml-[10px]'>Bink</h1>
      </div>

      <div className='mt-6'>
        <h1 className='text-off-grey-2 font-semibold text-[14px] tracking-widest ml-5'>TOOLS</h1>

        <nav className='mt-5'>
          {sideOptions.map(option => {
            const selected = selectedTool === option
            return <SidebarOption key={option} option={option} selected={selected} />
          })}
        </nav>
      </div>
    </div>
  )
}


export default Sidebar
