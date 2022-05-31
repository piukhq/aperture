import {classNames} from 'utils/classNames'
import {Listbox} from '@headlessui/react'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'

type Props = {
  label?: string
  displayValue: string
  displayValues: string[]
  onChangeDisplayValue: (displayValue: string) => void
}

const Dropdown = ({label, displayValue, displayValues, onChangeDisplayValue}: Props) => (
  <Listbox as='div' value={displayValue} onChange={onChangeDisplayValue}
    className='flex h-full w-[200px] justify-center'
  >
    {({open}) => (
      <div className='relative'>
        <Listbox.Button className={classNames(
          'flex flex-row items-center w-auto pl-[12px] text-grey-600 h-full bg-white dark:bg-grey-850 rounded-[10px] shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]',
          open && 'rounded-none rounded-t-[10px]',
        )}
        >
          {label && (
            <Listbox.Label className='font-subheading-5 mr-[7px]'>{label}:</Listbox.Label>
          )}
          <span className='w-auto font-subheading-3 font-medium'>{displayValue}</span>
          <div className='flex justify-center items-center w-[28px] ml-[57px] h-full border-l border-grey-200 dark:border-grey-800'>
            <TriangleDownSvg className={classNames(open && 'rotate-180')} />
          </div>
        </Listbox.Button>

        {open && (
          <Listbox.Options static className='absolute z-10 w-full bg-white dark:bg-grey-850 rounded-b-[10px] shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
            {displayValues.map((value) => (
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
