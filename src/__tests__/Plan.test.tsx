import React from 'react'
import {render} from '@testing-library/react'
import Plan from 'components/PlansList/components/Plan'

jest.mock('components/PlansList/components/IconImage', () => () => <div data-testid='icon-image' />)

describe('Plan component', () => {
  const mockPlanName = 'mock_plan_name'
  const defaultMockPlan = {
    account: {
      plan_name: mockPlanName,
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
    isDev: false,
    isStaging: false,
    devImages: [],
    stagingImages: [],
    balances: [],
    feature_set: {},
    card: {},
    uid: 'mock_uid',
    status: 'mock_uid',
    images: [],
    slug: 'mock_slug',
  }

  describe('Test icon image and plan name text', () => {
    it('should render icon image and plan name', () => {
      const {queryByTestId, getByText} = render(<Plan plan={defaultMockPlan} />)
      expect(queryByTestId('icon-image')).toBeInTheDocument()
      expect(getByText(mockPlanName)).toBeInTheDocument()
    })
  })

  describe('Test verification tags', () => {
    it('should not render any verification tags', () => {
      const {queryByTestId} = render(<Plan plan={defaultMockPlan} />)
      expect(queryByTestId('dev-tag')).not.toBeInTheDocument()
      expect(queryByTestId('staging-tag')).not.toBeInTheDocument()
    })

    it('should render icon image and plan name', () => {
      const {queryByTestId} = render(<Plan plan={{
        ...defaultMockPlan,
        isDev: true,
        isStaging: true,
      }} />)

      expect(queryByTestId('dev-tag')).toBeInTheDocument()
      expect(queryByTestId('staging-tag')).toBeInTheDocument()
    })
  })
})
