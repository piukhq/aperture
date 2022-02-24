import {useState} from 'react'
import Image from 'next/image'
import {HydratedPlan} from 'types'

type Props = {
  plan: HydratedPlan
}

const IconImage = ({plan}: Props) => {
  const [imageIndex, setImageIndex] = useState(0)
  const devIcon = plan.devImages.find(image => image.type === 3)
  const stagingIcons = plan.stagingImages.find(image => image.type === 3)

  // Remove undefined values from array
  const iconImages = [stagingIcons, devIcon].filter(image => image)

  // Attempt to load image based on environment priority
  const src = iconImages[imageIndex]?.url

  const handleIconImageError = () => {
    setImageIndex(currentIndex => currentIndex + 1)
  }

  return (
    <div className='h-[28px] w-[28px] mr-[10px]'>
      {src && <Image src={src} height={28} width={28} onError={handleIconImageError} alt='' />}
    </div>
  )
}

export default IconImage
