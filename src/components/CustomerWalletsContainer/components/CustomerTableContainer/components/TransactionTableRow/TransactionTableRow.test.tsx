import React from 'react'
import {render, screen} from '@testing-library/react'
import {LoyaltyTransaction} from 'types'
import TransactionTableRow from './TransactionTableRow'

const mockTransaction: LoyaltyTransaction = {
  id: 123,
  status: 'mock_status',
  amounts: [{
    currency: 'mock_currency',
    suffix: 'mock_suffix',
    value: 12345,
  }],
  timestamp: 1686058201, // 06/06/2023
  description: 'mock_description £description_amount', // The description is split by £ to get the amount
}

const getTransactionTableRowComponent = (passedProps = {}) => (
  <TransactionTableRow transaction={mockTransaction} isIceland={false} {...passedProps} />
)

describe('Test TransactionTableRow', () => {
  it('should render the component', () => {
    render(getTransactionTableRowComponent())
    expect(screen.getByTestId('transaction-row')).toBeInTheDocument()
  })

  it('should render the reward', () => {
    render(getTransactionTableRowComponent())
    expect(screen.getByText('+12345 mock_currency')).toBeInTheDocument()
  })

  it('should render the date', () => {
    render(getTransactionTableRowComponent())
    expect(screen.getByText('06/06/2023')).toBeInTheDocument()
  })

  it('should render the details', () => {
    render(getTransactionTableRowComponent())
    expect(screen.getByText('mock_description')).toBeInTheDocument()
  })

  it('should render the amount', () => {
    render(getTransactionTableRowComponent())
    expect(screen.getByText('£description_amount')).toBeInTheDocument()
  })

  describe('Test Iceland specific differences', () => {
    it('should not render the reward', () => {
      render(getTransactionTableRowComponent({isIceland: true}))
      expect(screen.getByText('N/A')).toBeInTheDocument()
    })

    it('should render the amount', () => {
      render(getTransactionTableRowComponent({
        isIceland: true,
        transaction: {
          ...mockTransaction,
          description: 'test',
        },
      }))

      screen.debug()
      expect(screen.getByText('£12345')).toBeInTheDocument()
    })
  })

  describe('Test Change column', () => {
    it('should render the change cell as green if the value is positive', () => {
      render(getTransactionTableRowComponent())
      expect(screen.getByTestId('positive-change')).toBeInTheDocument()
    })

    it('should render the change cell as red if the value is negative', () => {
      render(getTransactionTableRowComponent({
        transaction: {
          ...mockTransaction,
          amounts: [{
            currency: 'mock_currency',
            suffix: 'mock_suffix',
            value: -12345,
          }],
        },
      }))
      expect(screen.getByTestId('negative-change')).toBeInTheDocument()
    })

    it('should render the change cell as orange if the value is 0', () => {
      render(getTransactionTableRowComponent({
        transaction: {
          ...mockTransaction,
          amounts: [{
            currency: 'mock_currency',
            suffix: 'mock_suffix',
            value: 0,
          }],
        },
      }))
      expect(screen.getByTestId('zero-change')).toBeInTheDocument()
    })
  })
})
