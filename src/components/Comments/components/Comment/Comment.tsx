import {useState} from 'react'
import {Button, OptionsMenuButton, PaymentCardIcon} from 'components'
import {ButtonWidth, ButtonSize} from 'components/Button/styles'
import {DirectoryComment, DirectoryCommentSubject, OptionsMenuItems} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import ForwardSvg from 'icons/svgs/forward.svg'
import {PaymentSchemeCode} from 'utils/enums'

type Props = {
  comment: DirectoryComment
  currentRoute: string
  optionsMenuItems: OptionsMenuItems
}

const Comment = ({comment, currentRoute, optionsMenuItems}: Props) => {
  const {created_by: createdBy, created_at: createdAt, subjects, metadata} = comment

  const [isSubjectListExpanded, setIsSubjectListExpanded] = useState(false)

  const renderSubjects = (subjects: DirectoryCommentSubject[]) => {
    const renderSubjectMetadata = ({displayText, iconSlug, shouldTruncate = false}) => (
      <>
        <h4 className={`font-bold ${shouldTruncate && 'truncate'}`}>
          {displayText}
        </h4>

        {iconSlug && (
          <PaymentCardIcon
            paymentSchemeCode={PaymentSchemeCode[iconSlug.toUpperCase()]}
            paymentSchemeIconStyles='flex min-w-[17px] min-h-[12px] justify-center mx-[2px] items-center rounded-[2px]'
          />
        )}
      </>
    )

    const renderLink = ({href, displayText, iconSlug, shouldTruncate = false, index = 0}) => {
      return (
        <a key={index} data-testid='subject-link' className={`flex text-commentsBlue items-center min-h-[22px] ${shouldTruncate && 'truncate'}`} href={href}>
          {renderSubjectMetadata({displayText, iconSlug, shouldTruncate})}
        </a>
      )
    }

    const renderSingleSubject = () => {
      const {href, display_text: displayText, icon_slug: iconSlug} = subjects[0]

      // Should not render a link if user is already on the same route
      if (href && href !== currentRoute) {
        return renderLink({href, displayText, iconSlug, shouldTruncate: true})
      }

      return (
        <div className='flex truncate items-center min-h-[22px]'>
          {renderSubjectMetadata({displayText, iconSlug, shouldTruncate: true})}
        </div>
      )
    }

    const renderMultipleSubjects = () => {
      if (isSubjectListExpanded) {
        return (
          <>
            <div data-testid='expanded-subjects' className='flex flex-col'>
              {subjects.map((subject, index) => {
                const {href, display_text: displayText, icon_slug: iconSlug} = subject

                if (href && href !== currentRoute) {
                  return renderLink({index, href, displayText, iconSlug})
                }

                return (
                  <div key={index} className='flex items-center'>
                    {renderSubjectMetadata({displayText, iconSlug})}
                  </div>
                )
              })}
            </div>

            <button onClick={() => setIsSubjectListExpanded(false)} className='self-start mx-[2px] min-w-[60px] font-body-4 font-bold text-commentsBlue'>
              (see less -)
            </button>
          </>
        )
      }

      const subjectTitles = subjects.map(subject => subject.display_text).join(', ')
      return (
        <>
          <h4 className='font-bold truncate'>
            {subjectTitles}
          </h4>

          <button onClick={() => setIsSubjectListExpanded(true)} className='min-w-[86px] font-body-4 font-bold text-commentsBlue'>
            (see subjects +)
          </button>
        </>
      )
    }

    return (
      <>
        <p className='mx-[4px]'>in</p>
        {subjects.length === 1 ? renderSingleSubject() : renderMultipleSubjects()}
      </>
    )
  }

  return (
    <div className='bg-grey-300 dark:bg-grey-800 rounded-[20px] min-h-[71px] p-[13px] pt-[6px] self-end w-[100%] min-w-[250px]'>
      <div className='flex justify-between'>
        <span className='flex whitespace-nowrap font-heading-7 font-normal max-w-[calc(100%_-_106px)]'>
          <h4 className='font-bold min-w-[70px] truncate'>{createdBy}</h4>
          {subjects.length > 0 && renderSubjects(subjects)}
        </span>

        <div className='flex gap-[20px] min-w-[104px] mt-[2px]'>
          <p className='font-subheading-4 tracking-[0.08px] '>{isoToDateTime(createdAt, true)}</p>

          <div className='flex justify-center mt-[3px] w-[15px]'>
            <OptionsMenuButton
              optionsMenuItems={optionsMenuItems}
              buttonWidth={ButtonWidth.ICON_ONLY}
              buttonSize={ButtonSize.INHERIT}
              buttonAdditionalStyles='border-none'
              iconStyles='h-[11px] w-[11px]'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between mt-[4px]'>
        <p className='font-body-3'>{metadata.text}</p>

        <Button
          handleClick={() => console.log('Reply button clicked')}
          buttonSize={ButtonSize.INHERIT}
          buttonWidth={ButtonWidth.ICON_ONLY}
          additionalStyles='h-[20px] w-[20px] self-end'
          ariaLabel='Reply'
        >
          <ForwardSvg className='h-[20px] w-[20px] scale-x-flip fill-grey-600' />
        </Button>
      </div>
    </div>
  )
}

export default Comment
