import {useState} from 'react'
import {Modal, Button} from 'components'
import {ModalStyle} from 'utils/enums'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryMids} from 'types'

type Props = {
  checkedMidsArray: DirectoryMids
}

const DirectoryMidModal = ({checkedMidsArray}:Props) => {
  const [errorMessage, setErrorMessage] = useState('')
  // const [isDeleting, setIsDeleting] = useState(false)

  const midLabel = checkedMidsArray.length > 1 ? 'MIDs' : 'MID'

  const handleDeleteButtonClick = () => {
    console.log('isDeleting')
    setErrorMessage('hello')
  }

  const renderMidList = () => {
    return checkedMidsArray.map(mid => (
      <li className='font-bold' key={mid.mid_ref}>{mid.mid_metadata.mid}</li>
    ))
  }


  console.log('checkedMidsArray', checkedMidsArray)
  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`Delete ${midLabel}`} onCloseFn={() => console.log('do somethign resetty here')}>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p>Are you sure you want to <strong>delete</strong> the following {midLabel}:</p>
        <ul>
          {renderMidList()}
        </ul>
        <p>{midLabel} will also be offboarded from Harmonia</p>
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={handleDeleteButtonClick}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.RED}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >Delete {midLabel}
        </Button>
      </section>

    </Modal>
  )
}

export default DirectoryMidModal
