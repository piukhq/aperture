import React, {useState, useRef} from 'react'
import Dropdown from 'components/Dropdown'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button'
import {ButtonBackground, ButtonSize, ButtonType, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'
import {ModalStyle} from 'utils/enums'
import UploadSVG from 'icons/svgs/upload.svg'

type Props = {
  isPlanLevelFileUpload?: boolean
}

const DirectoryFileUploadModal = ({isPlanLevelFileUpload}:Props) => { // TODO: Add functionality as required by later tickets
  const [file, setFile] = useState(null)
  const fileTypes = isPlanLevelFileUpload ? ['Merchant Details', 'Long file', 'MID & Secondary MID'] : ['Long file', 'MID & Secondary MID']
  const [fileType, setFileType] = useState(fileTypes[0])
  const fileInputRef = useRef(null) // Default file upload input is hidden and assigned to this ref to trigger file browser

  const fileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setFile(e.dataTransfer.files[0])
  }

  const handleFileBrowser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    files && files.length > 0 && setFile(files[0])
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      console.log(`Placeholder: Submitting ${fileType} file...`)
      console.log(file)
    }
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='File Upload'>
      <form className='pt-[15px] px-[15px]' onSubmit={(e) => handleFormSubmit(e)}>
        <section className='flex flex-col mb-[20px]'>
          <label className='font-modal-heading'>FILE TYPE</label>
          <div className='w-[277px] h-[28px]'>
            <Dropdown
              displayValue={fileType}
              displayValues={fileTypes}
              onChangeDisplayValue={setFileType}
              selectedValueStyles='font-normal text-grey-600'
            />
          </div>
        </section>

        <section className='flex items-center justify-center h-[295px] w-[420px] border border-grey-300 dark:border-grey-700 rounded-[10%] mb-[15px]'
          onDrop={fileDrop}
        >
          <div className='h-[269px] w-[386px] border border-grey-200 bg-grey-100 dark:border-grey-700 dark:bg-grey-825 rounded-[10%]'>
            <div className='flex flex-col items-center justify-center h-full'>
              <UploadSVG/>
              <label className='font-modal-heading mt-[7px] mb-[12px]'>Drag and drop file here or</label>
              <input className='hidden' type='file' id='file' name='file' ref={fileInputRef} onChange={handleFileBrowser} multiple={false}/>
              <Button
                buttonType={ButtonType.SUBMIT}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
                ariaLabel={'Browse'}
                handleClick={() => fileInputRef.current.click()}
              >Browse
              </Button>
            </div>
          </div>
        </section>

        <section className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[14px]'>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Upload'}
          >Upload
          </Button>
        </section>
      </form>
    </Modal>
  )
}


export default DirectoryFileUploadModal
