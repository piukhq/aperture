import {useRef, useEffect} from 'react'
import {useRouter} from 'next/router'
import {AutosizeTextArea} from 'components'
import Comment from './components/Comment'
import {DirectoryComments, DirectoryCommentHighLevel, DirectoryComment} from 'types'
import {CommentsSubjectTypes, UserPermissions} from 'utils/enums'
import usePermissions from 'hooks/usePermissions'

type Props = {
  comments: DirectoryComments
  handleCommentSubmit: (comment: string) => void
  handleCommentDelete: (commentRef: string) => void
  handleCommentEditSubmit: (commentRef: string, editedComment: string) => void
  handleCommentReplySubmit: (
    commentRef: string,
    comment: string,
    subjectRefs: Array<string>,
    subjectType: CommentsSubjectTypes,
    ownerRef?: string
  ) => void
  newCommentIsLoading: boolean
  newCommentIsSuccess: boolean
  editedCommentIsLoading: boolean,
  editedCommentIsSuccess: boolean,
  replyCommentIsLoading: boolean,
  replyCommentIsSuccess: boolean,
  isSingleView?: boolean
}

const Comments = ({
  comments,
  handleCommentSubmit,
  handleCommentDelete,
  handleCommentEditSubmit,
  handleCommentReplySubmit,
  newCommentIsSuccess,
  newCommentIsLoading,
  editedCommentIsLoading,
  editedCommentIsSuccess,
  replyCommentIsLoading,
  replyCommentIsSuccess,
  isSingleView,
}: Props) => {
  const router = useRouter()
  const currentRoute = router.asPath
  const {planId} = router.query
  const {hasRequiredPermission} = usePermissions()

  const commentsContainerRef = useRef(null)

  useEffect(() => {
    // Only scroll to the top when NEW comment is added. Will likely not do this for replies to comments
    if (newCommentIsSuccess && !newCommentIsLoading) {
      // Scroll to the top of container when new comment is added
      commentsContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [newCommentIsSuccess, newCommentIsLoading])

  const {entity_comments: entityComments, lower_comments: lowerComments} = comments

  // Do not display section header on single view modals
  const shouldDisplayCommentSectionHeading = entityComments && lowerComments && lowerComments.length > 0

  const renderComment = (comment: DirectoryComment, subjectType: CommentsSubjectTypes) => {
    const {responses} = comment

    return (
      <>
        <Comment
          comment={comment}
          subjectType={subjectType}
          currentRoute={currentRoute}
          currentPlanId={planId as string}
          handleCommentDelete={handleCommentDelete}
          handleCommentEditSubmit={handleCommentEditSubmit}
          handleCommentReplySubmit={handleCommentReplySubmit}
          editedCommentIsLoading={editedCommentIsLoading}
          editedCommentIsSuccess={editedCommentIsSuccess}
          replyCommentIsLoading={replyCommentIsLoading}
          replyCommentIsSuccess={replyCommentIsSuccess}
        />

        {/* Recursion used here to display nested responses with expected left margin */}
        {responses && responses.length > 0 && responses.map(response => (
          <div key={response.comment_ref} className='flex flex-col gap-[9px] ml-[50px]'>
            {renderComment(response, subjectType)}
          </div>
        ))}
      </>
    )
  }

  const renderCommentSection = (highLevelComment: DirectoryCommentHighLevel, index = 0) => {
    const {subject_type: subjectType, comments} = highLevelComment

    return (
      <section key={index} className='mb-[36px]' data-testid='comment-section'>
        {shouldDisplayCommentSectionHeading && <h3 data-testid='section-header' className='font-modal-heading'>{(subjectType).toUpperCase()}</h3>}

        <div className='flex flex-col gap-[9px] w-[100%]'>
          {comments.map(comment => (
            <div key={comment.comment_ref} className={'flex flex-col gap-[9px]'}>
              {renderComment(comment, subjectType)}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className='mb-[10px] w-[620px]'>
      {/* Adding a max-height allows us to fix the AutosizeTextArea and border at the bottom of the modal */}
      <section ref={commentsContainerRef} className={`ml-[32px] mr-[5px] pt-[30px] overflow-auto scrollbar-hidden min-h-[6vh] ${isSingleView ? 'max-h-[42vh]' : 'max-h-[65vh]'}`}>
        {entityComments && entityComments?.comments.length > 0 && renderCommentSection(entityComments)}
        {lowerComments && lowerComments?.length > 0 && lowerComments.map((highLevelComment, index) => renderCommentSection(highLevelComment, index))}
        { (!entityComments || entityComments.comments.length === 0) && (!lowerComments || lowerComments.length === 0) && <i className='font-body-4'>No comments to view</i>}
      </section>

      {hasRequiredPermission(UserPermissions.MERCHANT_DATA_READ_WRITE) && (
        <section className='border-t-[1px] border-grey-200 dark:border-grey-800 pt-[22px] px-[10px]'>
          <AutosizeTextArea accessibilityLabel='Add comment' placeholder='Add a comment' submitHandler={handleCommentSubmit} shouldClearText={newCommentIsSuccess && !newCommentIsLoading} />
        </section>
      )}
    </div>
  )
}

export default Comments
