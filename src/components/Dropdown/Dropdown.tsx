import {classNames} from 'utils/classNames'
import {Listbox} from '@headlessui/react'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'

type Props = {
  label?: string
  displayValue: string
  displayValues: string[]
  hasShadow?: boolean
  onChangeDisplayValue: (displayValue: string) => void
  selectedValueStyles?: string
}

const Dropdown = ({label, displayValue, displayValues, onChangeDisplayValue, hasShadow, selectedValueStyles = ''}: Props) => (
  <Listbox as='div' value={displayValue} onChange={onChangeDisplayValue}
    className='flex h-full w-auto'
  >
    {({open}) => (
      <div className='relative w-full'>
        <Listbox.Button className={classNames(
          'flex flex-row items-center w-full pl-[12px] text-grey-600 h-full bg-white dark:bg-grey-825 rounded-[10px] justify-between',
          open && 'rounded-none rounded-t-[10px]',
          hasShadow ? 'shadow-md' : 'border-[1px] border-grey-500 dark:border-grey-700',
        )}
        >
          {label && (
            <Listbox.Label className='font-subheading-5 mr-[7px]'>{label}:</Listbox.Label>
          )}
          <span className={classNames(
            'font-subheading-3 font-medium truncate',
            selectedValueStyles
          )}>{displayValue}</span>

          <div className='flex justify-center items-center min-w-[28px] ml-[42px] h-full border-l border-grey-200 dark:border-grey-800'>
            <TriangleDownSvg className={classNames(open && 'rotate-180')} />
          </div>
        </Listbox.Button>

        {open && (
          <Listbox.Options static className={classNames(
            'absolute z-10 w-full bg-white dark:bg-grey-825 rounded-b-[10px] overflow-y-auto max-h-[200px]',
            hasShadow ? 'shadow-md' : 'border-b-[1px] border-l-[1px] border-r-[1px] border-grey-500 dark:border-grey-700',
          )}
          >
            {displayValues.filter(filteredValue => filteredValue !== displayValue).map((value) => (
              <Listbox.Option
                key={value}
                value={value}
                className='py-[7px] pl-[7px] cursor-pointer font-subheading-3 font-medium'
              >
                {value}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        )}
      </div>
    )}
  </Listbox>
)

export default Dropdown
