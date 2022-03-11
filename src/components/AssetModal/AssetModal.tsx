import {useState} from 'react'
import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchWhiteSvg from 'icons/svgs/search-white.svg'
import DownloadSvg from 'icons/svgs/download.svg'

import {useAppSelector} from 'app/hooks'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'

import {getSelectedAssetEnvironment, getSelectedAssetGroup} from 'features/planAssetsSlice'

const AssetModal = () => {
  const [imageDimensions, setImageDimensions] = useState(null)
  const imageClasses = imageDimensions ? 'opacity-100 transition-opacity duration-500' : 'opacity-0 transition-opacity'

  const selectedAssetEnvironment = useAppSelector(getSelectedAssetEnvironment)
  const selectedAssetGroup = useAppSelector(getSelectedAssetGroup)

  const selectedAsset = selectedAssetGroup[selectedAssetEnvironment]
  const {hasMultipleImagesOfThisType, typeIndex, image, heading, isError} = selectedAsset
  const {id, url, description, encoding} = image

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
    )
  }

  const renderAssetimage = () => {
    if (isError) {
      return <AssetErrorSVG className='h-[22px] w-[22px]' />
    }
    return (
      <Image
        className={imageClasses}
        src={url}
        width={imageDimensions?.naturalWidth || 520}
        height={imageDimensions?.naturalWeight || 280}
        objectFit='contain'
        alt={description || heading}
        onLoadingComplete={(imageDimensions) => setImageDimensions(imageDimensions)}/>
    )
  }

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
          {renderAssetimage()}
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton('-rotate-90')}
        </div>
      </div>
    ) }

  const renderAssetDetails = () => {
    const urlArray = url.split('/')
    const filename = urlArray[urlArray.length - 1]
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

  const renderButtons = () => (
    <div className='flex justify-end gap-[20px] mb-[24px]'>
      <a href={`https://api.${selectedAssetEnvironment}.gb.bink.com/admin/scheme/schemeimage/${id}/change/`}
        className='min-h-[38px] w-max rounded-[10px] flex items-center justify-center whitespace-nowrap gap-2 px-[12px] bg-blue text-grey-100 font-medium font-heading tracking-[0.6px] text-sm' // Refactor to an @apply if used elsewhere
        target='_blank'
        rel='noreferrer'
      >
        <SearchWhiteSvg />View in Django
      </a>
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <DownloadSvg/>Download
      </Button>
    </div>
  )

  return (
    <Modal modalHeader={`${heading} ${hasMultipleImagesOfThisType ? typeIndex + 1 : ''} Asset ${id}${isError ? ' could not load' : ''}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {!isError && renderAssetDetails()}
      {renderJSONSection()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
