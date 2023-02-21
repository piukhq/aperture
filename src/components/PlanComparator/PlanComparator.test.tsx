import React from 'react'
import {render, screen} from '@testing-library/react'
import {ImageTypes} from 'utils/enums'
import PlanComparator from './PlanComparator'

jest.mock('./components/PlanSummary', () => () => <div data-testid='plan-summary' />)
jest.mock('./components/CategoryDetails', () => () => <div data-testid='category-details' />)
jest.mock('./components/ImageDetails', () => () => <div data-testid='image-details' />)

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
  content: [],
  id: 1234,
  balances: [],
  feature_set: {
    card_type: 'mock-card_type',
  },
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [
    {
      type: ImageTypes.HERO,
      url: 'https://mock-hero-url',
      id: 1,
      encoding: '',
      description: '',
    },
  ],
  slug: 'mock-slug',
}

const mockProps = {
  plans: {
    dev: {
      ...mockPlan,
      id: 1,
    },
    staging: {
      ...mockPlan,
      id: 2,
    },
    prod: {
      ...mockPlan,
      id: 3,
    },
  },
}

const getPlanComparatorComponent = (passedProps = {}) => (
  <PlanComparator {...mockProps} {...passedProps} />
)

describe('Test Plan Comparator', () => {
  it('should render the Plan Summary component', () => {
    render(getPlanComparatorComponent())
    expect(screen.queryByTestId('plan-summary')).toBeInTheDocument()
  })

  it('should render the Category Details component for each in-scope category', () => {
    render(getPlanComparatorComponent())
    const categories = screen.getAllByTestId('category-details')
    expect(categories).toHaveLength(5)
  })

  it('should render the Image Details component', () => {
    render(getPlanComparatorComponent())
    expect(screen.queryByTestId('image-details')).toBeInTheDocument()
  })
})
