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
import {EnvironmentName, EnvironmentShortName, ModalStyle} from 'utils/enums'
import {TagStyle, TagSize, TextStyle, TextColour} from 'components/Tag/styles'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'

const AssetModal = () => {
  const dispatch = useAppDispatch()
  const [imageDimensionsState, setImageDimensionsState] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = imageDimensionsState ? 'opacity-100 transition-opacity duration-500' : 'opacity-0 transition-opacity'

  const selectedAssetGroup = useAppSelector(getSelectedAssetGroup)
  const selectedAssetEnvironment = useAppSelector(getSelectedAssetEnvironment)

  const selectedAsset = selectedAssetGroup[selectedAssetEnvironment]
  const {hasMultipleImagesOfThisType, typeIndex, image, heading, environment} = selectedAsset
  const {id, url, description, encoding} = image

  const urlArray = url.split('/')
  const filename = urlArray[urlArray.length - 1]

  const shouldRenderEnvironmentTag = (envKey: string) => {
    if (selectedAssetGroup[envKey]) {
      const environmentTagValues = {
        [EnvironmentShortName.DEV]: {
          tagStyle: TagStyle.AQUAMARINE_FILLED,
          label: 'D',
          tooltip: EnvironmentName.DEV,
        },
        [EnvironmentShortName.STAGING]: {
          tagStyle: TagStyle.YELLOW_FILLED,
          label: 'S',
          tooltip: EnvironmentName.STAGING,
        },
        [EnvironmentShortName.PROD]: {
          tagStyle: TagStyle.RED_FILLED,
          label: 'P',
          tooltip: EnvironmentName.PROD,
        },
      }

      const {tagStyle, label, tooltip} = environmentTagValues[envKey]

      return (
        <div title={tooltip} className={classNames(
          'flex justify-center items-center h-[28px] w-[28px] rounded-[14px]',
          environment === envKey && 'border border-black dark:border-white'
        )}>
          <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} textColour={TextColour.GREY} tagStyle={tagStyle} label={label} />
        </div>
      )
    }
    return <div className='w-[12px]' />
  }

  const renderEnvironmentTags = () => (
    <div className='mb-[12px]'>
      <h2 className='font-heading-9'>Environment</h2>
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
      setImageDimensionsState(imageDimensions)
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
        width={imageDimensionsState?.naturalWidth || 520}
        height={imageDimensionsState?.naturalWeight || 280}
        objectFit='contain'
        alt={description || heading}
        onLoadingComplete={(imageDimensions) => handleOnLoadingComplete(imageDimensions)}
        onError={() => setIsError(true)}
      />
    )
  }

  const renderImageSection = () => {
    const assetArray = Object.values(selectedAssetGroup).filter(asset => asset)
    const isUniqueAcrossEnvironments = assetArray.filter(asset => asset !== null).length === 1
    enum NavigationDirection {
      LEFT = 'rotate-90',
      RIGHT = '-rotate-90'
    }

    const handleNavigationButtonClick = navigationDirection => {
      const currentAssetIndex = assetArray.findIndex(asset => asset?.environment === selectedAssetEnvironment)
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

    const renderNavigationButton = (navigationDirection, label) => (
      <Button
        handleClick={() => handleNavigationButtonClick(navigationDirection)}
        buttonWidth={ButtonWidth.TINY}
        buttonSize={ButtonSize.TINY}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        ariaLabel={`${label} Environment`}
        autoFocus = {navigationDirection === NavigationDirection.RIGHT ? true : false}
      >
        <ArrowDownSvg fill='white' className={`${navigationDirection} scale-75`} />
      </Button>
    )

    return (
      <div className='w-full h-[280px] flex mb-[12px]'>
        <div className='w-[50px] h-full flex items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton(NavigationDirection.LEFT, 'Previous')}
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          {renderAssetImage()}
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton(NavigationDirection.RIGHT, 'Next')}
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
      <div className='mb-[12px] min-h-[76px]' data-testid='asset-details'>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Dimensions</span>
          <span className='font-body-3'>{imageDimensionsState && `${imageDimensionsState.naturalWidth} x ${imageDimensionsState.naturalHeight}`}</span>
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
          <div className='flex flex-col basis-[3%] py-[5px] gap-1 bg-grey-300 text-center' data-testid='line-numbers'>
            {renderLineNumbers()}
          </div>
          <div className='flex flex-col basis-[97%] p-[5px] gap-1 text-left overflow-auto' data-testid='json-block' tabIndex={0}>
            {renderJson()}
          </div>
        </pre>
      </div>
    )
  }

  const handleDownload = () => {
    downloadAsset(url, filename)
  }

  const renderButtons = () => {
    const djangoUrlEnvValue = selectedAssetEnvironment === EnvironmentShortName.PROD ? '' : `${selectedAssetEnvironment}.`

    return (
      <div className='flex justify-end gap-[20px] mb-[24px]'>
        <a href={`https://api.${djangoUrlEnvValue}gb.bink.com/admin/scheme/schemeimage/${id}/change/`}
          className='min-h-[38px] w-max rounded-[10px] flex items-center justify-center whitespace-nowrap gap-2 px-[12px]
        bg-blue text-grey-100 font-medium font-heading tracking-[.038rem] text-sm' // Refactor to an @apply if used elsewhere
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
    ) }

  return (
    <Modal modalStyle={ModalStyle.WIDE} modalHeader={`${heading} ${hasMultipleImagesOfThisType ? typeIndex + 1 : ''} Asset ${id}${isError ? ' could not load' : ''}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSONSection()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
