import {useState} from 'react'
import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchWhiteSvg from 'icons/svgs/search-white.svg'
import DownloadSvg from 'icons/svgs/download.svg'
import {useAppSelector} from 'app/hooks'
import {getSelectedAssetId, getSelectedAssetGroup} from 'features/planAssetsSlice'
import {PlanAsset} from 'types'
import downloadAsset from 'services/downloadAsset'

const AssetModal = () => {
  const [imageDimensions, setImageDimensions] = useState(null)
  const imageClasses = imageDimensions ? 'opacity-100 transition-opacity duration-500' : 'opacity-0 transition-opacity'

  const selectedAssetId = useAppSelector(getSelectedAssetId)
  const selectedAssetGroup = useAppSelector(getSelectedAssetGroup)
  const assetEnvironments = Object.values(selectedAssetGroup)

  const selectedAsset:PlanAsset = assetEnvironments.find(env => env?.image?.id === selectedAssetId) // Determine which of the group to be displayed

  const {hasMultipleImagesOfThisType, typeIndex, image, heading} = selectedAsset
  const {id, url, description, encoding} = image

  const urlArray = url.split('/')
  const filename = urlArray[urlArray.length - 1]

  console.log(selectedAssetGroup.staging)
  const renderEnvironmentTags = () => {
    const renderNoTag = () => <div className='w-[12px]'></div>

    return (
      <div className='mb-[12px]'>
        <h3 className='font-heading-9'>Environment</h3>
        <div className='flex gap-[8px] pt-[7px] mb-[12px]'>
          {selectedAssetGroup.dev ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='D' /> : renderNoTag()}
          {selectedAssetGroup.staging ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='S' /> : renderNoTag()}
        </div>
      </div>
    ) }

  const renderImageSection = () => {
    const isUniqueAcrossEnvironments = Object.values(selectedAssetGroup).filter(env => env?.image?.id).length === 1
    const renderNavigationButton = rotation => (
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonWidth={Button.buttonWidth.TINY}
        buttonSize={Button.buttonSize.TINY}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
      >
        <ArrowDownSvg fill='white' className={`${rotation} scale-75`} />
      </Button>
    )

    return (
      <div className='w-full h-[280px] flex mb-[12px]'>
        <div className='w-[50px] h-full flex items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton('rotate-90')}
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <Image
            className={imageClasses}
            src={url}
            width={imageDimensions?.naturalWidth || 520}
            height={imageDimensions?.naturalWeight || 280}
            objectFit='contain'
            alt={description || heading}
            onLoadingComplete={(imageDimensions) => setImageDimensions(imageDimensions)}/>
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton('-rotate-90')}
        </div>
      </div>
    ) }

  const renderAssetDetails = () => {
    return (
      <div className='mb-[12px]'>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Dimensions</span>
          <span className='font-body-3'>{imageDimensions && `${imageDimensions.naturalWidth} x ${imageDimensions.naturalHeight}`}</span>
        </div>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Filetype</span>
          <span className='font-body-3'>{encoding.toLocaleUpperCase()}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-heading-7'>Filename</span>
          <span className='font-body-3'>{filename}</span>
        </div>
      </div>
    ) }


  const renderJSONSection = () => {
    const JSONImage = JSON.stringify(image).split(/[,{}]+/)
    const renderLineNumbers = () => JSONImage.map((_, index) => <span key={index} >{index + 1}</span>)
    const renderJson = () => JSONImage.map((line, index) => {
      let prefix = ' '
      if (index === 0) {
        prefix = '{'
      } else if (index === JSONImage.length - 1) {
        prefix = '}'
      }
      return <span key={index}>{prefix} {line}</span>
    })

    return (
      <div className='h-[212px] mb-[24px] overflow-auto'>
        <pre className='bg-grey-200 flex text-xs text-grey-800'>
          <div className='flex flex-col basis-[3%] py-[5px] gap-1 bg-grey-300 text-center '>
            {renderLineNumbers()}
          </div>
          <div className='flex flex-col basis-[97%] p-[5px] gap-1 text-left overflow-auto '>
            {renderJson()}
          </div>
        </pre>

      </div>
    )
  }

  const handleDownload = () => {
    downloadAsset(url, filename)
  }

  const renderButtons = () => (
    <div className='flex justify-end gap-[20px] mb-[24px]'>
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      >
        <SearchWhiteSvg />View in Django
      </Button>
      <Button
        handleClick={handleDownload}
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      >
        <DownloadSvg/>Download
      </Button>
    </div>
  )

  return (
    <Modal modalHeader={`${heading} ${hasMultipleImagesOfThisType ? typeIndex + 1 : ''} Asset ${id}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSONSection()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
