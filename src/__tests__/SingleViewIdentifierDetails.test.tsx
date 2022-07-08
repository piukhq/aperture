import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewIdentifierDetails from 'components/DirectorySingleViewModal/components/SingleViewIdentifier/components/SingleViewIdentifierDetails'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockIdentifierRef = 'mock_identifier_ref'
const mockValue = 'mock_value'
const mockPaymentSchemeMerchantName = 'mock_payment_scheme_merchant_name'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantIdentifier = {
  identifier_ref: mockIdentifierRef,
  identifier_metadata: {
    payment_scheme_code: 1,
    value: mockValue,
    payment_scheme_merchant_name: mockPaymentSchemeMerchantName,
  },
  date_added: mockDateAdded,
  identifier_status: mockTxmStatus,
}


const getSingleViewIdentifierDetailsComponent = () => (
  <SingleViewIdentifierDetails identifier={mockMerchantIdentifier} />
)

describe('SingleViewIdentifierDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // TODO: Add functionality tests into each section
  describe('Test Date Added', () => {
    it('should render the Date Added heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[0]).toHaveTextContent('DATE ADDED')
    })
    it('should render the Date Added value', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getByText(mockDateAdded)).toBeInTheDocument()
    })
  })

  describe('Test Payment Scheme', () => {
    it('should render the Payment Scheme heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[1]).toHaveTextContent('PAYMENT SCHEME')
    })
    it('should render the correct Payment Scheme value', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getByText('Visa')).toBeInTheDocument()
    })
  })

  describe('Test Harmonia Status', () => {
    it('should render the Harmonia Status heading', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getAllByRole('heading')[2]).toHaveTextContent('HARMONIA STATUS')
    })
    it('should render the Edit button', () => {
      render(getSingleViewIdentifierDetailsComponent())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
    })
  })
})
