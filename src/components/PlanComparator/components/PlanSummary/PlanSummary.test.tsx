import React from 'react'
import {render, screen} from '@testing-library/react'
import PlanSummary from './PlanSummary'
import {ImageTypes} from 'utils/enums'

jest.mock('./LoadingBar', () => () => <div data-testid='loading-bar' />)

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
  plansArray: [mockPlan],
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
  totalKeys: 10,
  totalMatches: 10,
}


const getPlanSummaryComponent = (passedProps = {}) => (
  <PlanSummary {...mockProps} {...passedProps} />
)


describe('Test Plan Summary', () => {
  it('should render the Plan Summary', () => {
    render(getPlanSummaryComponent())
    expect(screen.queryByTestId('plan-summary')).toBeInTheDocument()
  })

  it('should render the Hero Image', () => {
    render(getPlanSummaryComponent())
    const heroImage = (screen.getByRole('img'))

    expect(heroImage).toBeInTheDocument()
    expect(heroImage).toHaveAttribute('alt', 'https://mock-hero-url')
  })

  it('should render the Plan Name', () => {
    render(getPlanSummaryComponent())
    expect(screen.queryByText('mock_plan_name')).toBeInTheDocument()
  })

  it('should render the LoadingBar component', () => {
    render(getPlanSummaryComponent())
    expect(screen.queryByTestId('loading-bar')).toBeInTheDocument()
  })

  describe('Test Django Links', () => {
    it('should render the dev django link with correct href', () => {
      render(getPlanSummaryComponent())

      expect(screen.getByRole('link', {name: /view in dev/i})).toHaveAttribute('href', 'https://api.dev.gb.bink.com/admin/scheme/scheme/1/change/')
    })

    it('should render the staging django link with correct href', () => {
      render(getPlanSummaryComponent())
      expect(screen.getByRole('link', {name: /view in staging/i})).toHaveAttribute('href', 'https://api.staging.gb.bink.com/admin/scheme/scheme/2/change/')
    })

    it('should render the prod django link with correct href', () => {
      render(getPlanSummaryComponent())
      expect(screen.getByRole('link', {name: /view in prod/i})).toHaveAttribute('href', 'https://api.gb.bink.com/admin/scheme/scheme/3/change/')
    })

    it('should not render the django links if the environment plan is not in the plans object', () => {
      render(getPlanSummaryComponent({
        plans: {},
      }))

      expect(screen.queryByRole('link', {name: /view in dev/i})).not.toBeInTheDocument()
      expect(screen.queryByRole('link', {name: /view in staging/i})).not.toBeInTheDocument()
      expect(screen.queryByRole('link', {name: /view in prod/i})).not.toBeInTheDocument()
    })

  })

})


