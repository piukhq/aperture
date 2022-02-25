import React from 'react'
import BlockSVG from 'icons/svgs/block.svg'

import {PlanImage} from 'types'
import {Asset} from './components/Asset'


type Props = {
  planAssets: {
    dev: [PlanImage],
    staging: [PlanImage]
  }
}

const AssetGrid = ({planAssets}: Props) => {

  const {dev, staging} = planAssets

  const assetTypeNames = ['HERO', 'BANNER', 'OFFERS', 'ICON', 'ASSET', 'REFERENCE', 'PERSONAL OFFERS', 'PROMOTIONS', 'TIER', 'ALT HERO']
  const assetMatrix = []

  assetTypeNames.forEach((typeName, index) => {
    const devAssetsOfType = dev?.filter(asset => asset.type === index)
    const stagingAssetsOfType = staging?.filter(asset => asset.type === index)
    const longestAssetArray = [devAssetsOfType, stagingAssetsOfType].sort((a, b) => b.length - a.length)[0]

    longestAssetArray.length > 0 && assetMatrix.push({
      heading: typeName,
      dev: devAssetsOfType,
      staging: stagingAssetsOfType,
      longestAssetArray: longestAssetArray,
    })
  })

  const renderLabelColumn = () => assetMatrix.map(assetType => {
    const {heading, longestAssetArray} = assetType
    return longestAssetArray.map((_, i) => (
      <div key={heading + i} className= 'w-full h-[100px] grid items-center font-table-header'>
        {heading} { longestAssetArray.length > 1 && i + 1}
      </div>)
    )
  })

  const renderAssetColumn = (env: string) => assetMatrix.map(assetType => assetType.longestAssetArray.map((_, i) => {
    if (assetType[env][i]) {
      return (
        <div key={assetType[env][i].url} className='relative w-full h-[100px] grid items-center'>
          <Asset description={assetType[env][i].description} url={assetType[env][i].url} />
        </div>
      )
    } else {
      return (
        <div key={assetType.heading + 1} className='relative w-full h-[100px] grid items-center justify-center'>
          <BlockSVG/>
        </div>
      )
    }
  }))

  return (
    <div className='grid grid-cols-5 gap-2 grid-flow-col w-full text-center'>
      <div>{renderLabelColumn()}</div>
      <div>{dev?.length > 0 && renderAssetColumn('dev')}</div>
      <div>{staging?.length > 0 && renderAssetColumn('staging')}</div>
    </div>
  )
}

export default AssetGrid
