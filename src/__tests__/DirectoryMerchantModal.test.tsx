import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectoryMerchantModal} from 'components'
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

jest.mock('hooks/useMidManagementMerchants', () => ({
  useMidManagementMerchants: jest.fn().mockImplementation(() => ({
    postMerchant: jest.fn(),
    postMerchantResponse: null,
    postMerchantError: null,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
  },
}))

const mockImageValue = {}
const mockNameValue = 'mock_name_value'
const mockLocationLabelValue = 'mock_location_label_value'

const mockNewMerchantInitialState = {
  directoryMerchant: {
    merchant_ref: null,
    merchant_metadata: {
      name: null,
      location_label: null,
      icon_url: null,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewMerchantInitialState})

const getDirectoryMerchantModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantModal />
  </Provider>
)

describe('DirectoryMerchantModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest.fn()
      .mockReturnValueOnce([null, setStateMock]) // Image value
      .mockReturnValueOnce(['', setStateMock]) // Name value
      .mockReturnValueOnce(['', setStateMock]) // Location label value
      .mockReturnValueOnce([null, setStateMock]) // nameValidationError
      .mockReturnValueOnce([null, setStateMock]) // locationLabelValidationError
  })

  describe('Test Edit Plan specifics', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest.fn()
        .mockReturnValueOnce([mockImageValue, setStateMock]) // Image value
        .mockReturnValueOnce([mockNameValue, setStateMock]) // Name value
        .mockReturnValueOnce([mockLocationLabelValue, setStateMock]) // Location label value
        .mockReturnValueOnce([null, setStateMock]) // nameValidationError
        .mockReturnValueOnce([null, setStateMock]) // locationLabelValidationError
    })

    const mockEditMerchantInitialState = {
      directoryMerchant: {
        merchant_ref: 'mock_ref',
        merchant_metadata: {
          name: null,
          location_label: null,
          icon_url: null,
        },
      },
    }

    const editMerchantStore = mockStoreFn({...mockEditMerchantInitialState})

    it('should render the correct Heading', () => {
      render(getDirectoryMerchantModalComponent(editMerchantStore))
      const heading = screen.getByRole('heading', {
        name: 'Edit Merchant',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the Save Changes button', () => {
      render(getDirectoryMerchantModalComponent(editMerchantStore))
      const submitButton = screen.getByRole('button', {
        name: 'Save Changes',
      })

      expect(submitButton).toBeInTheDocument()
    })

    it('should render the Add Image input with correct label', () => {
      render(getDirectoryMerchantModalComponent())
      const imageInput = screen.getByLabelText('Add Image')

      expect(imageInput).toBeInTheDocument()
    })

    it('should render the Name input with correct label', () => {
      render(getDirectoryMerchantModalComponent())
      const nameInput = screen.getByLabelText('Name')

      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveValue(mockNameValue)
    })

    it('should render the Location Label input with correct label', () => {
      render(getDirectoryMerchantModalComponent())
      const planIdInput = screen.getByLabelText('Location Label')

      expect(planIdInput).toBeInTheDocument()
      expect(planIdInput).toHaveValue(mockLocationLabelValue)
    })
  })

  describe('Test New Merchant specifics', () => {
    it('should render the correct Heading', () => {
      render(getDirectoryMerchantModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'New Merchant',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the Add Merchant button', () => {
      render(getDirectoryMerchantModalComponent())
      const addMerchantButton = screen.getByRole('button', {
        name: 'Add Merchant',
      })

      expect(addMerchantButton).toBeInTheDocument()
    })

    describe('Test error scenarios', () => {
      const mockNameErrorMessage = 'mock_name_error'
      const mockLocationLabelErrorMessage = 'mock_location_label_error'

      beforeEach(() => {
        jest.clearAllMocks()
        const setStateMock = jest.fn()

        React.useState = jest
          .fn()
          .mockReturnValueOnce([null, setStateMock])
          .mockReturnValueOnce(['', setStateMock])
          .mockReturnValueOnce(['', setStateMock])
          .mockReturnValueOnce([mockNameErrorMessage, setStateMock])
          .mockReturnValueOnce([mockLocationLabelErrorMessage, setStateMock])
      })

      it('should render name field error message', () => {
        render(getDirectoryMerchantModalComponent())

        fireEvent.click(screen.getByRole('button', {
          name: 'Add Merchant',
        }))

        const nameErrorElement = screen.getByTestId('merchant-name-input-error')
        const nameErrorText = screen.getByText(mockNameErrorMessage)

        expect(nameErrorElement).toBeInTheDocument()
        expect(nameErrorText).toBeInTheDocument()
      })

      it('should render location label field error message', () => {
        render(getDirectoryMerchantModalComponent())

        fireEvent.click(screen.getByRole('button', {
          name: 'Add Merchant',
        }))

        const locationLabelErrorElement = screen.getByTestId('merchant-location-label-input-error')
        const locationLabelErrorText = screen.getByText(mockLocationLabelErrorMessage)

        expect(locationLabelErrorElement).toBeInTheDocument()
        expect(locationLabelErrorText).toBeInTheDocument()
      })
    })
  })
})
