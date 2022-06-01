import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewSecondaryMidDetails from 'components/DirectorySingleViewModal/components/SingleViewSecondaryMidDetails'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockSecondaryMidRef = 'mock_secondary_mid_ref'
const mockSecondaryMid = 'mock_secondary_mid'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {
      secondary_mid_ref: mockSecondaryMidRef,
      secondary_mid_metadata: {
        payment_scheme_code: 1,
        mid: mockSecondaryMid,
        payment_enrolment_status: mockPayrollEnrollmentStatus,
      },
      date_added: mockDateAdded,
      txm_status: mockTxmStatus,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getSingleViewSecondaryMidDetailsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewSecondaryMidDetails />
  </Provider>
)

describe('SingleViewSecondaryMidDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme Status', () => {
    it('should render the Payment Scheme Status heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByText('PAYMENT SCHEME STATUS')).toBeInTheDocument()
    })
    it('should render the Dropdown component', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })
  })

  describe('Test Location', () => {
    it('should render the Location heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('LOCATION')
    })
    it('should render the Add Location button', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Add location'})).toBeInTheDocument()
    })
    // TODO: Missing value test till we know how to populate it
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getAllByRole('heading')[3]).toHaveTextContent('HARMONIA STATUS')
    })
    it('should render the Edit button', () => {
      render(getSingleViewSecondaryMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})
