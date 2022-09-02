import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryComments, DirectoryCommentHighLevel, DirectoryComment, DirectoryCommentSubject} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import DotsSvg from 'icons/svgs/dots.svg'
import ForwardSvg from 'icons/svgs/forward.svg'
import WriteSvg from 'icons/svgs/write.svg'
import {classNames} from 'utils/classNames'

type Props = {
  comments: DirectoryComments
}

const Comments = ({comments}: Props) => {
  const router = useRouter()
  const {entity_comments: entityComments, lower_comments: lowerComments} = comments

  const renderSubjects = (subjects: DirectoryCommentSubject[]) => {
    const renderSingleSubject = () => {
      const subject = subjects[0]
      return (
        <a data-testid='subject-link' className='flex truncate text-commentsBlue' href={`${router.asPath}${subject.link_resource}`}>
          <h4 className='font-bold truncate'>
            {subject.display_text}
          </h4>
          <ForwardSvg className='ml-[3px] mt-[2px] h-[16px] min-w-[16px] fill-commentsBlue' />
        </a>
      )
    }

    const renderMultipleSubjects = () => {
      const subjectTitles = subjects.map(subject => subject.display_text).join(', ')
      return (
        <>
          <h4 className='font-bold truncate'>
            {subjectTitles}
          </h4>

          <button onClick={() => console.log('See subjects button clicked')} className='min-w-[86px] font-body-4 text-commentsBlue'>
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

  const renderComments = (comment: DirectoryComment, isResponse = false) => {
    const {ref, created_by: createdBy, created_at: createdAt, subjects, metadata, responses} = comment

    const marginStyles = isResponse ? 'ml-[50px]' : ''

    return (
      <div key={ref} className={classNames(
        'flex flex-col gap-[9px]',
        marginStyles
      )}>
        <div className='bg-grey-300 dark:bg-grey-800 rounded-[20px] min-h-[71px] p-[13px] pt-[6px] self-end w-[100%] min-w-[250px]'>
          <div className='flex justify-between items-center'>
            <span className='flex whitespace-nowrap font-heading-7 font-normal max-w-[calc(100%_-_106px)] truncate'>
              <h4 className='font-bold'>{createdBy}</h4>
              {subjects.length > 0 && renderSubjects(subjects)}
            </span>

            <div className='flex items-center gap-[20px] min-w-[104px]'>
              <p className='font-subheading-4 tracking-[0.08px]'>{isoToDateTime(createdAt, true)}</p>

              <Button
                handleClick={() => console.log('Options button clicked')}
                buttonWidth={ButtonWidth.ICON_ONLY}
                additionalStyles='h-[11px] w-[11px]'
                ariaLabel='Options'
              >
                <DotsSvg className='h-[11px] w-[11px]' />
              </Button>
            </div>
          </div>

          <div className='flex flex-row justify-between mt-[4px]'>
            <p className='font-body-3'>{metadata.text}</p>

            <Button
              handleClick={() => console.log('Reply button clicked')}
              buttonWidth={ButtonWidth.ICON_ONLY}
              additionalStyles='h-[20px] w-[20px] self-end'
              ariaLabel='Reply'
            >
              <ForwardSvg className='h-[20px] w-[20px] scale-x-flip fill-grey-600' />
            </Button>
          </div>
        </div>

        {/* Recursion used here to display nested responses with expected left margin */}
        {responses && responses.length > 0 && responses.map(response => renderComments(response, true))}
      </div>
    )
  }

  const renderHighLevelComments = (highLevelComment: DirectoryCommentHighLevel, index = 0) => {
    const {subject_type: subjectType, comments} = highLevelComment

    return (
      <section key={index} className='mb-[36px]' data-testid='comment-section'>
        <h3 className='font-modal-heading'>{(subjectType).toUpperCase()}</h3>

        <div className='flex flex-col gap-[9px] w-[100%]'>
          {comments.map((comment) => renderComments(comment))}
        </div>
      </section>
    )
  }

  return (
    <div className='ml-[32px] mr-[5px]'>
      {entityComments && entityComments?.comments.length > 0 && renderHighLevelComments(entityComments)}
      {lowerComments && lowerComments.length > 0 && lowerComments.map((highLevelComment, index) => renderHighLevelComments(highLevelComment, index))}

      <Button
        handleClick={() => console.log('Add Comment button clicked')}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.COMMENTS_BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
        ariaLabel='Add Comment'
      >
        <WriteSvg fill='white' />Add Comment
      </Button>
    </div>
  )
}

export default Comments
