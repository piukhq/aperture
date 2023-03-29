import {useCallback, useState} from 'react'
import Image from 'next/image'
import {useAppDispatch} from 'app/hooks'
import {requestModal} from 'features/modalSlice'
import {setSelectedAssetEnvironment, setSelectedAssetGroup} from 'features/comparatorSlice'
import DotsSVG from 'icons/svgs/dots.svg'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'
import {AssetType, PlanAsset, PlanImage} from 'types'
import {EnvironmentShortName, ModalType} from 'utils/enums'

type Props = {
  image: PlanImage,
  assetType: AssetType,
  typeIndex: number,
  imageEnv: string,
}

const Asset = ({image, assetType, typeIndex, imageEnv}: Props) => {
  const dispatch = useAppDispatch()
  const {url, description} = image
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = isLoading ? 'opacity-25 transition-opacity' : 'opacity-100 transition-opacity'

  const buildAssetObject = (image: PlanImage, env: string): PlanAsset => ( // Provides additional metadata for use in the Asset modal
    {
      image,
      hasMultipleImagesOfThisType: assetType.hasMultipleImagesOfThisType,
      typeIndex,
      heading: assetType.heading,
      environment: env,
    }
  )

  const handleAssetClick = () => {
    const assetGroup = {}
    const environmentArray = [EnvironmentShortName.DEV, EnvironmentShortName.STAGING, EnvironmentShortName.PROD]

    environmentArray.forEach(env => {
      const currentImage = assetType[env][typeIndex]
      assetGroup[env] = currentImage ? buildAssetObject(currentImage, env) : null
    })

    dispatch(setSelectedAssetEnvironment(imageEnv))
    dispatch(setSelectedAssetGroup(assetGroup))
    dispatch(requestModal(ModalType.ASSET_COMPARATOR_ASSET))
  }

  const handleOnLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleOnError = useCallback(() => {
    setIsError(true)
  }, [])

  if (isError) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <button className='w-[60px] h-[60px] flex justify-center items-center' title='Asset could not load' onClick={handleAssetClick}>
          <AssetErrorSVG />
        </button>
      </div>
    ) } else {
    return (
      <button aria-label={`${imageEnv} ${description || assetType.heading}`} onClick={handleAssetClick}>
        <Image
          className={imageClasses}
          alt={`${imageEnv} ${assetType.heading} ${assetType.hasMultipleImagesOfThisType ? typeIndex + 1 : ''}`}
          width={150}
          height={73}
          objectFit='contain'
          src={url}
          quality={25} // TODO: Revisit this once the hover zoom effect is in place
          onLoadingComplete={handleOnLoadingComplete}
          onError={handleOnError}
        />
        {isLoading && (
          <div className='w-full absolute inset-0 flex justify-center items-center dark:bg-grey-825 '>
            <div className='w-[60px] h-[60px] flex justify-center items-center' title='Loading'>
              <DotsSVG className='animate-pulse w-[18px] h-[4px]' />
            </div>
          </div>
        )}
      </button>
    )
  }
}

export default Asset
