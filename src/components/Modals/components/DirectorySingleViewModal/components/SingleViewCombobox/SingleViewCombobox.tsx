import {Combobox, Transition} from '@headlessui/react'
import PaymentCardIcon from 'components/PaymentCardIcon'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'
import {useState, Fragment} from 'react'
import {DirectoryMerchantLocationAvailableMid, DirectorySecondaryMid, DirectoryLocation} from 'types'
import {PaymentSchemeSlug} from 'utils/enums'

type Entity = DirectoryMerchantLocationAvailableMid | DirectorySecondaryMid | DirectoryLocation | string // TODO: Consider refactor to use generics

type Props = {
  selectedEntity: Entity
  availableEntities: Entity[]
  entityValueFn?: (entity: Entity) => string
  entityPaymentSchemeSlugFn?: (entity: Entity) => string
  onChangeFn: (entity: Entity) => void
  shouldRenderPaymentCardIcon?: boolean
  entityLabel?: string
  isDisabled?: boolean
}

function SingleViewCombobox ({selectedEntity, availableEntities, entityValueFn, entityPaymentSchemeSlugFn, onChangeFn, shouldRenderPaymentCardIcon, entityLabel = 'item', isDisabled = false}: Props) {

  const [query, setQuery] = useState<string>('')

  const filteredEntities =
  query === ''
    ? availableEntities
    : availableEntities.filter((entity) => entityValueFn(entity)
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(query.toLowerCase().replace(/\s+/g, ''))
    )

  return (
    <div className='w-4/5'>
      <Combobox value={selectedEntity} onChange={onChangeFn} disabled={isDisabled}>
        <div className='relative font-body-3'>
          <div className='relative w-full cursor-default rounded-[10px] bg-white dark:bg-grey-900 text-left sm:text-sm border-[1px] border-grey-500 dark:border-grey-700'>
            <Combobox.Input
              className='w-full border-none py-2 pl-6 pr-10  dark:bg-grey-850 rounded-[10px]'
              displayValue={() => entityValueFn(selectedEntity) || '' }
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              placeholder={`Select ${entityLabel}`}
            />

            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <TriangleDownSvg
                className='h-5 w-5 text-grey-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-[10px] bg-white dark:bg-grey-825 py-1 shadow-md sm:text-sm '>
              {filteredEntities.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-grey-700'>
                      No {entityLabel}s found
                </div>
              ) : (
                filteredEntities.map((entity, index:number) => (
                  <Combobox.Option
                    key={index}
                    className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 z-20 ${
                      active ? ' bg-lightYellow dark:bg-grey-800 z-20' : 'bg-white dark:bg-grey-825'
                    }`
                    }
                    value={entity}
                  >
                    {({selected}) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          <div className='flex items-center'>
                            {shouldRenderPaymentCardIcon && (
                              <div className='w-[32px] h-[23px]'>
                                <PaymentCardIcon paymentSchemeSlug={entityPaymentSchemeSlugFn(entity) as PaymentSchemeSlug} />
                              </div>
                            )}
                            <p className='ml-[13px] font-modal-data'>
                              {entityValueFn(entity)}
                            </p>
                          </div>
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SingleViewCombobox

