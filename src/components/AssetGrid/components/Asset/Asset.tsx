import {useState} from 'react'
import Image from 'next/image'

import {useAppDispatch} from 'app/hooks'
import {setSelectedAssetId, setSelectedAssetGroup} from 'features/planAssetsSlice'

import DotsSVG from 'icons/svgs/dots.svg'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'

import {requestModal} from 'features/modalSlice'
import {AssetType, PlanImage} from 'types'

type Props = {
  image: PlanImage,
  assetType: AssetType,
  typeIndex: number,
}

const Asset = ({image, assetType, typeIndex}: Props) => {
  const dispatch = useAppDispatch()
  const {url, description} = image

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = isLoading ? 'opacity-25 transition-opacity' : 'opacity-100 transition-opacity'


  const buildAssetObject = (image: PlanImage) => ( // Provides additional metadata for use in the Asset modal
    {
      image,
      hasMultipleImagesOfThisType: assetType.hasMultipleImagesOfThisType,
      typeIndex,
      heading: assetType.heading,
      isError,
    }
  )

  const handleAssetClick = () => {
    const assetGroup = {}
    const environmentArray = ['dev', 'staging']

    environmentArray.forEach(env => {
      const currentImage = assetType[env][typeIndex]
      assetGroup[env] = currentImage ? buildAssetObject(currentImage) : null
    })

    dispatch(setSelectedAssetId(image.id))
    dispatch(setSelectedAssetGroup(assetGroup))
    dispatch(requestModal('ASSET_COMPARATOR_ASSET'))
  }

  if (isError) {
    return (
      <button className='w-[60px] h-[60px] flex justify-center items-center' title='Asset could not load' onClick={handleAssetClick}>
        <AssetErrorSVG />
      </button>
    ) } else {
    return (
      <button onClick={handleAssetClick}>
        <Image
          className={imageClasses}
          alt={description}
          width={150}
          height={73}
          objectFit='contain'
          src={url}
          quality={25} // TODO: Revisit this once the hover zoom effect is in place
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setIsError(true)}
        />
        {isLoading && (
          <div className='w-full absolute inset-0 flex justify-center items-center dark:bg-grey-825 '>
            <div className='w-[60px] h-[60px] flex justify-center items-center' title='Loading'>
              <DotsSVG className='animate-pulse' />
            </div>
          </div>
        )}
      </button>
    )
  }
}

export default Asset
