import React from 'react'
import Image from 'next/image'

import {PlanImage} from 'types'


type Props = {
  planAssets: {
    dev: [PlanImage],
    staging: [PlanImage]
  }
}

const AssetGrid = ({planAssets}: Props) => {

  console.log(planAssets)

  const {dev, staging} = planAssets
  const typeNames = ['HERO', 'BANNER', 'OFFERS', 'ICON', 'ASSET', 'REFERENCE', 'PERSONAL OFFERS', 'PROMOTIONS', 'TIER', 'ALT HERO']

  console.log(dev)

  const countTypeOccurrences = (arr, val) => arr.reduce((a, asset) => (asset.type === val ? a + 1 : a), 0)

  const typeOccurrences = typeNames.map((_, index) => Math.max(...[countTypeOccurrences(dev, index), countTypeOccurrences(staging, index)]))

  console.log(typeOccurrences)


  // const assetList = new Set([...planAssets.dev.map(asset => asset.type), ...planAssets.staging.map(asset => asset.type)].sort())

  // const devAssets = planAssets?.dev?.sort((a, b) => a.type - b.type)

  // console.log(devAssets)

  // const devAssetCount = new Map()
  // const stagingAssetCount = new Map()


  // planAssets.dev.forEach(asset => !devAssetCount[asset.type] ? devAssetCount[asset.type] = 1 : devAssetCount[asset.type]++)
  // planAssets.staging.forEach(asset => !stagingAssetCount[asset.type] ? stagingAssetCount[asset.type] = 1 : stagingAssetCount[asset.type]++)


  const renderLabelColumn = () => {
    const labelClasses = 'w-full h-[100px] grid items-center font-table-header'

    const renderLabels = () => {
      return typeOccurrences.map((typeCount, index) => {
        if (typeCount !== 0) {
          const labelByType = []
          for (let i = 1; i <= typeCount; i++) {
            labelByType.push(<div key={index + i} className={labelClasses}>{typeNames[index]} {typeCount > 1 && i}</div>)
          }
          return labelByType
        }
      })
    }

    return (
      <div>
        {renderLabels()}
      </div>
    )
  }

  const renderAssetColumn = () => {

    const renderAssets = () => {
      return typeOccurrences.map((typeCount, index) => {
        if (typeCount !== 0) {
          const assetByType = []
          for (let i = 1; i <= typeCount; i++) {
            console.log(index + ' index')
            assetByType.push(
              <div className='relative w-full h-[100px] grid items-center'>
                <Image
                  alt={dev[i].url}
                  layout='fill'
                  objectFit='contain'
                  src={dev[i].url}
                />
                {index}
              </div>
            )
          }
          return assetByType
        }
      })
    }


    return (
      <div>
        {renderAssets()}
      </div>
    )
  }


  return (
    <div className='grid grid-cols-5 grid-flow-col w-full text-center'>
      {renderLabelColumn()}
      {renderAssetColumn()}
    </div>
  )
}

export default AssetGrid
