import React, {ReactNode} from 'react'


type Props = {
  icon: ReactNode,
  label: string,
  handleClick: VoidFunction,
  isRed?:boolean
}

const OptionsMenuItem = ({handleClick, icon, label, isRed = false}: Props) => (
  <button
    className={`font-subheading-3 flex items-center gap-[10px] h-[15px] ${isRed ? 'text-red' : 'text-grey-700 dark:text-grey-200'}`}
    onClick={handleClick}>
    <span className='w-[20px] flex items-center'>{icon}</span>{label}
  </button>
)

export default OptionsMenuItem
