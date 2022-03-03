import React, {useMemo} from 'react'
import Asset from './components/Asset'
import {SelectedPlanAssets, AssetType} from 'types'

import BlockSVG from 'icons/svgs/block.svg'
type Props = {
  planAssets: SelectedPlanAssets
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
      longestAssetArray: longestAssetArray,
      hasMultipleAssetsOfThisType: longestAssetArray.length > 1,
    })
  })

  const renderLabelColumnContents = () => (
    assetMatrix.map(assetType => {
      const {heading, longestAssetArray, hasMultipleAssetsOfThisType} = assetType
      return longestAssetArray.map((_, i) => (
        <div key={heading + i} className= 'w-full h-[100px] grid items-center font-table-header'>
          {heading.toLocaleUpperCase() } { hasMultipleAssetsOfThisType && i + 1}
        </div>)
      )
    })
  )

  const renderAssetColumnContents = (env: string) => (
    assetMatrix.map(assetType => assetType.longestAssetArray.map((_, i) => {
      if (assetType[env][i]) {
        const {url} = assetType[env][i]
        return (
          <div key={url} className='relative w-full h-[100px] grid items-center'>
            <Asset
              asset={assetType[env][i]}
              assetType={assetType}
              typeIndex={i}
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
    <>
      <div className='grid grid-cols-5 gap-2 grid-flow-col w-full text-center'>
        <div>{renderLabelColumnContents()}</div>
        <div>{dev?.length > 0 && renderAssetColumnContents('dev')}</div>
        <div>{staging?.length > 0 && renderAssetColumnContents('staging')}</div>
      </div>
    </>
  )
}

export default AssetGrid
