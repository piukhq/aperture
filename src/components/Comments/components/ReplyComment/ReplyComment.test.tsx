import React from 'react'
import {render, screen} from '@testing-library/react'
import ReplyComment from 'components/Comments/components/ReplyComment'

jest.mock('components/AutosizeTextArea', () => () => <div data-testid='reply-comment-text-area' />)

describe('ReplyComment', () => {
  const mockEntityCommentCreatedBy = 'mock_entity_comment_created_by'
  const mockEntityCommentSubject1Text = 'mock_entity_comment_subject_1_text'
  const mockEntityCommentSubject2Text = 'mock_entity_comment_subject_2_text'
  const mockEntityCommentSubject1Ref = 'mock_entity_comment_subject_1_ref'
  const mockEntityCommentSubject2Ref = 'mock_entity_comment_subject_2_ref'

  const mockProps = {
    createdBy: mockEntityCommentCreatedBy,
    subjects: [
      {
        display_text: mockEntityCommentSubject1Text,
        subject_ref: mockEntityCommentSubject1Ref,
        icon_slug: null,
      },
      {
        display_text: mockEntityCommentSubject2Text,
        subject_ref: mockEntityCommentSubject2Ref,
        icon_slug: null,
      },
    ],
    handleCommentReplySubmit: jest.fn(),
    commentRef: 'mock_ref',
  }

  const getReplyCommentComponent = (passedProps = {}) => {
    return (
      <ReplyComment {...mockProps} {...passedProps} />
    )
  }

  describe('Test rendered elements', () => {
    it('should render comment response metadata', () => {
      render(getReplyCommentComponent())
      expect(screen.getByText('Replying to')).toBeInTheDocument()
      expect(screen.getByText(`${mockEntityCommentCreatedBy}`)).toBeInTheDocument()
      expect(screen.getByText('in')).toBeInTheDocument()
      expect(screen.getByText(`${mockEntityCommentSubject1Text}, ${mockEntityCommentSubject2Text}`)).toBeInTheDocument()
    })

    it('should render the AutosizeTextArea component', () => {
      render(getReplyCommentComponent())
      expect(screen.getByTestId('reply-comment-text-area')).toBeInTheDocument()
    })

    it('should render a single subject', () => {
      const mockSingleSubject = [
        {
          display_text: mockEntityCommentSubject1Text,
          subject_ref: mockEntityCommentSubject1Ref,
          icon_slug: null,
        },
      ]
      render(getReplyCommentComponent({subjects: mockSingleSubject}))

      expect(screen.getByText(`${mockEntityCommentSubject1Text}`)).toBeInTheDocument()
      expect(screen.queryByText(`${mockEntityCommentSubject2Text}`)).not.toBeInTheDocument()
      expect(screen.queryByText('see subjects +')).not.toBeInTheDocument()

    })

    describe('Test error section', () => {
      it('should render the error section', () => {
        render(getReplyCommentComponent())
        expect(screen.getByTestId('error-message-section')).toBeInTheDocument()
      })

      it('should render the error message', () => {
        React.useState = jest
          .fn()
          .mockReturnValueOnce([false, jest.fn()]) // isSubjectListExpanded
          .mockReturnValueOnce([[], jest.fn()]) // checkedSubjectRefs
          .mockReturnValueOnce([true, jest.fn()]) // noSubjectsValidationIsError

        render(getReplyCommentComponent())
        expect(screen.getByTestId('error-message')).toBeInTheDocument()
        expect(screen.getByText('No subject selected')).toBeInTheDocument()
      })

      it('should not render the error message', () => {
        React.useState = jest.fn()
          .mockReturnValueOnce([false, jest.fn()]) // isSubjectListExpanded
          .mockReturnValueOnce([[], jest.fn()]) // checkedSubjectRefs
          .mockReturnValueOnce([false, jest.fn()]) // noSubjectsValidationIsError

        render(getReplyCommentComponent())
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
      })
    })

    describe('Test expanded subject list', () => {
      beforeEach(() => {
        jest.clearAllMocks()

        React.useState = jest.fn()
          .mockReturnValueOnce([true, jest.fn()]) // isSubjectListExpanded
          .mockReturnValueOnce([[], jest.fn()]) // checkedSubjectRefs
          .mockReturnValueOnce([false, jest.fn()]) // noSubjectsValidationIsError
      })

      it('should render the expanded subject list', () => {
        render(getReplyCommentComponent())
        expect(screen.getByTestId('expanded-subjects')).toBeInTheDocument()
      })

      it('should render the correct checkbox items', () => {
        render(getReplyCommentComponent())
        expect(screen.getByTestId(`${mockEntityCommentSubject1Ref}-subject-checkbox`)).toBeInTheDocument()
        expect(screen.getByTestId(`${mockEntityCommentSubject2Ref}-subject-checkbox`)).toBeInTheDocument()
      })

      it('should render the see less prompt', () => {
        render(getReplyCommentComponent())
        expect(screen.queryByText('(see less -)')).toBeInTheDocument()
      })
    })
  })


})
