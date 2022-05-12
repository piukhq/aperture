import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMidModal} from 'components'
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

const mockPaymentScheme = 'mock_payment_scheme'
const mockMidValue = 'mock_mid_value'
const mockBinValue = 'mock_bin_value'

const mockNewGenericMidState = {
  directoryMid: {
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
        directoryMid: {
          selectedPaymentScheme: PaymentSchemeName.VISA,
        },
      })

      render(getDirectoryMidModalComponent(visaStore))
      const binInput = screen.getByLabelText('BIN')

      expect(binInput).toBeInTheDocument()
      expect(binInput).toHaveValue('mock_bin_value')
    })
  })
})
