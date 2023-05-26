import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectoryPsimiModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

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

const mockPostMerchantPsimi = jest.fn()

jest.mock('hooks/useMidManagementPsimis', () => ({
  useMidManagementPsimis: jest.fn().mockImplementation(() => ({
    postMerchantPsimi: mockPostMerchantPsimi,
    postMerchantPsimiResponse: null,
    postMerchantPsimiError: null,
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
const mockPsimiValue = 'mock_psimi_value'

const mockNewGenericPsimiState = {
  directoryMerchant: {
    selectedPaymentScheme: mockPaymentScheme,
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewGenericPsimiState})

const getDirectoryPsimiModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryPsimiModal />
  </Provider>
)

describe('DirectoryPsimiModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest.fn()
      .mockReturnValueOnce([mockPsimiValue, setStateMock]) // psimiValue
      .mockReturnValueOnce([null, setStateMock]) // psimiValidationError
      .mockReturnValueOnce([false, setStateMock]) // isOnboardRequired
      .mockReturnValueOnce([false, setStateMock]) // isCloseButtonFocused
  })

  it('should render the correct heading', () => {
    render(getDirectoryPsimiModalComponent())
    const heading = screen.getByRole('heading', {
      name: `New ${mockPaymentScheme} PSIMI`,
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the PSIMI input with correct label', () => {
    render(getDirectoryPsimiModalComponent())
    const psimiInput = screen.getByLabelText('PSIMI')

    expect(psimiInput).toBeInTheDocument()
    expect(psimiInput).toHaveValue(mockPsimiValue)
  })

  it('should render the Add PSIMI button', () => {
    render(getDirectoryPsimiModalComponent())
    const addPsimiButton = screen.getByRole('button', {
      name: 'Add PSIMI',
    })

    expect(addPsimiButton).toBeInTheDocument()
  })

  it('should render the Add & Onboard PSIMI button', () => {
    render(getDirectoryPsimiModalComponent())
    const addPsimiOnboardButton = screen.getByRole('button', {
      name: 'Add & Onboard PSIMI',
    })

    expect(addPsimiOnboardButton).toBeInTheDocument()
  })

  describe('Test button functionality', () => {
    it('should call the postMerchantPsimi function when the Add PSIMI button is clicked', () => {
      render(getDirectoryPsimiModalComponent())
      fireEvent.click(screen.getByRole('button', {
        name: 'Add PSIMI',
      }))

      expect(mockPostMerchantPsimi).toHaveBeenCalledTimes(1)
    })

    it('should call the postMerchantPsimi function when the Add PSIMI & Onboard button is clicked', () => {
      render(getDirectoryPsimiModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add & Onboard PSIMI',
      }))

      expect(mockPostMerchantPsimi).toHaveBeenCalledTimes(1)
    })
  })


  describe('Test error scenarios', () => {
    const mockPsimiErrorMessage = 'mock_psimi_error'

    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest.fn()
        .mockReturnValueOnce(['', setStateMock]) // psimiValue - empty to trigger error
        .mockReturnValueOnce([mockPsimiErrorMessage, setStateMock]) // psimiValidationError
        .mockReturnValueOnce([false, setStateMock]) // isOnboardRequired
        .mockReturnValueOnce([false, setStateMock]) // isCloseButtonFocused
    })

    it('should not call the Post Merchant PSIMI API when Add PSIMI button is clicked', () => {
      render(getDirectoryPsimiModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add PSIMI',
      }))
      expect(mockPostMerchantPsimi).not.toHaveBeenCalled()
    })


    it('should render psimi field error message on Add PSIMI button click', () => {
      render(getDirectoryPsimiModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add PSIMI',
      }))

      const psimiErrorElement = screen.getByTestId('psimi-input-error')
      const psimiErrorText = screen.getByText(mockPsimiErrorMessage)

      expect(psimiErrorElement).toBeInTheDocument()
      expect(psimiErrorText).toBeInTheDocument()
    })

    it('should render psimi field error message on Add & Onboard PSIMI button click', () => {
      render(getDirectoryPsimiModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Add & Onboard PSIMI',
      }))

      const psimiErrorElement = screen.getByTestId('psimi-input-error')
      const psimiErrorText = screen.getByText(mockPsimiErrorMessage)

      expect(psimiErrorElement).toBeInTheDocument()
      expect(psimiErrorText).toBeInTheDocument()
    })
  })
})
