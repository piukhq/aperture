import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {render, screen} from '@testing-library/react'
import BulkCommentModal from 'components/Modals/components/BulkCommentModal'

jest.mock('components/PaymentCardIcon', () => () => <div data-testid='subject-icon' />)
jest.mock('components/AutosizeTextArea', () => () => <div data-testid='autosize-text-area' />)

let mockCommentIsLoading = false
let mockCommentIsSuccess = false

jest.mock('hooks/useMidManagementComments', () => ({
  useMidManagementComments: jest.fn().mockImplementation(() => ({
    postComment: jest.fn(),
    postCommentIsLoading: mockCommentIsLoading,
    postCommentIsSuccess: mockCommentIsSuccess,
  })),
}))

const mockModalHeader = 'mock_modal_header'

const mockStoreFn = configureStore([])

const store = mockStoreFn({
  midManagementCommentsApi: {},
  directoryComments: {
    commentsModalHeader: mockModalHeader,
    commentsSubjectType: 'mock_subject_type',
  },
  directoryMerchant: {
    selectedEntityCheckedSelection: [
      {
        entityRef: 'mock_ref_1',
        entityValue: 'mock_value_1',
      },
      {
        entityRef: 'mock_ref_2',
        entityValue: 'mock_value_2',
      },
    ],
  },
})

const getBulkCommentModalComponent = () => {
  return (
    <Provider store={store}>
      <BulkCommentModal />
    </Provider>
  )
}

describe('BulkCommentModal', () => {
  describe('Test rendered subjects section', () => {
    it('should render the subjects section', () => {
      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('subjects-section')).toBeInTheDocument()
    })

    it('should render the correct number of subjects', () => {
      render(getBulkCommentModalComponent())
      expect(screen.getAllByTestId('subject')).toHaveLength(2)
    })
  })

  describe('Test rendered text area section elements', () => {
    it('should render the text area section', () => {
      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('text-area-section')).toBeInTheDocument()
    })

    it('should render the AutosizeTextArea component', () => {
      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('autosize-text-area')).toBeInTheDocument()
    })

    it('should render the success message', () => {
      mockCommentIsSuccess = true
      mockCommentIsLoading = false

      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('success-container')).toBeInTheDocument()
      expect(screen.getByText('Success - Comment added')).toBeInTheDocument()
    })
  })

  describe('Test rendered error message elements', () => {
    it('should render the error message  section', () => {
      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('error-message-section')).toBeInTheDocument()
    })

    it('should not render the error message', () => {
      render(getBulkCommentModalComponent())
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument()
    })

    it('should render the success message', () => {
      React.useState = jest.fn()
        .mockReturnValueOnce([[], jest.fn()]) // checkedRefs
        .mockReturnValueOnce([true, jest.fn()]) // noSubjectsValidationError

      render(getBulkCommentModalComponent())
      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByText('No subject selected')).toBeInTheDocument()
    })
  })
})
