import React from 'react'
import {render, screen} from '@testing-library/react'
import Comments from 'components/Comments'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='subject-icon' />)

describe('Comments', () => {
  const mockEntityCommentSubjectType = 'mock_entity_comment_subject_type'
  const mockEntityCommentCreatedBy = 'mock_entity_comment_created_by'
  const mockEntityCommentSubject1Text = 'mock_entity_comment_subject_1_text'
  const mockEntityCommentSubject2Text = 'mock_entity_comment_subject_2_text'
  const mockEntityCommentMetadataText = 'mock_entity_comment_metadata_text'

  const mockComment = {
    subject_type: mockEntityCommentSubjectType,
    comments: [
      {
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
      },
    ],
  }

  const mockComments = {
    entity_comments: mockComment,
    lower_comments: [],
  }

  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  useRouter.mockImplementation(() => ({
    asPath: '',
  }))

  const mockProps = {
    comments: mockComments,
  }

  const getCommentsComponent = (passedProps = {}) => {
    return (
      <Comments {...mockProps} {...passedProps} />
    )
  }

  describe('Test rendered elements', () => {
    it('should render high level comment section', () => {
      render(getCommentsComponent())
      expect(screen.getByTestId('comment-section')).toBeInTheDocument()
    })

    describe('Test comment section header', () => {
      it('should not render the comment section header', () => {
        render(getCommentsComponent())
        expect(screen.queryByTestId('section-header')).not.toBeInTheDocument()
      })

      it('should render the comment section header', () => {
        const comments = {
          ...mockComments,
        }

        comments.lower_comments = [mockComment]
        render(getCommentsComponent({comments}))
        const commentSectionHeaders = screen.queryAllByTestId('section-header')
        expect(commentSectionHeaders).toHaveLength(2)
      })
    })

    it('should render the comment date and options icon', () => {
      render(getCommentsComponent())
      expect(screen.getByText('Dec 14, 2021')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /Options/})).toBeInTheDocument()
    })

    it('should render comment metadata and reply icon', () => {
      render(getCommentsComponent())
      expect(screen.getByText(mockEntityCommentCreatedBy)).toBeInTheDocument()
      expect(screen.getByText(mockEntityCommentMetadataText)).toBeInTheDocument()
      expect(screen.getByRole('button', {name: /Reply/})).toBeInTheDocument()
    })

    it('should render the Add Comment button', () => {
      render(getCommentsComponent())
      expect(screen.getByRole('button', {name: /Add Comment/})).toBeInTheDocument()
    })

    describe('Test subjects', () => {
      describe('Test multiple subjects', () => {
        it('should render comments multiple subject data', () => {
          render(getCommentsComponent())
          expect(screen.getByText(`${mockEntityCommentSubject1Text}, ${mockEntityCommentSubject2Text}`)).toBeInTheDocument()
          expect(screen.getByRole('button', {name: /(see subjects +)/})).toBeInTheDocument()
        })
      })

      describe('Test single subject', () => {
        it('should render comments singular subject data', () => {
          const comments = {
            ...mockComments,
          }

          comments.entity_comments.comments[0].subjects = [{
            display_text: mockEntityCommentSubject1Text,
            href: '/e2a26b5a-284d-11ed-a261-0242ac120002',
            icon_slug: 'mock_slug',
          }]
          render(getCommentsComponent({comments}))
          expect(screen.getByTestId('subject-icon')).toBeInTheDocument()
          expect(screen.getByTestId('subject-link')).toBeInTheDocument()
          expect(screen.getByText(mockEntityCommentSubject1Text)).toBeInTheDocument()
        })
      })
    })
  })
})
