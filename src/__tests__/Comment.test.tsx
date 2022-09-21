import React from 'react'
import {render, screen} from '@testing-library/react'
import Comment from 'components/Comments/components/Comment'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='subject-icon' />)

describe('Comment', () => {
  const mockEntityCommentCreatedBy = 'mock_entity_comment_created_by'
  const mockEntityCommentSubject1Text = 'mock_entity_comment_subject_1_text'
  const mockEntityCommentSubject2Text = 'mock_entity_comment_subject_2_text'
  const mockEntityCommentMetadataText = 'mock_entity_comment_metadata_text'

  const mockComment = {
    ref: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: '2021-12-14T08:57:43.790Z',
    created_by: mockEntityCommentCreatedBy,
    is_edited: false,
    is_deleted: false,
    subjects: [
      {
        display_text: mockEntityCommentSubject1Text,
        href: '/e2a26b5a-284d-11ed-a261-0242ac120002',
        icon_slug: null,
      },
      {
        display_text: mockEntityCommentSubject2Text,
        href: '/e2a26b5a-284d-11ed-a261-0242ac120002',
        icon_slug: null,
      },
    ],
    metadata: {
      comment_owner: 'e2a26b5a-284d-11ed-a261-0242ac120002',
      owner_type: 'plan',
      text: mockEntityCommentMetadataText,
    },
    responses: null,
  }

  const mockProps = {
    comment: mockComment,
    currentRoute: '',
    optionsMenuItems: [],
  }

  const getCommentComponent = (passedProps = {}) => {
    return (
      <Comment {...mockProps} {...passedProps} />
    )
  }

  describe('Test rendered elements', () => {
    it('should render the comment date and options icon', () => {
      render(getCommentComponent())
      expect(screen.getByText('Dec 14, 2021')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /Options/})).toBeInTheDocument()
    })

    it('should render comment metadata and reply icon', () => {
      render(getCommentComponent())
      expect(screen.getByText(mockEntityCommentCreatedBy)).toBeInTheDocument()
      expect(screen.getByText(mockEntityCommentMetadataText)).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /Reply/})).toBeInTheDocument()
    })

    describe('Test subjects', () => {
      describe('Test multiple subjects', () => {
        beforeEach(() => {
          jest.clearAllMocks()
        })

        it('should render the collapsed subjects', () => {
          React.useState = jest.fn().mockImplementation(() => [false, jest.fn()]) // isSubjectListExpanded

          render(getCommentComponent())
          expect(screen.getByText(`${mockEntityCommentSubject1Text}, ${mockEntityCommentSubject2Text}`)).toBeInTheDocument()
          expect(screen.getByRole('button', {name: /(see subjects +)/})).toBeInTheDocument()
        })

        it('should render the expanded subjects', () => {
          React.useState = jest.fn().mockImplementation(() => [true, jest.fn()]) // isSubjectListExpanded

          render(getCommentComponent())
          expect(screen.getByTestId('expanded-subjects')).toBeInTheDocument()
          expect(screen.getByText(mockEntityCommentSubject1Text)).toBeInTheDocument()
          expect(screen.getByText(mockEntityCommentSubject2Text)).toBeInTheDocument()
          expect(screen.getByRole('button', {name: /(see less -)/})).toBeInTheDocument()
        })
      })

      describe('Test single subject', () => {
        it('should render comments singular subject data', () => {
          const comment = {
            ...mockComment,
          }

          comment.subjects = [{
            display_text: mockEntityCommentSubject1Text,
            href: '/e2a26b5a-284d-11ed-a261-0242ac120002',
            icon_slug: 'mock_slug',
          }]
          render(getCommentComponent({comment}))
          expect(screen.getByTestId('subject-link')).toBeInTheDocument()
          expect(screen.getByText(mockEntityCommentSubject1Text)).toBeInTheDocument()
        })
      })
    })
  })
})
