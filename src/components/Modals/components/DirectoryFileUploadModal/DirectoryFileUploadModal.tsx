import React, {useState, useRef, useEffect} from 'react'
import Dropdown from 'components/Dropdown'
import Modal from 'components/Modal/Modal'
import Button from 'components/Button'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {shouldCloseHidableModal} from 'features/modalSlice'
import {BorderColour, ButtonBackground, ButtonSize, ButtonType, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'
import {ModalStyle, UserPermissions} from 'utils/enums'
import UploadSVG from 'icons/svgs/upload.svg'
import CSVSvg from 'icons/svgs/csv.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import {useDirectoryCsvUpload} from 'hooks/useDirectoryCsvUpload'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'

type Props = {
  isPlanLevelFileUpload?: boolean
}

const DirectoryFileUploadModal = ({isPlanLevelFileUpload}:Props) => {
  const {planId, merchantId} = useGetRouterQueryString()
  const dispatch = useAppDispatch()

  // set planRef and merchantRef to the selected plan and merchant if they are not available in the url
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const planRef = planId || selectedPlan.plan_ref
  const merchantRef = merchantId || selectedMerchant?.merchant_ref

  const {postCsv, postCsvError, postCsvIsSuccess} = useDirectoryCsvUpload()
  const typedPostCsvError = postCsvError as {data: {detail: [{msg: string}]}} // TODO: temporary fix for TS error, will correct in unhappy path PR when we have a proper error handling strategy

  const fileTypeLabels = isPlanLevelFileUpload ? ['Merchant Details', 'Long file', 'MID & Secondary MID'] : ['Long file', 'MID & Secondary MID'] // The strings shown in the UI

  enum ApiFileType { // The strings that the API expects
    'Merchant Details' = 'merchant_details',
    'Long file' = 'locations',
    'MID & Secondary MID' = 'identifiers',
  }

  const [file, setFile] = useState<File | null>(null)
  const [isValidFile, setIsValidFile] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [fileType, setFileType] = useState<string>('Select File Type')

  // const fileInputRef = useRef(null) // Default file upload input is hidden and assigned to this ref to trigger file browser
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (file) {
      setIsValidFile(file.type === 'text/csv')
    }
  }, [file])

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
    if(file && isValidFile) {
      postCsv({file, file_type: ApiFileType[fileType], plan_ref: planRef, merchant_ref: merchantRef})
      setIsUploading(true)
    }
  }

  const handleFileReset = () => {
    setFile(null)
    setIsValidFile(false)
  }

  const renderDefaultFileUpload = () => (
    <section className='flex items-center justify-center h-[295px] w-[420px] border border-grey-300 dark:border-grey-700 rounded-[10%] mb-[15px]'
      onDrop={fileDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className='h-[269px] w-[386px] border border-grey-200 bg-grey-100 dark:border-grey-700 dark:bg-grey-825 rounded-[10%]'>
        <div className='flex flex-col items-center justify-center h-full  '>
          {file && !isValidFile && <h2 className='font-heading-6 mb-[17px] text-grey-700 dark:text-grey-300'>Oops!</h2>}
          <UploadSVG className='fill-grey-800 dark:fill-grey-400' />
          <div className='font-heading-9  text-grey-700 dark:text-grey-300 mt-[7px] mb-[12px]'>
            {file && !isValidFile ? (
              <div className='text-center '>
                <p>The file you have selected is not supported</p>
                <label>Drag and drop a CSV here to continue or</label>
              </div>
            ) : (
              <label>Drag and drop file here or</label>
            )}
          </div>
          <input className='hidden' type='file' id='file' name='file' ref={fileInputRef} onChange={handleFileBrowser} multiple={false}/>
          <Button
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            ariaLabel={'Browse'}
            handleClick={() => fileInputRef?.current?.click()}
          >Browse
          </Button>
        </div>
      </div>
    </section>
  )

  const renderFileUploadPreview = () => {
    if(file?.size) {
      return (
        <section className='flex items-center h-[144px] w-[420px] my-[100px] border border-grey-300 dark:border-grey-700 rounded-2xl p-[25px]'>
          <CSVSvg className=''/>
          <div className='flex flex-col ml-[10px] w-3/5'>
            <label className={`${file.name.length < 25 ? 'font-heading-6' : 'font-heading-8'} font-semibold truncate`}>{file.name}</label>
            <label className='font-heading-6 font-medium text-grey-600 dark:text-grey-400'>{file.size > 1000 ? `${Math.round(file.size / 1024)}kb` : `${file.size} bytes`}</label>
          </div>
          <Button
            handleClick={handleFileReset}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.SINGLE_VIEW_MID_ICON_ONLY}
            borderColour={BorderColour.RED}
            labelColour={LabelColour.RED}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
            ariaLabel={'Remove file'}
            additionalStyles='p-1 ml-2'
          >
            <TrashSvg className='fill-red' />
          </Button>
        </section>
      )
    }
  }

  const renderUploadForm = () => (
    <form className='pt-[15px] px-[15px]' onSubmit={(e) => handleFormSubmit(e)}>
      <section className='flex flex-col mb-[20px]'>
        <h2 className='font-modal-heading'>FILE TYPE</h2>
        <div className='w-[277px] h-[28px]'>
          <Dropdown
            displayValue={fileType}
            displayValues={fileTypeLabels}
            onChangeDisplayValue={setFileType}
            selectedValueStyles='font-normal text-grey-600'
          />
        </div>
      </section>

      {file && isValidFile && renderFileUploadPreview()}
      {(!file || !isValidFile) && renderDefaultFileUpload()}

      <section className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[14px]'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.MEDIUM}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
          ariaLabel={'Upload'}
          isDisabled={!isValidFile || fileType === 'Select File Type'}
        >Upload
        </Button>
      </section>
    </form>
  )

  const renderUploadingNotification = () => {
    dispatch(shouldCloseHidableModal(true))
    return (
      <section className='font-body-3 m-4 flex flex-col gap-4'>
        <p>Upload to Bullsquid has started. Depending on the filesize, this could take a few minutes.</p>
        { typedPostCsvError && <p className='text-red'>Error: {typedPostCsvError.data?.detail[0].msg}</p> }
        { postCsvIsSuccess && <p className='text-green'>Upload successful according to Bullsquid</p>}
      </section>
    )
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`File Upload${isUploading ? 'ing' : ''}`}>
      {isUploading ? renderUploadingNotification() : renderUploadForm()}
    </Modal>
  )
}

export default DirectoryFileUploadModal
