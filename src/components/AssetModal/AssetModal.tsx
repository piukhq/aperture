import {useState} from 'react'
import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchWhiteSvg from 'icons/svgs/search-white.svg'
import DownloadSvg from 'icons/svgs/download.svg'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {setSelectedAssetEnvironment} from 'features/planAssetsSlice'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'
import downloadAsset from 'services/downloadAsset'
import {getSelectedAssetEnvironment, getSelectedAssetGroup} from 'features/planAssetsSlice'
import {classNames} from 'utils/classNames'
import {EnvironmentName, EnvironmentShortName} from 'utils/enums'
import {TagStyle, TagSize, TextStyle} from 'components/Tag/styles'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'

const AssetModal = () => {
  const dispatch = useAppDispatch()
  const [imageDimensions, setImageDimensions] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = imageDimensions ? 'opacity-100 transition-opacity duration-500' : 'opacity-0 transition-opacity'

  const selectedAssetEnvironment = useAppSelector(getSelectedAssetEnvironment)
  const selectedAssetGroup = useAppSelector(getSelectedAssetGroup)

  const selectedAsset = selectedAssetGroup[selectedAssetEnvironment]
  const {hasMultipleImagesOfThisType, typeIndex, image, heading, environment} = selectedAsset
  const {id, url, description, encoding} = image

  const urlArray = url.split('/')
  const filename = urlArray[urlArray.length - 1]

  const shouldRenderEnvironmentTag = (envKey: string) => {
    if (selectedAssetGroup[envKey]) {
      // TODO: This line will need refactoring when there are more than 2 environments
      const [tagStyle, label, tooltip] = envKey === EnvironmentShortName.DEV
        ? [TagStyle.AQUAMARINE_FILLED, 'D', EnvironmentName.DEV]
        : [TagStyle.YELLOW_FILLED, 'S', EnvironmentName.STAGING]
      return (
        <div title={tooltip} className={classNames(
          'flex justify-center items-center h-[28px] w-[28px] rounded-[14px]',
          environment === envKey && 'border border-black dark:border-white'
        )}>
          <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} tagStyle={tagStyle} label={label} />
        </div>
      )
    }
    return <div className='w-[12px]' />
  }

  const renderEnvironmentTags = () => (
    <div className='mb-[12px]'>
      <h3 className='font-heading-9'>Environment</h3>
      <div className='flex gap-[8px] pt-[4px] mb-[12px]'>
        {Object.keys(selectedAssetGroup).map((envKey: string) => (
          <div key={envKey}>
            {shouldRenderEnvironmentTag(envKey)}
          </div>
        ))}
      </div>
    </div>
  )


  const renderAssetImage = () => {

    const handleOnLoadingComplete = (imageDimensions) => {
      setImageDimensions(imageDimensions)
      setIsLoading(false)
    }
    if (isError) {
      return (
        <AssetErrorSVG className='h-[22px] w-[22px]' />
      )
    }
    return (
      <Image
        className={imageClasses}
        src={url}
        width={imageDimensions?.naturalWidth || 520}
        height={imageDimensions?.naturalWeight || 280}
        objectFit='contain'
        alt={description || heading}
        onLoadingComplete={(imageDimensions) => handleOnLoadingComplete(imageDimensions)}
        onError={() => setIsError(true)}/>
    )
  }

  const renderImageSection = () => {
    const assetArray = Object.values(selectedAssetGroup)
    const isUniqueAcrossEnvironments = assetArray.filter(asset => asset !== null).length === 1
    enum NavigationDirection {
      LEFT = 'rotate-90',
      RIGHT = '-rotate-90'
    }

    const handleNavigationButtonClick = navigationDirection => {
      const currentAssetIndex = assetArray.findIndex(asset => asset.environment === selectedAssetEnvironment)
      const lastAssetIndex = assetArray.length - 1

      let newEnvironment
      if (navigationDirection === NavigationDirection.LEFT) {
        newEnvironment = currentAssetIndex === 0 ? assetArray[lastAssetIndex].environment : assetArray[currentAssetIndex - 1].environment
      } else {
        newEnvironment = currentAssetIndex === lastAssetIndex ? assetArray[0].environment : assetArray[currentAssetIndex + 1].environment
      }
      dispatch(setSelectedAssetEnvironment(newEnvironment))
      setIsError(false)
      setIsLoading(true)
    }

    const renderNavigationButton = navigationDirection => (
      <Button
        handleClick={() => handleNavigationButtonClick(navigationDirection)} // TODO: Placeholder for future ticket
        buttonWidth={ButtonWidth.TINY}
        buttonSize={ButtonSize.TINY}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
      >
        <ArrowDownSvg fill='white' className={`${navigationDirection} scale-75`} />
      </Button>
    )

    return (
      <div className='w-full h-[280px] flex mb-[12px]'>
        <div className='w-[50px] h-full flex items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton(NavigationDirection.LEFT)}
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          {renderAssetImage()}
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton(NavigationDirection.RIGHT)}
        </div>
      </div>
    ) }


  const renderAssetDetails = () => {
    if (isError || isLoading) {
      return (
        <div className='mb-[12px] min-h-[76px]'></div>
      )
    }
    return (
      <div className='mb-[12px] min-h-[76px]'>
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
    )
  }


  const renderJSONSection = () => {
    const JSONImage = JSON.stringify(image).split(/[,{}]+/)
    const renderLineNumbers = () => JSONImage.map((_, index) => <span aria-hidden='true' key={index} >{index + 1}</span>)
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
      <a href={`https://api.${selectedAssetEnvironment}.gb.bink.com/admin/scheme/schemeimage/${id}/change/`}
        className='min-h-[38px] w-max rounded-[10px] flex items-center justify-center whitespace-nowrap gap-2 px-[12px]
        bg-blue text-grey-100 font-medium font-heading tracking-[0.6px] text-sm' // Refactor to an @apply if used elsewhere
        target='_blank'
        rel='noreferrer'
      >
        <SearchWhiteSvg />View in Django
      </a>
      <Button
        handleClick={handleDownload}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
      >
        <DownloadSvg/>Download
      </Button>
    </div>
  )

  return (
    <Modal modalHeader={`${heading} ${hasMultipleImagesOfThisType ? typeIndex + 1 : ''} Asset ${id}${isError ? ' could not load' : ''}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSONSection()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
