import React from 'react'
import {render, screen} from '@testing-library/react'

import IconImage from './IconImage'
import {ImageTypes} from 'utils/enums'


const defaultMockPlan = {
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
  isDev: false,
  isStaging: false,
  isProd: false,
  devImages: [{
    type: ImageTypes.ICON,
    url: 'https://mock-icon-url',
    id: 1,
    encoding: '',
    description: '',
  }],
  stagingImages: [],
  prodImages: [],
  devPlan: null,
  stagingPlan: null,
  prodPlan: null,
  balances: [],
  feature_set: {},
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [],
  slug: 'mock_slug',
}


const getIconImageComponent = () => (
  <IconImage plan={defaultMockPlan} />
)

describe('IconImage', () => {
  it('should render the IconImage img element', () => {
    render(getIconImageComponent())

    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })
})
