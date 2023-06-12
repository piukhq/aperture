import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewComments from './SingleViewComments'
import {CommentsSubjectTypes} from 'utils/enums'

const mockComment = {}
const useRouter = jest.spyOn(require('next/router'), 'useRouter')

useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_ref',
    merchantId: 'mock_merchant_ref',
    tab: 'mids',
  },
  asPath: '/mid-management/plans/mock_plan_ref/merchants/mock_merchant_ref/mids',
}))

const mockCommentsFromApi = {
  getCommentsResponse: {
    comments: [mockComment],
  },
  getCommentsIsLoading: false,
  getCommentsError: null,
  postComment: jest.fn(),
  postCommentIsLoading: false,
  postCommentIsSuccess: false,
  deleteComment: jest.fn(),
  patchComment: jest.fn(),
  patchCommentIsLoading: false,
  patchCommentIsSuccess: false,
  postReplyComment: jest.fn(),
  postReplyCommentIsLoading: false,
  postReplyCommentIsSuccess: false,
}

jest.mock('hooks/useDirectoryComments', () => ({
  useDirectoryComments: jest.fn().mockImplementation(() => (mockCommentsFromApi)),
}))

jest.mock('components/Comments', () => () => <div data-testid='comments' />)

const getSingleViewCommentsComponent = (passedProps = {}) => (
  <SingleViewComments subjectType={CommentsSubjectTypes.MERCHANT} {...passedProps} />
)


describe('SingleViewComments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Comments component', () => {
    render(getSingleViewCommentsComponent())
    expect(screen.queryByTestId('comments')).toBeInTheDocument()
  })

  it('should render the loading copy if the comments are loading', () => {
    mockCommentsFromApi.getCommentsIsLoading = true,
    render(getSingleViewCommentsComponent())
    expect(screen.queryByText('Comments loading ...')).toBeInTheDocument()
  })

  it('should render the error copy if there is an error', () => {
    mockCommentsFromApi.getCommentsError = new Error('Error loading comments')
    render(getSingleViewCommentsComponent())
    expect(screen.queryByText('Error retrieving comments, try again later')).toBeInTheDocument()
  })
})
