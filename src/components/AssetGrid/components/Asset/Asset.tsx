import {useState} from 'react'
import Image from 'next/image'

import {useAppDispatch} from 'app/hooks'
import {setSelectedPlanAsset, setSelectedPlanAssetGroup} from 'features/planAssetsSlice'

import DotsSVG from 'icons/svgs/dots.svg'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'

import {requestModal} from 'features/modalSlice'
import {PlanImage} from 'types'

const Asset = ({asset, assetType, typeIndex, hasMultipleOfSameType}) => { //add props
  const dispatch = useAppDispatch()
  const {url, description} = asset

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = isLoading ? 'opacity-25 transition-opacity' : 'opacity-100 transition-opacity'

  const assetWithMetadata = (asset: PlanImage) => (
    Object.assign({
      hasMultipleOfSameType: hasMultipleOfSameType,
      typeIndex: typeIndex,
    }, asset)
  )

  const handleAssetClick = () => {
    const assetGroup = ['dev', 'staging'].map(env => {
      return assetType[env][typeIndex] ? assetWithMetadata(assetType[env][typeIndex]) : null
    })
    dispatch(setSelectedPlanAsset(assetWithMetadata(asset)))
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
