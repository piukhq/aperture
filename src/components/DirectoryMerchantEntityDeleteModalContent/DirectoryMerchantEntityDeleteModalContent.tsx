import {Button, Tag} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {useAppDispatch} from 'app/hooks'
import {ModalType} from 'utils/enums'
import {requestModal} from 'features/modalSlice'
import {useCallback, useEffect, useState} from 'react'
import {DirectoryMerchantEntityDeletionItem, RTKQueryErrorResponse} from 'types'
import {setSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'


type Props = {
  entityLabel: string,
  entitiesToBeDeleted: DirectoryMerchantEntityDeletionItem[],
  deleteButtonClickFn: () => void,
  deleteError: RTKQueryErrorResponse,
  isDeleteLoading: boolean,
  isDeleteSuccess: boolean,
  isHarmoniaEntity?: boolean,
  resetDeleteResponseFn: () => void,
}

const DirectoryMerchantEntityDeleteModalContent = ({
  entityLabel,
  entitiesToBeDeleted,
  deleteButtonClickFn,
  deleteError,
  isDeleteLoading,
  isDeleteSuccess,
  resetDeleteResponseFn,
  isHarmoniaEntity,
}: Props) => {
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = useState('')

  const handleDeleteError = useCallback(() => {
    const {data} = deleteError
    setErrorMessage(data.detail[0].msg)
  }, [deleteError])

  useEffect(() => {
    if (deleteError) {
      handleDeleteError()
    } else if (isDeleteSuccess) {
      resetDeleteResponseFn()
      dispatch(setSelectedDirectoryTableCheckedRows([]))
      dispatch(requestModal(ModalType.NO_MODAL))
    }
  }, [deleteError, dispatch, handleDeleteError, isDeleteSuccess, resetDeleteResponseFn])

  return (
    <>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>delete</strong> the following {entityLabel}:</p>
        <ul>
          {entitiesToBeDeleted.map(entity => (
            <li className='font-bold' key={entity.entityRef}>{entity.entityValue}</li>
          ))}
        </ul>
        {isHarmoniaEntity && <p>{entityLabel} will also be offboarded from Harmonia</p>}
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        {isDeleteLoading ? (
          <Tag
            tagSize={TagSize.MEDIUM}
            textStyle={TextStyle.MEDIUM}
            textColour={TextColour.WHITE}
            tagStyle={TagStyle.RED_FILLED}
            label='Deleting...'
          />
        ) : (
          <Button
            handleClick={deleteButtonClickFn}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.LARGE}
            buttonBackground={ButtonBackground.RED}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          >{`Delete ${entityLabel}`}
          </Button>
        )}
      </section>
    </>
  )
}


export default DirectoryMerchantEntityDeleteModalContent
