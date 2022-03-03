import {useState} from 'react'
import Image from 'next/image'

import {useAppDispatch} from 'app/hooks'
import {setSelectedPlanAsset, setSelectedPlanAssetGroup} from 'features/planAssetsSlice'

import DotsSVG from 'icons/svgs/dots.svg'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'

import {requestModal} from 'features/modalSlice'
import {AssetType, PlanImage} from 'types'

type Props = {
  asset: PlanImage,
  assetType: AssetType,
  typeIndex: number,
}

const Asset = ({asset, assetType, typeIndex}: Props) => {
  const dispatch = useAppDispatch()
  const {url, description} = asset

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = isLoading ? 'opacity-25 transition-opacity' : 'opacity-100 transition-opacity'


  const buildPlanAssetObject = (asset: PlanImage) => ( // Provides additional metadata for use in the Asset modal
    {
      asset: asset,
      hasMultipleAssetsOfThisType: assetType.hasMultipleAssetsOfThisType,
      typeIndex: typeIndex,
      heading: assetType.heading,
    }
  )

  const handleAssetClick = () => {
    const assetGroup = ['dev', 'staging'].map(env => {
      return assetType[env][typeIndex] ? buildPlanAssetObject(assetType[env][typeIndex]) : null
    })
    dispatch(setSelectedPlanAsset(buildPlanAssetObject(asset)))
    dispatch(setSelectedPlanAssetGroup(assetGroup))
    dispatch(requestModal('ASSET_COMPARATOR_ASSET'))
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center'>
        <AssetErrorSVG />
      </div>
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
            <DotsSVG className='animate-pulse' />
          </div>
        )}
      </button>
    )
  }
}

export default Asset
