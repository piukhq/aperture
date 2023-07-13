import React from 'react'
import {render, screen} from '@testing-library/react'
import DirectoryCommentsModal from './DirectoryCommentsModal'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

const mockComment = {}

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, React.ReactNode>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

const mockCommentsFromApi = {
  getCommentsResponse: {
    comments: [mockComment],
  },
  getCommentsIsLoading: false,
  getCommentsError: Error(''),
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

const mockCommentsInitialState = {
  directoryComments: {
    commentsModalHeader: '',
    commentsRef: '',
    commentsOwnerRef: '',
    commentsSubjectType: '',
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockCommentsInitialState})

const getDirectoryCommentsModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryCommentsModal />
  </Provider>
)


describe('DirectoryCommentsModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Comments component', () => {
    render(getDirectoryCommentsModalComponent())
    expect(screen.queryByTestId('comments')).toBeInTheDocument()
  })

  it('should render the loading copy if the comments are loading', () => {
    mockCommentsFromApi.getCommentsIsLoading = true,
    render(getDirectoryCommentsModalComponent())
    expect(screen.queryByText('Comments loading ...')).toBeInTheDocument()
  })


  it('should render the error copy if there is an error', () => {
    mockCommentsFromApi.getCommentsError = new Error('Error loading comments')
    render(getDirectoryCommentsModalComponent())
    expect(screen.queryByText('Error retrieving comments, try again later')).toBeInTheDocument()
  })
})
