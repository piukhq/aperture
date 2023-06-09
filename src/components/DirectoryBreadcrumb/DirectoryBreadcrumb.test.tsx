import React from 'react'
import {render, screen} from '@testing-library/react'
import DirectoryBreadcrumb from './DirectoryBreadcrumb'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const mockGetPlanResponse = {
  plan_ref: 'mock_plan_ref',
  plan_metadata: {},
  merchants: [],
}
jest.mock('hooks/useDirectoryPlans', () => ({
  useDirectoryPlans: jest.fn().mockImplementation(() => ({
    getPlanResponse: mockGetPlanResponse,
  })),
}))


const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryPlan: {
    plan_ref: 'mock_plan_ref',
    plan_metadata: {
      name: 'mock-plan-name',
      slug: 'mock-slug',
      iconUrl: 'mock-icon-url',
    },
  },
  directoryMerchant: {
    selectedMerchant: {
      merchant_ref: 'mock_merchant_ref',
      merchant_metadata: {
        name: 'mock-merchant-name',
        iconUrl: 'mock-icon-url',
      },
    },
  },
})

const getDirectoryBreadcrumbComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryBreadcrumb />
  </Provider>
)

describe('DirectoryBreadcrumb', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_ref',
        merchantId: 'mock_merchant_ref',
        tab: 'mids',
      },
      asPath: '/mid-management/plans/mock_plan_ref/merchants/mock_merchant_ref/mids',
    }))
  })

  it('should render the Directory Breadcrumb component', () => {
    render(getDirectoryBreadcrumbComponent())

    expect(screen.queryByTestId('directory-breadcrumb')).toBeInTheDocument()
  })

  it('should render the correct breadcrumb root', () => {
    render(getDirectoryBreadcrumbComponent())
    expect(screen.getByRole('link', {name: 'PLANS'})).toHaveAttribute('href', '/mid-management/plans')
  })

  it('should render the correct breadcrumb plan', () => {
    render(getDirectoryBreadcrumbComponent())
    expect(screen.getByRole('link', {name: 'MOCK-PLAN-NAME'})).toHaveAttribute('href', '/mid-management/plans/mock_plan_ref')
  })

  it('should render the correct breadcrumb merchant', () => {
    render(getDirectoryBreadcrumbComponent())
    expect(screen.getByRole('link', {name: 'MOCK-MERCHANT-NAME'})).toHaveAttribute('href', '/mid-management/plans/mock_plan_ref/merchants')
  })
})
