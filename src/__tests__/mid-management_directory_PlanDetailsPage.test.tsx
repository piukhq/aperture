import React from 'react'
import {render, screen} from '@testing-library/react'
import PlanDetailsPage from 'pages/mid-management/directory/[planId]/index'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('@auth0/nextjs-auth0', () => ({
  UserProvider: ({children}) => children,
  withPageAuthRequired: (component) => component,
}))

jest.mock('components/DirectoryDetailsHeader', () => () => <div data-testid='directory-details-header' />)
jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)

const mockGetPlanDetailsResponse = {
  plan_ref: 's3fa85f64-5717-4562-b3fc-2c963f66afa6',
  plan_metadata: {
    name: 'SquareMeal',
    icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png',
    slug: 'squaremeal',
    plan_id: 286,
  },
  merchants: [
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
        merchant_metadata: {
          name: 'Cada Bardotti',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Locations',
        },
        merchant_counts: {
          locations: 6,
          payment_schemes: [
            {
              label: 'VISA',
              slug: PaymentSchemeSlug.VISA,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              slug: PaymentSchemeSlug.MASTERCARD,
              count: 62,
            },
            {
              label: 'AMEX',
              slug: PaymentSchemeSlug.AMEX,
              count: 38,
            },
          ],
        },
      },
    },
    {
      merchant: {
        merchant_ref: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        merchant_metadata: {
          name: 'Yuu Kitchen',
          icon_url: 'https://api.staging.gb.bink.com/content/media/hermes/schemes/trenette-con.png',
          location_label: 'Stores',
        },
        merchant_counts: {
          locations: 17,
          payment_schemes: [
            {
              label: 'VISA',
              slug: PaymentSchemeSlug.VISA,
              count: 54,
            },
            {
              label: 'MASTERCARD',
              slug: PaymentSchemeSlug.MASTERCARD,
              count: 62,
            },
            {
              label: 'AMEX',
              slug: PaymentSchemeSlug.AMEX,
              count: 38,
            },
          ],
        },
      },
    },
  ],
}

jest.mock('hooks/useMidManagementPlans', () => ({
  useMidManagementPlans: jest.fn().mockImplementation(() => ({
    getPlanResponse: mockGetPlanDetailsResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getPlanDetailsPageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <PlanDetailsPage />
  </Provider>
)

describe('MID Management PlanDetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_id',
      },
    }))
  })

  it('should render DirectoryDetailsHeader component', () => {
    render(getPlanDetailsPageComponent())
    expect(screen.queryByTestId('directory-details-header')).toBeInTheDocument()
  })

  describe('Test plan content', () => {
    it('should render correct number of plan tiles', () => {
      render(getPlanDetailsPageComponent())
      const planTiles = screen.getAllByTestId('directory-tile')
      expect(planTiles).toHaveLength(2)
    })
  })
})
