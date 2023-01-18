import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectorySecondaryMidModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, unknown>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

const mockPostMerchantSecondaryMid = jest.fn()

jest.mock('hooks/useMidManagementSecondaryMids', () => ({
  useMidManagementSecondaryMids: jest.fn().mockImplementation(() => ({
    postMerchantSecondaryMid: mockPostMerchantSecondaryMid,
    postMerchantSecondaryMidResponse: null,
    postMerchantSecondaryMidError: null,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
    merchantId: 'mock_merchant_id',
  },
}))

const mockPaymentScheme = 'mock_payment_scheme'
const mockSecondaryMidValue = 'mock_psimi_value'

const mockNewGenericMerchantState = {
  directoryMerchant: {
    selectedPaymentScheme: mockPaymentScheme,
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewGenericMerchantState})

const getDirectorySecondaryMidModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectorySecondaryMidModal />
  </Provider>
)

describe('DirectorySecondaryMidModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest.fn()
      .mockReturnValueOnce([mockSecondaryMidValue, setStateMock]) // secondaryMidValue
      .mockReturnValueOnce([null, setStateMock]) // secondaryMidValidationError
      .mockReturnValueOnce([false, setStateMock]) // isOnboardRequired
  })

  it('should render the correct heading', () => {
    render(getDirectorySecondaryMidModalComponent())
    const heading = screen.getByRole('heading', {
      name: `New ${mockPaymentScheme} Secondary MID`,
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the Secondary MID input with correct label', () => {
    render(getDirectorySecondaryMidModalComponent())
    const secondaryMidInput = screen.getByLabelText('Secondary MID')

    expect(secondaryMidInput).toBeInTheDocument()
    expect(secondaryMidInput).toHaveValue(mockSecondaryMidValue)
  })

  it('should render the Add Secondary MID button', () => {
    render(getDirectorySecondaryMidModalComponent())
    const addSecondaryMidButton = screen.getByRole('button', {
      name: 'Add Secondary MID',
    })

    expect(addSecondaryMidButton).toBeInTheDocument()
  })

  it('should render the Add & Onboard Secondary MID button', () => {
    render(getDirectorySecondaryMidModalComponent())
    const addSecondaryMidOnboardButton = screen.getByRole('button', {
      name: 'Add & Onboard Secondary MID',
    })

    expect(addSecondaryMidOnboardButton).toBeInTheDocument()
  })

  describe('Test button functionality', () => {
    it('should call the postMerchantSecondaryMid function when the Add Secondary MID button is clicked', () => {
      render(getDirectorySecondaryMidModalComponent())
      fireEvent.click(screen.getByRole('button', {
        name: 'Add Secondary MID',
      }))

      expect(mockPostMerchantSecondaryMid).toHaveBeenCalledTimes(1)
    })

    it('should call the postMerchantSecondaryMid function when the Add & Onboard Secondary MID button is clicked', () => {
      render(getDirectorySecondaryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add & Onboard Secondary MID',
      }))

      expect(mockPostMerchantSecondaryMid).toHaveBeenCalledTimes(1)
    })
  })


  describe('Test error scenarios', () => {
    const mockSecondaryMidErrorMessage = 'mock_psimi_error'

    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest.fn()
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([mockSecondaryMidErrorMessage, setStateMock])
        .mockReturnValueOnce([false, setStateMock])
    })

    it('should not call the Post Merchant Secondary MID API when Add Secondary MID button is clicked', () => {
      render(getDirectorySecondaryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add Secondary MID',
      }))
      expect(mockPostMerchantSecondaryMid).not.toHaveBeenCalled()
    })


    it('should render Secondary MID field error message on Add Secondary MID button click', () => {
      render(getDirectorySecondaryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add Secondary MID',
      }))

      const secondaryMidErrorElement = screen.getByTestId('secondary-mid-input-error')
      const secondaryMidErrorText = screen.getByText(mockSecondaryMidErrorMessage)

      expect(secondaryMidErrorElement).toBeInTheDocument()
      expect(secondaryMidErrorText).toBeInTheDocument()
    })

    it('should render Secondary MID field error message on Add & Onboard Secondary MID button click', () => {
      render(getDirectorySecondaryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add & Onboard Secondary MID',
      }))

      const secondaryMidErrorElement = screen.getByTestId('secondary-mid-input-error')
      const secondaryMidErrorText = screen.getByText(mockSecondaryMidErrorMessage)

      expect(secondaryMidErrorElement).toBeInTheDocument()
      expect(secondaryMidErrorText).toBeInTheDocument()
    })
  })
})
