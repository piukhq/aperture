import usePermissions from 'hooks/usePermissions'
import React, {ReactNode} from 'react'
import {UserPermissions} from 'utils/enums'

type Props = {
  icon: ReactNode,
  label: string,
  handleClick: VoidFunction,
  isRed?:boolean
  requiredPermission?: UserPermissions
}

const OptionsMenuItem = ({handleClick, icon, label, isRed = false, requiredPermission}: Props) => {

  const {hasRequiredPermission} = usePermissions()
  if (requiredPermission && !hasRequiredPermission(requiredPermission)) {
    return null
  }

  return (
    <button
      className={`font-subheading-3 flex items-center gap-[10px] h-[15px] my-1 ${isRed ? 'text-red' : 'text-grey-700 dark:text-grey-200'}`}
      onClick={handleClick}>
      <span className='w-[20px] flex items-center'>{icon}</span>{label}
    </button>
  )
}

export default OptionsMenuItem
