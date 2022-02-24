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

  const assetTypeNames = ['HERO', 'BANNER', 'OFFERS', 'ICON', 'ASSET', 'REFERENCE', 'PERSONAL OFFERS', 'PROMOTIONS', 'TIER', 'ALT HERO']
  const {dev, staging} = planAssets
  console.log(planAssets)
  const assetList = []

  // When staging is missing it returns undefined in planAssets we need to check/cope for that in the below....and vice useVerifyStagingCredentialsMutation... or check before it rtuns


  assetTypeNames.forEach((typeName, index) => {
    const devAssetsOfType = dev.filter(asset => asset.type === index)
    const stagingAssetsOfType = staging.filter(asset => asset.type === index)
    const maxNumberOfAssets = devAssetsOfType.length > stagingAssetsOfType.length ? devAssetsOfType.length : stagingAssetsOfType.length

    maxNumberOfAssets > 0 && assetList.push({
      heading: typeName,
      dev: devAssetsOfType,
      staging: stagingAssetsOfType,
      maxNumberOfAssets: maxNumberOfAssets,
    })
  })

  const renderLabelColumn = () => assetList.map(assetType => {
    const {heading, maxNumberOfAssets} = assetType
    return Array.from(Array(maxNumberOfAssets)).map((_, i) => (
      <div key={heading + i} className= 'w-full h-[100px] grid items-center font-table-header'>
        {heading} { maxNumberOfAssets > 1 && i + 1}
      </div>)
    )
  })


  const renderAssetColumn = (env: string) => assetList.map(assetType => Array.from(Array(assetType.maxNumberOfAssets)).map((_, i) => {
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


  // 1. Need to error proof this when env is not availible...
  // 2. get meshed in with George's work in Select eleemnt
  // 3. Test with all plans


  return (
    <div className='grid grid-cols-5 gap-2 grid-flow-col w-full text-center'>
      <div>{renderLabelColumn()}</div>
      <div>{dev && renderAssetColumn('dev')}</div>
      <div>{staging && renderAssetColumn('staging')}</div>
    </div>
  )
}

export default AssetGrid
