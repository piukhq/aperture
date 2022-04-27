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
    isProd: false,
    devImages: [],
    stagingImages: [],
    prodImages: [],
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

  describe('Test environment tags', () => {
    it('should not render any environment tags', () => {
      const {queryAllByTestId} = render(<Plan plan={defaultMockPlan} />)
      const tagLabels = queryAllByTestId('tag-label')
      expect(tagLabels).toHaveLength(0)
    })

    it('should render the correct environment tags', () => {
      const {getAllByTestId} = render(<Plan plan={{
        ...defaultMockPlan,
        isDev: true,
        isStaging: true,
      }} />)

      const tagLabels = getAllByTestId('tag-label')
      expect(tagLabels).toHaveLength(2)
      expect(tagLabels[0]).toHaveTextContent('D')
      expect(tagLabels[1]).toHaveTextContent('S')
    })
  })
})
