import React from 'react'
import {render, screen} from '@testing-library/react'
import Comments from 'components/Comments'
import {CommentsOwnerTypes, CommentsSubjectTypes} from 'utils/enums'
import {DirectoryComments} from 'types'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='subject-icon' />)
jest.mock('components/Comments/components/Comment', () => () => <div data-testid='comment' />)
jest.mock('components/AutosizeTextArea', () => () => <div data-testid='autosize-text-area' />)

describe('Comments', () => {
  const mockEntityCommentCreatedBy = 'mock_entity_comment_created_by'
  const mockEntityCommentSubject1Text = 'mock_entity_comment_subject_1_text'
  const mockEntityCommentSubject2Text = 'mock_entity_comment_subject_2_text'
  const mockEntityCommentMetadataText = 'mock_entity_comment_metadata_text'

  const mockComment = {
    subject_type: CommentsSubjectTypes.PLAN,
    comments: [
      {
        comment_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        created_at: '2021-12-14T08:57:43.790Z',
        created_by: mockEntityCommentCreatedBy,
        is_edited: false,
        is_deleted: false,
        subjects: [
          {
            display_text: mockEntityCommentSubject1Text,
            subject_ref: '/e2a26b5a-284d-11ed-a261-0242ac120002',
            icon_slug: '',
          },
          {
            display_text: mockEntityCommentSubject2Text,
            subject_ref: '/e2a26b5a-284d-11ed-a261-0242ac120002',
            icon_slug: '',
          },
        ],
        metadata: {
          owner_ref: 'e2a26b5a-284d-11ed-a261-0242ac120002',
          owner_type: CommentsOwnerTypes.PLAN,
          text: mockEntityCommentMetadataText,
        },
        responses: [],
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
    query: {planId: ''},
  }))

  const mockProps = {
    comments: mockComments,
    handleCommentSubmit: jest.fn(),
    handleCommentDelete: jest.fn(),
    handleCommentEditSubmit: jest.fn(),
    handleCommentReplySubmit: jest.fn(),
    newCommentIsLoading: false,
    newCommentIsSuccess: false,
    editedCommentIsLoading: false,
    editedCommentIsSuccess: false,
    replyCommentIsLoading: false,
    replyCommentIsSuccess: false,
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

      it('should render the comment section headers and Comment components', () => {
        const comments = {
          ...mockComments,
        } as unknown as DirectoryComments

        comments.lower_comments = [mockComment]
        render(getCommentsComponent({comments}))
        const commentSectionHeaders = screen.queryAllByTestId('section-header')
        expect(commentSectionHeaders).toHaveLength(2)
        const commentComponents = screen.queryAllByTestId('comment')
        expect(commentComponents).toHaveLength(2)
      })
    })

    it('should render the Add Comment button', () => {
      render(getCommentsComponent())
      expect(screen.getByTestId('autosize-text-area')).toBeInTheDocument()
    })

    it('should show the correct message when there are no comments', () => {
      const comments = {
        entity_comments: {
          subject_type: CommentsSubjectTypes.PLAN,
          comments: [],
        },
        lower_comments: [],
      }

      render(getCommentsComponent({comments}))
      expect(screen.getByText('No comments to view')).toBeInTheDocument()
    })
  })
})
