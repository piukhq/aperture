import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerWalletsHeader from 'components/CustomerWalletsHeader'

jest.mock('components/CustomerLookup', () => () => <div data-testid='customer-lookup' />)
jest.mock('components/CustomerLookupHistory', () => () => <div data-testid='customer-lookup-history' />)

jest.mock('hooks/useCustomerLookup', () => ({
  useCustomerLookup: jest.fn().mockImplementation(() => ({
    jwtCustomerLookup: jest.fn(),
    hasErrorOccurred: false,
  })),
}))

let mockCustomerLookupHistoryResponse = [{}]
jest.mock('hooks/useGetCustomerWalletLookupHistory', () => ({
  useGetCustomerWalletLookupHistory: jest.fn().mockImplementation(() => ({
    getCustomerLookupHistoryResponse: mockCustomerLookupHistoryResponse,
  })),
}))

describe('CustomerWalletsHeader', () => {
  it('should render the CustomerLookup component', () => {
    render(<CustomerWalletsHeader />)
    expect(screen.queryByTestId('customer-lookup')).toBeInTheDocument()
  })

  it('should render the CustomerLookupHistory component', () => {
    render(<CustomerWalletsHeader />)
    expect(screen.queryByTestId('customer-lookup-history')).toBeInTheDocument()
  })

  it('should not render the CustomerLookupHistory component', () => {
    mockCustomerLookupHistoryResponse = []
    render(<CustomerWalletsHeader />)
    expect(screen.queryByTestId('customer-lookup-history')).not.toBeInTheDocument()
  })
})
