import Link from 'next/link'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'

interface NavigationItemType {
  path: string,
  iconPath: string,
  label: string,
}
const NavigationItem = ({
  path,
  iconPath,
  label,
}: NavigationItemType) => {

  // something to check URL matches path to set always blue
  const {asPath} = useRouter()
  const isCurrentPage = asPath === path

  const IconSvg = dynamic(() => import(iconPath))

  console.log(iconPath)

  const getClasses = () => {
    return isCurrentPage ? 'flex items-center my-[20px] w-[200px] h-[32px] bg-white font-heading font-medium text-sm tracking-[0.1px] text-blue dark:text-grey-500 border-l-4 border-l-blue '
      : 'flex items-center w-[200px] h-[32px] bg-white font-heading font-medium text-sm tracking-[0.1px] text-grey-800 dark:text-grey-500 rounded-xl'
  }

  return (
    <div className='bg-white'>
      <Link href={path} passHref>
        <button className={getClasses()}>
          < IconSvg />{label}
        </button>
      </Link>
    </div>

  )
}

export default NavigationItem
