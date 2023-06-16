import {useCallback, useState} from 'react'
import {PaymentCardIcon, AutosizeTextArea} from 'components'
import {DirectoryCommentSubject} from 'types'
import {PaymentSchemeSlug} from 'utils/enums'

type Props = {
  createdBy: string
  subjects: Array<DirectoryCommentSubject>
  handleCommentReplySubmit: (
    commentRef: string,
    comment: string,
    subjectRefs: Array<string>
  ) => void
  commentRef: string
}

const ReplyComment = ({
  createdBy,
  subjects,
  handleCommentReplySubmit,
  commentRef,
}: Props) => {
  const [isSubjectListExpanded, setIsSubjectListExpanded] = useState<boolean>(false)
  const [checkedSubjectRefs, setCheckedSubjectRefs] = useState(subjects.map(subject => subject.subject_ref))
  const [noSubjectsValidationIsError, setNoSubjectsValidationIsError] = useState<boolean>(false)

  const renderSubjectMetadata = ({displayText, iconSlug, shouldTruncate = false}) => (
    <>
      <h4 className={`font-bold font-body-4 ${shouldTruncate && 'truncate'}`}>
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

  const renderSubjects = () => {
    const renderSingleSubject = () => {
      const {display_text: displayText, icon_slug: iconSlug} = subjects[0]

      return (
        <div className='flex truncate items-center'>
          {renderSubjectMetadata({displayText, iconSlug, shouldTruncate: true})}
        </div>
      )
    }

    const renderMultipleSubjects = () => {
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

  const handleCheckboxChange = (subjectRef: string) => {
    setNoSubjectsValidationIsError(false)

    const index = checkedSubjectRefs.findIndex(storedRef => storedRef === subjectRef)
    if (index === -1) {
      setCheckedSubjectRefs(prevState => [...prevState, subjectRef])
    } else {
      setCheckedSubjectRefs(checkedSubjectRefs.filter(selectedRef => selectedRef !== subjectRef))
    }
  }

  const renderExpandedSubjects = () => {
    return (
      <div data-testid='expanded-subjects' className='flex flex-col ml-[30px] mb-[10px]'>
        {subjects.map((subject, index) => {
          const {display_text: displayText, icon_slug: iconSlug, subject_ref: subjectRef} = subject

          const isChecked = checkedSubjectRefs.includes(subjectRef)

          return (
            <div data-testid={`${subjectRef}-subject-checkbox`} key={index} className='flex items-center'>
              <label className='flex items-center font-body-4 font-bold mr-[2px]'>
                <input type='checkbox' className='flex mr-[6px] h-[16px] w-[16px]' checked={isChecked} onChange={() => handleCheckboxChange(subjectRef)} />
                {renderSubjectMetadata({displayText, iconSlug})}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  const handleReplySubmit = useCallback((comment: string) => {
    if (checkedSubjectRefs.length !== 0) {
      handleCommentReplySubmit(commentRef, comment, checkedSubjectRefs)
    } else {
      setNoSubjectsValidationIsError(true)
    }
  }, [checkedSubjectRefs, handleCommentReplySubmit, commentRef])

  return (
    <>
      <section className='truncate'>
        <span className='flex ml-[10px] mb-[8px] font-body-4 max-w-[calc(100%_-_20px)]'>
          <p className='mr-[4px]'>Replying to</p>
          <h4 className='font-bold truncate'>{createdBy}</h4>
          <p className='mx-[4px]'>in</p>
          {!isSubjectListExpanded && renderSubjects()}
          {isSubjectListExpanded && (
            <button onClick={() => setIsSubjectListExpanded(false)} className='font-bold text-commentsBlue'>
              (see less -)
            </button>
          )}
        </span>
        {isSubjectListExpanded && renderExpandedSubjects()}
      </section>

      <section>
        <AutosizeTextArea accessibilityLabel='Add a reply' placeholder='Add a reply' submitHandler={handleReplySubmit} />
      </section>

      <section data-testid='error-message-section' className='h-[20px] ml-[16px] pt-[5px]'>
        {noSubjectsValidationIsError && (
          <p role='alert' data-testid='error-message' className='font-body-4 text-red'>No subject selected</p>
        )}
      </section>
    </>
  )
}

export default ReplyComment
