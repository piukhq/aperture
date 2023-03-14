import {Button, PaymentCardIcon} from 'components'
import {ButtonType, ButtonSize, ButtonWidth, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import Modal from 'components/Modal/Modal'
import {setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {getHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {HarmoniaActionTypes, ModalStyle} from 'utils/enums'
import {useRouter} from 'next/router'
import {DirectoryMerchantEntitySelectedItem} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'

const DirectoryHarmoniaModal = () => {
  enum RouterEntityLabel {
    'mids' = 'MID',
    'secondary-mids'= 'Secondary MID',
    'psimis'= 'PSIMI',
  }
  const {tab} = useRouter().query
  const selectedEntities = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const hasMultipleEntities = selectedEntities.length > 1
  const entityLabel = `${RouterEntityLabel[tab as string]}${hasMultipleEntities ? 's' : ''}`


  const dispatch = useAppDispatch()
  const errorMessage = '' // Placeholder for functionality to be added

  const harmoniaAction = useAppSelector(getHarmoniaActionType)
  const harmoniaActionCapitalised = capitaliseFirstLetter(harmoniaAction)

  const renderListItem = (listItem: DirectoryMerchantEntitySelectedItem) => {
    const {entityRef, entityValue, paymentSchemeSlug} = listItem

    return (
      <li className='font-bold flex items-center gap-[2px]' key={entityRef}>
        {entityValue}
        {paymentSchemeSlug && (
          <PaymentCardIcon
            paymentSchemeSlug={paymentSchemeSlug}
            paymentSchemeIconStyles='flex w-[20px] h-[15px] justify-center mx-[2px] items-center'
          />
        )}
      </li>
    )
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`${harmoniaActionCapitalised} ${entityLabel}` } onCloseFn={() => dispatch(setSelectedDirectoryEntityCheckedSelection([]))}>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>{harmoniaAction}</strong> the following {entityLabel}:</p>
        <ul>
          {selectedEntities.map(entity => renderListItem(entity))}
        </ul>
        {harmoniaAction === HarmoniaActionTypes.UPDATE && <p>{hasMultipleEntities ? '' : 'This '}{entityLabel} will be updated in Harmonia to include current location links and metadata</p>}
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={() => console.log('Doing nothing for now')}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={harmoniaAction === HarmoniaActionTypes.OFFBOARD ? ButtonBackground.RED : ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >{`${harmoniaActionCapitalised} ${entityLabel}`}
        </Button>
      </section>
    </Modal>
  )
}

export default DirectoryHarmoniaModal
