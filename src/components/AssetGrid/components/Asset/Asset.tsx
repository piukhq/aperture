import {useState} from 'react'
import Image from 'next/image'
import DotsSVG from 'icons/svgs/dots.svg'
import AssetErrorSVG from 'icons/svgs/asset-error.svg'

const Asset = ({description, url}) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imageClasses = isLoading ? 'opacity-25 transition-opacity' : 'opacity-100 transition-opacity'

  if (isError) {
    return (
      <div className='flex justify-center items-center'>
        <AssetErrorSVG />
      </div>
    ) } else {
    return (
      <div>
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
      </div>
    )
  }
}

export default Asset
