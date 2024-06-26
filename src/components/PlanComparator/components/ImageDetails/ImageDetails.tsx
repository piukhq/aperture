import {useEffect, useState} from 'react'
import compare from 'just-compare'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {ImageTypes} from 'utils/enums'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'


type CategoryAcrossEnvs = {
  cta_url: string
  description: string
  encoding: string
  type: ImageTypes
}[]

type Props = {
  categoryAcrossEnvsArray: CategoryAcrossEnvs[]
}


const ImageDetails = ({
  categoryAcrossEnvsArray,
}: Props) => {

  // Fade in the component
  const isMobileViewport = useIsMobileViewportDimensions()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), (100))
    return () => clearTimeout(timeout)
  }, [])


  const getImageTypesCount = () => {
    const validImageValuesArray = categoryAcrossEnvsArray.map(envCategory => {
      return envCategory.map(image => {
        return {
          cta_url: image.cta_url,
          description: image.description,
          encoding: image.encoding,
          type: ImageTypes[image.type],
        }
      }).sort((a, b) => a.type > b.type ? 1 : -1)
    })

    // get count of each type of image found in ImageTypes
    const imageTypeCounts = validImageValuesArray.map(envCategory => {
      return envCategory.map(image => {
        return image.type
      }).reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr]++
        } else {
          acc[curr] = 1
        }
        return acc
      }, {})
    })

    const isImageTypeCountsEqual = imageTypeCounts.every((imageTypeCount, index) => {
      if (index === 0) {
        return true
      }
      return compare(imageTypeCount, imageTypeCounts[index - 1])
    })
    return isImageTypeCountsEqual
  }


  const hasSameNumberOfImages = categoryAcrossEnvsArray.every(envCategory => envCategory.length === categoryAcrossEnvsArray[0].length)
  const hasSameNumberOfImageTypes = hasSameNumberOfImages && getImageTypesCount()
  const imageReport: string = hasSameNumberOfImages && hasSameNumberOfImageTypes ?
    'The number of images per type match across environments but please confirm they are actually the same via Asset Comparator' : !hasSameNumberOfImages ?
      'The total number of images do not match across environments' : 'The number of images per type do not match across environments'

  return (
    <section className={`mt-[30px] rounded-[10px] p-[20px] shadow-sm ${isMobileViewport ? 'w-[550px]' : 'w-[750px]'} ${isMounted ? 'opacity-100' : 'opacity-0'}  
    duration-300 ${!hasSameNumberOfImageTypes ? 'bg-red/20' : 'bg-green/20'}`}>
      <div className='w-full font-heading-5 text-grey-800 dark:text-grey-100'>{capitaliseFirstLetter('Images')}
        <p className='font-body-3 font-light italic my-5'>{imageReport}</p>
      </div>
    </section>
  )
}

export default ImageDetails
