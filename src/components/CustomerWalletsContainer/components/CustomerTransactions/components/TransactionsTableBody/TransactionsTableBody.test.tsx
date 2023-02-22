import React from 'react'
import {render, screen} from '@testing-library/react'
import TransactionsTableBody from './TransactionsTableBody'
import {timeStampToDate} from 'utils/dateFormat'

const mockTransactions = [
  {
    id: 1,
    status: 'mock_status',
    amounts: [
      {
        currency: 'mock_currency',
        suffix: 'mock_suffix',
        value: 12345,
      },
    ],
    timestamp: 1624197882,
    description: 'mock_description',
  },
  {
    id: 2,
    status: 'mock_status_2',
    amounts: [
      {
        currency: 'mock_currency_2',
        suffix: 'mock_suffix_2',
        value: 23456,
      },
    ],
    timestamp: 1614195262,
    description: 'mock_description',
  },
]

const mockPlan = {
  account: {
    plan_name: 'mock_plan_name',
    add_fields: [],
    authorise_fields: [],
    category: 'mock_category',
    company_name: 'mock_company_name',
    company_url: 'mock_company_url',
    enrol_fields: [],
    fees: [],
    plan_documents: [],
    plan_url: 'mock_plan_url',
    registration_fields: [],
    tiers: [],
  },
  id: 12345,
  balances: [],
  feature_set: {
    card_type: 'mock-card_type',
  },
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [],
  slug: 'mock-slug',
}


const mockProps = {
  transactions: mockTransactions,
  plan: mockPlan,
}

describe('TransactionsTableBody', () => {
  it('should render', () => {
    render(<TransactionsTableBody {...mockProps} />)
  })

  it('should render the correct number of transactions', () => {
    render(<TransactionsTableBody {...mockProps} />)

    expect(screen.getAllByTestId('transaction-row')).toHaveLength(mockTransactions.length)
  })

  it('should render the correctly formatted value and currency in both places', () => {
    render(<TransactionsTableBody {...mockProps} />)

    expect(screen.getAllByText(`+${mockTransactions[0].amounts[0].value} ${mockTransactions[0].amounts[0].currency}`)).toHaveLength(2)
  })

  it('should render the correct timestamp', () => {
    render(<TransactionsTableBody {...mockProps} />)

    expect(screen.getByText(timeStampToDate(mockTransactions[0].timestamp))).toBeInTheDocument()
  })

  describe('Test Iceland-specific behaviour', () => {
    it('should render N/A for the reward cell if the plan slug is iceland', () => {
      mockProps.plan.slug = 'iceland-bonus-card'
      render(<TransactionsTableBody {...mockProps}/>)
      expect(screen.getAllByText('N/A')).toHaveLength(2)
    })
  })

})


