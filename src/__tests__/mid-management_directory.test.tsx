import React from 'react'
import {render} from '@testing-library/react'
import DirectoryPage from 'pages/mid-management/directory'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {PaymentSchemeSlug} from 'utils/enums'

jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)
jest.mock('components/DirectoryTile/DirectoryTileSkeleton', () => () => <div data-testid='directory-tile-skeleton' />)
jest.mock('components/Modals/components/DirectoryMerchantModal', () => () => <div data-testid='new-merchant-modal' />)

const mockUseMidManagementPlans = {
  getPlansResponse: [
    {
      plan_ref: 'mock_ref',
      plan_metadata: {
        name: 'mock_name',
        icon_url: 'mock_icon_url',
        slug: 'mock_slug',
        plan_id: 0,
      },
      plan_counts: {
        merchants: 1,
        locations: 1,
        payment_schemes: [
          {
            label: 'mock_scheme',
            slug: PaymentSchemeSlug.VISA,
            count: 1,
          },
        ],
      },
    },
    {
      plan_ref: 'mock_ref_2',
      plan_metadata: {
        name: 'mock_name_2',
        icon_url: 'mock_icon_url',
        slug: 'mock_slug',
        plan_id: 0,
      },
      plan_counts: {
        merchants: 1,
        locations: 1,
        payment_schemes: [
          {
            label: 'mock_scheme',
            slug: PaymentSchemeSlug.VISA,
            count: 1,
          },
        ],
      },
    },
  ],
  getPlansIsLoading: false,
}

jest.mock('hooks/useMidManagementPlans', () => ({
  useMidManagementPlans: jest.fn().mockImplementation(() => mockUseMidManagementPlans),
}))

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryPageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryPage />
  </Provider>
)

describe('MID Management DirectoryPage', () => {
  describe('Test header content', () => {
    it('should render correct heading and sub heading text', () => {
      const {getByText} = render(getDirectoryPageComponent())
      expect(getByText('MID Directory')).toBeInTheDocument()
      expect(getByText('Create, view and manage MIDs for the plans configured on the platform')).toBeInTheDocument()
    })

    it('should render the new Plan button', () => {
      const {getByRole} = render(getDirectoryPageComponent())
      expect(getByRole('button', {name: /New Plan/i})).toBeInTheDocument()
    })
  })

  describe('Test plan content', () => {
    it('should render correct number of plan tiles', () => {
      const {getAllByTestId} = render(getDirectoryPageComponent())
      const planTiles = getAllByTestId('directory-tile')
      expect(planTiles).toHaveLength(2)
    })
  })

  describe('Test Loading behaviour', () => {
    it('should render skeleton tiles when loading', () => {
      mockUseMidManagementPlans.getPlansIsLoading = true
      const {getAllByTestId} = render(getDirectoryPageComponent())

      const planTiles = getAllByTestId('directory-tile-skeleton')
      expect(planTiles).toHaveLength(8)
    })
  })
})
