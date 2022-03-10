import React, {useMemo} from 'react'
import Asset from './components/Asset'
import {SelectedPlanImages, AssetType} from 'types'
import {EnvironmentShortName} from 'utils/enums'

import BlockSVG from 'icons/svgs/block.svg'
type Props = {
  planAssets: SelectedPlanImages
}

const AssetGrid = ({planAssets}: Props) => {
  const {dev, staging} = planAssets

  const assetTypeNames = useMemo(() => ['Hero', 'Banner', 'Offers', 'Icon', 'Asset', 'Reference', 'Personal Offers', 'Promotions', 'Tier', 'Alt Hero'], [])

  const assetMatrix:Array<AssetType> = []

  assetTypeNames.forEach((typeName, index) => {
    const devAssetsOfType = dev?.filter(asset => asset.type === index)
    const stagingAssetsOfType = staging?.filter(asset => asset.type === index)
    const longestAssetArray = [devAssetsOfType, stagingAssetsOfType].sort((a, b) => b.length - a.length)[0]

    longestAssetArray.length > 0 && assetMatrix.push({
      heading: typeName,
      dev: devAssetsOfType,
      staging: stagingAssetsOfType,
      longestAssetArray,
      hasMultipleImagesOfThisType: longestAssetArray.length > 1,
    })
  })

  const renderLabelColumnContents = () => (
    assetMatrix.map(assetType => {
      const {heading, longestAssetArray, hasMultipleImagesOfThisType} = assetType
      return longestAssetArray.map((_, i) => (
        <div key={heading + i} className= 'w-full h-[100px] grid items-center font-table-header'>
          {heading.toLocaleUpperCase() } { hasMultipleImagesOfThisType && i + 1}
        </div>)
      )
    })
  )

  const renderAssetColumnContents = (env: string) => (
    assetMatrix.map(assetType => assetType.longestAssetArray.map((_, i) => {
      const currentImage = assetType[env][i]
      if (currentImage) {
        const {url} = currentImage
        return (
          <div key={url} className='relative w-full h-[100px] flex items-center justify-center hover:scale-110 transition-all duration-300'>
            <Asset
              image={currentImage}
              assetType={assetType}
              typeIndex={i}
              imageEnv={env}
            />
          </div>
        )
      } else {
        return (
          <div key={assetType.heading + i} className='relative w-full h-[100px] flex items-center justify-center'>
            <div title='No asset available' className='w-[60px] h-[60px] flex items-center justify-center'>
              <BlockSVG/>
            </div>
          </div>
        )
      }
    }))
  )

  return (
    <div className='grid grid-cols-5 gap-2 grid-flow-col w-full text-center mt-[10px]'>
      <div className='flex flex-col'>{renderLabelColumnContents()}</div>
      <div className='flex flex-col'>{dev?.length > 0 && renderAssetColumnContents(EnvironmentShortName.DEV)}</div>
      <div className='flex flex-col'>{staging?.length > 0 && renderAssetColumnContents(EnvironmentShortName.STAGING)}</div>
    </div>
  )
}

export default AssetGrid
