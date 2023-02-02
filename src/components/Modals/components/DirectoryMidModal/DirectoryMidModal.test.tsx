import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectoryMidModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {PaymentSchemeName} from 'utils/enums'

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

jest.mock('hooks/useMidManagementMids', () => ({
  useMidManagementMids: jest.fn().mockImplementation(() => ({
    postMerchantMid: jest.fn(),
    postMerchantMidResponse: null,
    postMerchantMidError: null,
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
const mockMidValue = 'mock_mid_value'
const mockBinValue = 'mock_bin_value'

const mockNewGenericMidState = {
  directoryMerchant: {
    selectedPaymentScheme: mockPaymentScheme,
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewGenericMidState})

const getDirectoryMidModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMidModal />
  </Provider>
)

describe('DirectoryMidModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest.fn()
      .mockReturnValueOnce([mockMidValue, setStateMock]) // midValue
      .mockReturnValueOnce([mockBinValue, setStateMock]) // binValue
      .mockReturnValueOnce([null, setStateMock]) // midValidationError
      .mockReturnValueOnce([false, setStateMock]) // isOffboardRequired
      .mockReturnValueOnce([false, setStateMock]) // isCloseButtonFocused
  })

  describe('Test common behaviour', () => {
    it('should render the correct Heading', () => {
      render(getDirectoryMidModalComponent())
      const heading = screen.getByRole('heading', {
        name: `New ${mockPaymentScheme} MID`,
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the MID input with correct label', () => {
      render(getDirectoryMidModalComponent())
      const midInput = screen.getByLabelText('MID')

      expect(midInput).toBeInTheDocument()
      expect(midInput).toHaveValue(mockMidValue)
    })

    it('should render the Add MID button', () => {
      render(getDirectoryMidModalComponent())
      const addMidButton = screen.getByRole('button', {
        name: 'Add MID',
      })

      expect(addMidButton).toBeInTheDocument()
    })

    it('should render the Add & Onboard MID button', () => {
      render(getDirectoryMidModalComponent())
      const addMidOnboardButton = screen.getByRole('button', {
        name: 'Add & Onboard MID',
      })

      expect(addMidOnboardButton).toBeInTheDocument()
    })
  })

  describe('Test non-Visa payment scheme behaviour', () => {
    it('should not render the BIN input', () => {
      render(getDirectoryMidModalComponent())
      const binInput = screen.queryByLabelText('BIN')

      expect(binInput).not.toBeInTheDocument()
    })
  })

  describe('Test Visa payment scheme specific behaviour', () => {
    it('should render the BIN input with correct label', () => {
      const visaStore = mockStoreFn({
        directoryMerchant: {
          selectedPaymentScheme: PaymentSchemeName.VISA,
        },
      })

      render(getDirectoryMidModalComponent(visaStore))
      const binInput = screen.getByLabelText('BIN')

      expect(binInput).toBeInTheDocument()
      expect(binInput).toHaveValue(mockBinValue)
    })
  })

  describe('Test error scenarios', () => {
    const mockMidErrorMessage = 'mock_mid_error'

    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest.fn()
        .mockReturnValueOnce(['', setStateMock]) // midValue
        .mockReturnValueOnce(['', setStateMock]) // binValue
        .mockReturnValueOnce([mockMidErrorMessage, setStateMock]) // midValidationError
        .mockReturnValueOnce([false, setStateMock]) // isOffboardRequired
        .mockReturnValueOnce([false, setStateMock]) // isCloseButtonFocused
    })

    it('should render mid field error message on Add MID button click', () => {
      render(getDirectoryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add MID',
      }))

      const midErrorElement = screen.getByTestId('mid-input-error')
      const midErrorText = screen.getByText(mockMidErrorMessage)

      expect(midErrorElement).toBeInTheDocument()
      expect(midErrorText).toBeInTheDocument()
    })

    it('should render mid field error message on Add & Onboard MID button click', () => {
      render(getDirectoryMidModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add & Onboard MID',
      }))

      const midErrorElement = screen.getByTestId('mid-input-error')
      const midErrorText = screen.getByText(mockMidErrorMessage)

      expect(midErrorElement).toBeInTheDocument()
      expect(midErrorText).toBeInTheDocument()
    })
  })
})
