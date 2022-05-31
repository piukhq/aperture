import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewIdentifierDetails from 'components/DirectorySingleViewModal/components/SingleViewIdentifierDetails'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockIdentifierRef = 'mock_identifier_ref'
const mockValue = 'mock_value'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {
      identifier_ref: mockIdentifierRef,
      identifier_metadata: {
        payment_scheme_code: 1,
        value: mockValue,
        payment_enrolment_status: mockPayrollEnrollmentStatus,
      },
      date_added: mockDateAdded,
      identifier_status: mockTxmStatus,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getSingleViewIdentifierComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewIdentifierDetails />
  </Provider>
)

describe('SingleViewIdentifierDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('HARMONIA STATUS')
    })
    it('should render the Edit button', () => {
      render(getSingleViewIdentifierComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})
