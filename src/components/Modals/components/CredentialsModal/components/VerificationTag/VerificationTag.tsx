import React, {useState, useEffect, useCallback} from 'react'
import {Button, Tag} from 'components'
import TrashSvg from 'icons/svgs/trash.svg'
import {TagStyle, TagSize} from 'components/Tag/styles'
import {ButtonWidth, BorderColour} from 'components/Button/styles'

type Props = {
  envKey: string,
  isFailure: boolean,
  isPending: boolean,
  hasVerificationToken: boolean,
  removeVerificationToken: (envKey: string) => void
}

const VerificationTag = ({
  envKey,
  isFailure,
  isPending,
  hasVerificationToken,
  removeVerificationToken,
}: Props) => {
  const [isVerified, setIsVerified] = useState<boolean>(false)

  useEffect(() => {
    setIsVerified(hasVerificationToken)
  }, [hasVerificationToken])

  const {
    AQUAMARINE_OUTLINE,
    YELLOW_OUTLINE,
    RED_OUTLINE,
    GREY_OUTLINE,
  } = TagStyle

  let tagStyle = GREY_OUTLINE
  let label = 'Unverified'

  if (isVerified) {
    tagStyle = AQUAMARINE_OUTLINE
    label = 'Verified'
  } else if (isPending) {
    tagStyle = YELLOW_OUTLINE
    label = 'Pending'
  } else if (isFailure) {
    tagStyle = RED_OUTLINE
    label = 'Failed'
  }

  const handleRemoveToken = useCallback(() => {
    removeVerificationToken(envKey)
    setIsVerified(false)
  }, [removeVerificationToken, envKey])

  return (
    <div className='flex'>
      <Tag tagSize={TagSize.SMALL} tagStyle={tagStyle} label={label} />

      {isVerified && (
        <div className='ml-[18px]'>
          <Button
            handleClick={handleRemoveToken}
            buttonWidth={ButtonWidth.ICON_ONLY}
            borderColour={BorderColour.RED}
            ariaLabel='Remove Credentials'
          >
            <TrashSvg className='fill-red' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default React.memo(VerificationTag)
