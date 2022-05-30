import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewMidDetails from 'components/DirectorySingleViewModal/components/SingleViewMidDetails'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockMidRef = 'mock_mid_ref'
const mockMid = 'mock_mid'
const mockVisaBin = 'mock_visa_bin'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {
      mid_ref: mockMidRef,
      mid_metadata: {
        payment_scheme_code: 1,
        mid: mockMid,
        visa_bin: mockVisaBin,
        payment_enrolment_status: mockPayrollEnrollmentStatus,
      },
      date_added: mockDateAdded,
      txm_status: mockTxmStatus,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getSingleViewMidDetailsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <SingleViewMidDetails />
  </Provider>
)

describe('SingleViewMidDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme Status', () => {
    it('should render the Payment Scheme Status heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText('PAYMENT SCHEME STATUS')).toBeInTheDocument()
    })
    it('should render the Dropdown component', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })
  })

  describe('Test Location', () => {
    it('should render the Location heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('LOCATION')
    })
    it('should render the Add Location button', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Add location'})).toBeInTheDocument()
    })
    // TODO: Missing value test till we know how to populate it
  })

  describe('Test BIN', () => {
    it('should render the BIN heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[3]).toHaveTextContent('BIN')
    })
    it('should render the correct Bin value', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByText(mockVisaBin)).toBeInTheDocument()
    })
    it('should render the Add BIN button', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Add BIN'})).toBeInTheDocument()
    })

    it('should NOT render the BIN section if not Visa', () => {
      const mockNonVisaState = {
        directoryMerchant: {
          selectedEntity: {
            mid_ref: mockMidRef,
            mid_metadata: {
              payment_scheme_code: 2,
              mid: mockMid,
              visa_bin: mockVisaBin,
              payment_enrolment_status: mockPayrollEnrollmentStatus,
            },
            date_added: mockDateAdded,
            txm_status: mockTxmStatus,
          },
        },
      }
      render(getSingleViewMidDetailsComponent(mockStoreFn({...mockNonVisaState})))
      expect(screen.getAllByRole('heading')[3]).not.toHaveTextContent('BIN')
      expect(screen.queryByText(mockVisaBin)).not.toBeInTheDocument()
      expect(screen.queryByRole('button', {name: 'Add BIN'})).not.toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getAllByRole('heading')[4]).toHaveTextContent('HARMONIA STATUS')
    })
    it('should render the Edit button', () => {
      render(getSingleViewMidDetailsComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})


