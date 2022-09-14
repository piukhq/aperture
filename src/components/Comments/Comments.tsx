import {useRouter} from 'next/router'
import {AutosizeTextArea} from 'components'
import Comment from './components/Comment'
import {DirectoryComments, DirectoryCommentHighLevel, DirectoryComment} from 'types'

type Props = {
  comments: DirectoryComments
  isSingleView?: boolean
}

const Comments = ({comments, isSingleView}: Props) => {
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
    <div className='mb-[10px]'>
      {/* Adding a max-height allows us to fix the AutosizeTextArea and border at the bottom of the modal */}
      <div className={`ml-[32px] mr-[5px] overflow-auto scrollbar-hidden ${isSingleView ? 'max-h-[42vh]' : 'max-h-[65vh]'}`}>
        {entityComments && entityComments?.comments.length > 0 && renderCommentSection(entityComments)}
        {lowerComments && lowerComments.length > 0 && lowerComments.map((highLevelComment, index) => renderCommentSection(highLevelComment, index))}
      </div>

      <div className='border-t-[1px] border-grey-200 dark:border-grey-800 pt-[22px] px-[15px]'>
        <AutosizeTextArea buttonClickHandler={() => console.log('Submit comment button clicked')} />
      </div>
    </div>
  )
}

export default Comments
