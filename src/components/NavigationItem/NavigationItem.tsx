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
    return isCurrentPage ? 'flex gap-4 items-center px-[10px] w-[200px] h-[52px] font-heading font-medium text-sm tracking-[0.1px] text-blue dark:text-grey-500 border-l-4 border-l-blue'
      : 'flex gap-4 items-center px-[10px] my-[20px] w-[200px] h-[52px] font-heading font-medium text-sm tracking-[0.1px] text-grey-900 dark:text-grey-500 border-l-4 border-l-white hover:text-blue'
  }

  return (
    <li className='bg-white list-none w-[250px] h-[71px]'>
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
