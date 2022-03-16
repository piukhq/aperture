import {useState, useEffect, useCallback} from 'react'
import {Button, Tag} from 'components'
import TrashSvg from 'icons/svgs/trash.svg'

type Props = {
  isFailure,
  isPending: boolean,
  hasVerificationToken: boolean,
  removeVerificationToken: () => void
}

const VerificationTag = ({
  isFailure,
  isPending,
  hasVerificationToken,
  removeVerificationToken,
}: Props) => {
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    setIsVerified(hasVerificationToken)
  }, [hasVerificationToken])

  const {
    AQUAMARINE_OUTLINE,
    YELLOW_OUTLINE,
    RED_OUTLINE,
    GREY_OUTLINE,
  } = Tag.tagStyle

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
    removeVerificationToken()
    setIsVerified(false)
  }, [removeVerificationToken])

  return (
    <div className='flex'>
      <Tag tagSize={Tag.tagSize.SMALL} tagStyle={tagStyle} label={label} />

      {isVerified && (
        <div className='ml-[18px]'>
          <Button
            handleClick={handleRemoveToken}
            buttonWidth={Button.buttonWidth.ICON_ONLY}
            borderColour={Button.borderColour.RED}
            ariaLabel='Remove Credentials'
          >
            <TrashSvg />
          </Button>
        </div>
      )}
    </div>
  )
}

export default VerificationTag
