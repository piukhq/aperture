import {useCallback, useEffect, useState} from 'react'
import {Button, OptionsMenuButton, PaymentCardIcon, AutosizeTextArea} from 'components'
import {ButtonWidth, ButtonSize} from 'components/Button/styles'
import {DirectoryComment, DirectoryCommentSubject, OptionsMenuItems} from 'types'
import {isoToDateTime} from 'utils/dateFormat'
import ForwardSvg from 'icons/svgs/forward.svg'
import {CommentsSubjectTypes, DirectoryNavigationTab, PaymentSchemeCode} from 'utils/enums'
import EditSvg from 'icons/svgs/project.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import ReplyComment from '../ReplyComment'

type Props = {
  comment: DirectoryComment
  subjectType: string
  currentRoute: string
  currentPlanId: string
  handleCommentDelete: (commentRef: string) => void
  handleCommentEditSubmit: (commentRef: string, comment: string) => void
  handleCommentReplySubmit: (
    commentRef: string,
    comment: string,
    subjectRefs: Array<string>,
    subjectType: CommentsSubjectTypes
  ) => void
  editedCommentIsLoading: boolean
  editedCommentIsSuccess: boolean
  replyCommentIsLoading: boolean,
  replyCommentIsSuccess: boolean,
}

const commentStyles = 'bg-grey-300 dark:bg-grey-800 rounded-[20px] min-h-[71px] p-[13px] pt-[6px] self-end w-[100%] min-w-[250px]'

const Comment = ({
  comment,
  subjectType,
  currentRoute,
  currentPlanId,
  handleCommentDelete,
  handleCommentEditSubmit,
  editedCommentIsLoading,
  editedCommentIsSuccess,
  handleCommentReplySubmit,
  replyCommentIsLoading,
  replyCommentIsSuccess,
}: Props) => {
  const {comment_ref: commentRef, created_by: createdBy, created_at: createdAt, subjects, metadata, is_deleted: isDeleted, is_edited: isEdited} = comment
  const {owner_ref: ownerRef, text} = metadata

  const [isSubjectListExpanded, setIsSubjectListExpanded] = useState(false)
  const [isInEditState, setIsInEditState] = useState(false)
  const [isInCommentReplyState, setIsInCommentReplyState] = useState(false)

  const optionsMenuItems: OptionsMenuItems = [
    {
      label: 'Edit',
      icon: <EditSvg/>,
      clickHandler: () => setIsInEditState(true),
    },
    {
      label: 'Delete',
      icon: <DeleteSvg/>,
      isRed: true,
      clickHandler: () => handleCommentDelete(commentRef),
    },
  ]

  useEffect(() => {
    if (editedCommentIsSuccess && !editedCommentIsLoading) {
      setIsInEditState(false)
    }
  }, [editedCommentIsSuccess, editedCommentIsLoading])

  const constructSubjectLinkSuffix = (subjectRef: string) => {
    // owner_ref is used in scenarios where the parent ref may not be known
    switch (subjectType) {
      case CommentsSubjectTypes.PLAN:
        return subjectRef
      case CommentsSubjectTypes.MERCHANT:
        return `${ownerRef}/${subjectRef}?tab=${DirectoryNavigationTab.MIDS}`
      case CommentsSubjectTypes.MID:
        return `${currentPlanId}/${ownerRef}?tab=${DirectoryNavigationTab.MIDS}&ref=${subjectRef}`
      case CommentsSubjectTypes.LOCATION:
        return `${currentPlanId}/${ownerRef}?tab=${DirectoryNavigationTab.LOCATIONS}&ref=${subjectRef}`
      case CommentsSubjectTypes.SECONDARY_MID:
        return `${currentPlanId}/${ownerRef}?tab=${DirectoryNavigationTab.SECONDARY_MIDS}&ref=${subjectRef}`
      case CommentsSubjectTypes.PSIMI:
        return `${currentPlanId}/${ownerRef}?tab=${DirectoryNavigationTab.IDENTIFIERS}&ref=${subjectRef}`
      default: return ''
    }
  }

  const renderSubjects = (subjects: DirectoryCommentSubject[]) => {
    const renderSubjectMetadata = ({displayText, iconSlug, shouldTruncate = false}) => (
      <>
        <h4 className={`font-bold ${shouldTruncate && 'truncate'}`}>
          {displayText}
        </h4>

        {iconSlug && (
          <PaymentCardIcon
            paymentSchemeSlug={PaymentSchemeSlug[iconSlug.toUpperCase()]}
            paymentSchemeIconStyles='flex min-w-[17px] min-h-[12px] w-[17px] h-[12px] justify-center mx-[2px] items-center rounded-[2px]'
          />
        )}
      </>
    )

    const renderLink = ({subjectRef, displayText, iconSlug, shouldTruncate = false, index = 0}) => {
      return (
        <a key={index} data-testid='subject-link' className={`flex text-commentsBlue items-center ${shouldTruncate && 'truncate'}`} href={`/mid-management/directory/${constructSubjectLinkSuffix(subjectRef)}`}>
          {renderSubjectMetadata({displayText, iconSlug, shouldTruncate})}
        </a>
      )
    }

    const renderSingleSubject = () => {
      const {subject_ref: subjectRef, display_text: displayText, icon_slug: iconSlug} = subjects[0]

      // Should not render a link if user is already on the same route
      if (!currentRoute.includes(subjectRef)) {
        return renderLink({subjectRef, displayText, iconSlug, shouldTruncate: true})
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
                const {subject_ref: subjectRef, display_text: displayText, icon_slug: iconSlug} = subject

                if (!currentRoute.includes(subjectRef)) {
                  return renderLink({index, subjectRef, displayText, iconSlug})
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

    return subjects.length === 1 ? renderSingleSubject() : renderMultipleSubjects()
  }

  const onEditCommentSubmit = useCallback((editedComment: string) => {
    handleCommentEditSubmit(commentRef, editedComment)
  }, [handleCommentEditSubmit, commentRef])

  const handleOnBlur = useCallback(() => {
    setIsInEditState(false)
  }, [])

  const renderCommentContent = () => {
    if (isDeleted) {
      return <p data-testid='comment-deleted-message' className='font-body-3 italic'>This comment has been deleted</p>
    } else if (isInEditState) {
      return (
        <AutosizeTextArea accessibilityLabel='Edit comment' placeholder='Edit comment' prePopulatedValue={text} submitHandler={onEditCommentSubmit} onBlurHandler={handleOnBlur} />
      )
    }
    return <p className='font-body-3 break-words'>{text}</p>
  }

  const renderComment = () => (
    <div className={`${commentStyles}`}>
      <div className='flex justify-between'>
        {/* Max width calc used here to set width of single line subjects, to allow for truncation when appropriate, based on other rendered elements */}
        <span className={`flex whitespace-nowrap font-heading-7 font-normal ${isEdited ? 'max-w-[calc(100%_-_156px)]' : 'max-w-[calc(100%_-_106px)]'}`}>
          <h4 className='font-bold truncate'>{createdBy}</h4>
          <p className='mx-[4px]'>in</p>
          {subjects.length > 0 && renderSubjects(subjects)}
        </span>

        <div className={`flex items-start mt-[2px] ${isEdited ? 'min-w-[154px]' : 'min-w-[104px]'}`}>
          <div className='flex gap-[19px] items-center'>
            <div className='flex items-center gap-[5px]'>
              {isEdited && (
                <p data-testid='comment-edited-label' className='font-subheading-4 tracking-[.005rem]'>(Edited)</p>
              )}
              <p className='font-subheading-4 tracking-[.005rem]'>{isoToDateTime(createdAt, true)}</p>
            </div>

            {!isDeleted && (
              <div className='flex justify-center w-[15px]'>
                <OptionsMenuButton
                  optionsMenuItems={optionsMenuItems}
                  buttonWidth={ButtonWidth.ICON_ONLY}
                  buttonSize={ButtonSize.INHERIT}
                  buttonAdditionalStyles='border-none'
                  iconStyles='h-[11px] w-[11px]'
                  shouldOnlyDisplayLeft={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-row justify-between mt-[4px]'>
        {renderCommentContent()}

        {!isInEditState && (
          <Button
            handleClick={() => setIsInCommentReplyState(true)}
            buttonSize={ButtonSize.INHERIT}
            buttonWidth={ButtonWidth.ICON_ONLY}
            additionalStyles='ml-[3px] h-[20px] w-[20px] self-end'
            ariaLabel='Reply'
          >
            <ForwardSvg className='h-[20px] w-[20px] scale-x-flip fill-grey-600' />
          </Button>
        )}
      </div>
    </div>
  )

  const handleCommentReply = (commentRef: string, comment: string, subjectRefs: Array<string>) => {
    handleCommentReplySubmit(commentRef, comment, subjectRefs, subjectType)
  }

  const renderReplyComment = () => (
    <div className={`${commentStyles}`}>
      {/* TODO: Change ref to comment_ref */}
      <ReplyComment createdBy={createdBy} subjects={subjects} handleCommentReplySubmit={handleCommentReply} commentRef={ref} />
    </div>
  )

  return (
    <div className='flex flex-col gap-[9px]'>
      {renderComment()}

      {isInCommentReplyState && (
        <div className='ml-[50px]'>
          {renderReplyComment()}
        </div>
      )}
    </div>
  )
}

export default Comment
