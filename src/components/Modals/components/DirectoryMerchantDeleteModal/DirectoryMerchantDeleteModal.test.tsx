import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectoryMerchantDeleteModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {getCountWithCorrectNoun} from 'utils/stringFormat'

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

const mockDeleteMerchant = jest.fn()
jest.mock('hooks/useMidManagementMerchants', () => ({
  useMidManagementMerchants: jest.fn().mockImplementation(() => ({
    deleteMerchant: mockDeleteMerchant,
    deleteMerchantIsSuccess: false,
    deleteMerchantError: null,
  })),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {
    planId: 'mock_plan_id',
  },
}))

const mockName = 'mock_name'
const mockLocationLabel = 'mock_location_label' // Pluralised due to mock count
const mockCount = 3

const mockNewMerchantInitialState = {
  directoryMerchant: {
    selectedMerchant: {
      merchant_ref: null,
      merchant_metadata: {
        name: mockName,
        icon_url: null,
        location_label: mockLocationLabel,
      },
      merchant_counts: {
        locations: mockCount,
        payment_schemes: [
          {count: mockCount},
          {count: null},
          {count: null},
        ],
      },
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewMerchantInitialState})

const getDirectoryMerchantDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantDeleteModal />
  </Provider>
)

describe('DirectoryMerchantDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockCount, setStateMock]) // locationsCount
      .mockReturnValueOnce([mockCount, setStateMock]) // midsCount
      .mockReturnValueOnce(['', setStateMock]) // nameValue
      .mockReturnValueOnce([null, setStateMock]) // name validation error
  })

  it('should render the correct heading', () => {
    render(getDirectoryMerchantDeleteModalComponent())
    const heading = screen.getByRole('heading', {
      name: 'Delete Merchant',
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the correct copy', () => {
    render(getDirectoryMerchantDeleteModalComponent())
    const firstParagraph = screen.getByText(`Are you sure you want to delete ${mockName}?`)
    const secondParagraph = screen.getByTestId('second-paragraph')
    const thirdParagraph = screen.getByText('Please enter the Merchant Name to confirm.')

    expect(firstParagraph).toBeInTheDocument()
    expect(secondParagraph).toHaveTextContent(`This will also delete ${getCountWithCorrectNoun(mockCount, mockLocationLabel)} and ${getCountWithCorrectNoun(mockCount, 'MID')}`)
    expect(thirdParagraph).toBeInTheDocument()
  })

  it('should render the merchant name input with the correct label', () => {
    render(getDirectoryMerchantDeleteModalComponent())
    const input = screen.getByLabelText('Merchant Name')

    expect(input).toBeInTheDocument()
  })

  it('should render the submit button with the correct label', () => {
    render(getDirectoryMerchantDeleteModalComponent())
    const button = screen.getByRole('button', {
      name: 'Delete Merchant',
    })

    expect(button).toBeInTheDocument()
  })

  describe('Test submit scenarios', () => {
    it('should not call the deleteMerchant function when the submit button is clicked and the merchant name input does not match', () => {
      render(getDirectoryMerchantDeleteModalComponent())
      const button = screen.getByRole('button', {
        name: 'Delete Merchant',
      })
      fireEvent.click(button)

      expect(mockDeleteMerchant).not.toHaveBeenCalled()
    })

    it('should call the deleteMerchant function when the submit button is clicked and the merchant name input matches', () => {
      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValueOnce([0, setStateMock])
        .mockReturnValueOnce([0, setStateMock])
        .mockReturnValueOnce([mockName, setStateMock])
        .mockReturnValueOnce([null, setStateMock])

      render(getDirectoryMerchantDeleteModalComponent())
      const button = screen.getByRole('button', {
        name: 'Delete Merchant',
      })
      fireEvent.click(button)

      expect(mockDeleteMerchant).toHaveBeenCalled()
    })


  })


  describe('Test error scenarios', () => {
    const mockNameErrorMessage = 'mock_name_error'

    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest
        .fn()
        .mockReturnValueOnce([0, setStateMock])
        .mockReturnValueOnce([0, setStateMock])
        .mockReturnValueOnce([mockName, setStateMock])
        .mockReturnValueOnce([mockNameErrorMessage, setStateMock])
    })

    it('should render name field error message', () => {
      render(getDirectoryMerchantDeleteModalComponent())

      fireEvent.click(screen.getByRole('button', {
        name: 'Delete Merchant',
      }))

      const nameErrorElement = screen.getByTestId('merchant-name-input-error')
      const nameErrorText = screen.getByText(mockNameErrorMessage)

      expect(nameErrorElement).toBeInTheDocument()
      expect(nameErrorText).toBeInTheDocument()
    })
  })
})
