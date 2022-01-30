import Link from 'next/link'
import {useRouter} from 'next/router'
import {ReactNode} from 'react'
interface NavigationItemType {
  path: string,
  label: string,
  svgIcon: ReactNode,
}
const NavigationItem = ({
  path,
  label,
  svgIcon,
}: NavigationItemType) => {

  const {asPath} = useRouter()
  const isCurrentPage = asPath === path
  const getClasses = () => { // Simple switch concept, not efficient but simple to do.
    return isCurrentPage ? 'flex gap-4 items-center px-[10px] w-[200px] h-[52px] font-heading font-medium text-sm tracking-[0.1px] text-blue dark:text-grey-100 border-l-4 border-l-blue dark:border-l-white'
      : 'flex gap-4 items-center px-[10px] w-[200px] h-[52px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 border-l-4 border-l-transparent hover:text-blue'
  }

  return (
    <li className='list-none w-[250px] h-[71px] flex items-center'>
      <Link href={path} passHref>
        <button className={getClasses()}>
          {svgIcon}
          {label}
        </button>
      </Link>
    </li>

  )
}

export default NavigationItem
