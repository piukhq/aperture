import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import MerchantDetailsPage from 'pages/mid-management/directory/[planId]/[merchantId]/index'
import {ModalType} from 'utils/enums'

jest.mock('components/DirectoryDetailsHeader', () => () => <div data-testid='directory-details-header' />)
jest.mock('components/DirectoryMerchantMids', () => () => <div data-testid='directory-merchant-mids' />)
jest.mock('components/DirectoryMerchantPsimis', () => () => <div data-testid='directory-merchant-psimis' />)

const mockGetPlanResponse = {
  plan_ref: 'mock_plan_ref',
  plan_metadata: {},
  merchants: [],
}

jest.mock('hooks/useMidManagementPlans', () => ({
  useMidManagementPlans: jest.fn().mockImplementation(() => ({
    getPlanResponse: mockGetPlanResponse,
  })),
}))

const mockGetMerchantResponse = {
  merchant_ref: 'mock_merchant_ref',
  plan_metadata: {},
  merchant_metadata: {},
}

jest.mock('hooks/useMidManagementMerchants', () => ({
  useMidManagementMerchants: jest.fn().mockImplementation(() => ({
    getMerchantResponse: mockGetMerchantResponse,
  })),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryPlan: {
    plan_ref: 'mock_plan_ref',
    plan_metadata: {
      name: 'mock-name',
      slug: 'mock-slug',
      iconUrl: 'mock-icon-url',
    },
  },
  directoryMerchant: {
    selectedMerchant: {
      merchant_ref: 'mock_merchant_ref',
      merchant_metadata: {
        name: 'mock-name',
        iconUrl: 'mock-icon-url',
      },
    },
  },
  modal: {
    modalRequested: ModalType.NO_MODAL,
  },
})

const getMerchantDetailsPageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <MerchantDetailsPage />
  </Provider>
)

describe('MID Management MerchantDetailsPage', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')

  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'mids',
      },
    }))
  })

  it('should render DirectoryDetailsHeader component', () => {
    render(getMerchantDetailsPageComponent())
    expect(screen.queryByTestId('directory-details-header')).toBeInTheDocument()
  })

  describe('Test MIDs', () => {
    it('should render the MIDs button', () => {
      render(getMerchantDetailsPageComponent())
      const midsButton = screen.getByRole('button', {
        name: 'MIDs',
      })

      expect(midsButton).toBeInTheDocument()
    })

    it('should render the MIDs component', () => {
      render(getMerchantDetailsPageComponent())
      const midsComponent = screen.queryByTestId('directory-merchant-mids')

      expect(midsComponent).toBeInTheDocument()
    })
  })

  describe('Test Secondary MIDs', () => {
    it('should render Secondary MIDs button', () => {
      render(getMerchantDetailsPageComponent())
      const secondaryMidsButton = screen.getByRole('button', {
        name: 'Secondary MIDs',
      })

      expect(secondaryMidsButton).toBeInTheDocument()
    })
    // TODO: Add Secondary MIDs component Test
  })

  describe('Test Locations', () => {
    it('should render Locations button', () => {
      render(getMerchantDetailsPageComponent())
      const locationsButton = screen.getByRole('button', {
        name: 'Locations',
      })

      expect(locationsButton).toBeInTheDocument()
    })
    // TODO: Add Locations component Test
  })

  describe('Test Psimis', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      useRouter.mockImplementation(() => ({
        query: {
          planId: 'mock_plan_id',
          merchantId: 'mock_merchant_id',
          tab: 'psimis',
        },
      }))
    })

    it('should render Psimis button', () => {
      render(getMerchantDetailsPageComponent())
      const psimisButton = screen.getByRole('button', {
        name: 'PSIMIs',
      })
      expect(psimisButton).toBeInTheDocument()
    })

    it('should render the Psimis component', () => {
      render(getMerchantDetailsPageComponent())
      const psimisComponent = screen.queryByTestId('directory-merchant-psimis')

      expect(psimisComponent).toBeInTheDocument()
    })
  })
})
