import React from 'react'
import Image from 'next/image'
import CloseSquareSVG from 'icons/svgs/close-square.svg'

import {PlanImage} from 'types'


type Props = {
  planAssets: {
    dev: [PlanImage],
    staging: [PlanImage]
  }
}

const AssetGrid = ({planAssets}: Props) => {

  const {dev, staging} = planAssets
  const typeNames = ['HERO', 'BANNER', 'OFFERS', 'ICON', 'ASSET', 'REFERENCE', 'PERSONAL OFFERS', 'PROMOTIONS', 'TIER', 'ALT HERO']


  const assetList = []

  typeNames.forEach((typeName, index) => {
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
    const labelPerType = []
    for (let i = 1; i <= assetType.maxNumberOfAssets; i++) {
      labelPerType.push(
        <div key={assetType.heading + i} className= 'w-full h-[100px] grid items-center font-table-header'>
          {assetType.heading} { assetType.maxNumberOfAssets > 1 && i}
        </div>)
    }
    return labelPerType
  })


  const renderAssetColumn = (env: string) => assetList.map(assetType => {
    const assetByType = []
    for (let i = 0; i < assetType.maxNumberOfAssets; i++) {
      if (assetType[env][i]) {
        assetByType.push(
          <div key={assetType[env][i].url} className='relative w-full h-[100px] grid items-center'>
            <Image
              alt={assetType[env][i].description}
              width='150'
              height='73'
              objectFit='contain'
              src={assetType[env][i].url}
              quality='25'
              placeholder='blur'
              blurDataURL='/icons/svgs/dots.svg'
            />
          </div>
        )
      } else {
        assetByType.push(
          <div className='relative w-full h-[100px] grid items-center justify-center'>
            <CloseSquareSVG/>
          </div>
        )
      }
    }
    return assetByType
  })

  // 1. Need to error proof this.
  // 2. tidying up different calls below.
  // 3. get IntersectionObserver4. test wierd states

  return (
    <div className='grid grid-cols-5 gap-2 grid-flow-col w-full text-center'>
      <div>{renderLabelColumn()}</div>
      <div>{renderAssetColumn('dev')}</div>
      <div>{renderAssetColumn('staging')}</div>
    </div>
  )
}

export default AssetGrid
