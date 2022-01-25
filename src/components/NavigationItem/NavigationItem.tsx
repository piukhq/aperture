import Link from 'next/link'
import {useRouter} from 'next/router'
interface NavigationItemType {
  path: string,
  label: string,
  children: any,
}
const NavigationItem = ({
  path,
  label,
  children
}: NavigationItemType) => {

  // something to check URL matches path to set always blue
  const {asPath} = useRouter()
  const isCurrentPage = asPath === path
  const getClasses = () => {
    return isCurrentPage ? 'flex gap-4 items-center px-[10px] my-[20px] w-[200px] h-[32px] font-heading font-medium text-sm tracking-[0.1px] text-blue dark:text-grey-500 border-l-4 border-l-blue'
      : 'flex gap-4 items-center px-[10px] my-[20px] w-[200px] h-[32px] font-heading font-medium text-sm tracking-[0.1px] dark:text-grey-500 border-l-4 border-l-white hover:text-blue'
  }

  return (
    <li className='bg-white list-none'>
      <Link href={path} passHref>
        <button className={getClasses()}>
          {children}
          {label}
        </button>
      </Link>
    </li>

  )
}

export default NavigationItem
