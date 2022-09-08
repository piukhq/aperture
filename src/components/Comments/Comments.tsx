import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {DirectoryComments, DirectoryCommentHighLevel, DirectoryComment} from 'types'
import WriteSvg from 'icons/svgs/write.svg'
import Comment from './components/Comment'

type Props = {
  comments: DirectoryComments
}

const Comments = ({comments}: Props) => {
  const router = useRouter()
  const currentRoute = router.asPath

  const {entity_comments: entityComments, lower_comments: lowerComments} = comments

  // Do not display section header on single view modals
  const shouldDisplayCommentSectionHeading = entityComments && lowerComments && lowerComments.length > 0

  const renderComment = (comment: DirectoryComment) => {
    const {ref, responses} = comment

    return (
      <div key={ref} className={'flex flex-col gap-[9px]'}>
        <Comment comment={comment} currentRoute={currentRoute} />

        {/* Recursion used here to display nested responses with expected left margin */}
        {responses && responses.length > 0 && responses.map(response => (
          <div key={response.ref} className='ml-[50px]'>
            <Comment comment={response} currentRoute={currentRoute} />
          </div>
        ))}
      </div>
    )
  }

  const renderCommentSection = (highLevelComment: DirectoryCommentHighLevel, index = 0) => {
    const {subject_type: subjectType, comments} = highLevelComment

    return (
      <section key={index} className='mb-[36px]' data-testid='comment-section'>
        {shouldDisplayCommentSectionHeading && <h3 data-testid='section-header' className='font-modal-heading'>{(subjectType).toUpperCase()}</h3>}

        <div className='flex flex-col gap-[9px] w-[100%]'>
          {comments.map((comment) => renderComment(comment))}
        </div>
      </section>
    )
  }

  return (
    <div className='ml-[32px] mr-[5px] mb-[27px]'>
      {entityComments && entityComments?.comments.length > 0 && renderCommentSection(entityComments)}
      {lowerComments && lowerComments.length > 0 && lowerComments.map((highLevelComment, index) => renderCommentSection(highLevelComment, index))}

      <Button
        handleClick={() => console.log('Add Comment button clicked')}
        buttonType={ButtonType.SUBMIT}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.COMMENTS_BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.SEMIBOLD}
        ariaLabel='Add Comment'
      >
        <WriteSvg fill='white' />Add Comment
      </Button>
    </div>
  )
}

export default Comments
