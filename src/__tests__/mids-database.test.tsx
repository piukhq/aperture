import React from 'react'
import {render} from '@testing-library/react'
import DatabasePage from 'pages/mids/database'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/TextInputGroup', () => () => <div data-testid='search-bar' />)
jest.mock('components/MerchantTile', () => () => <div data-testid='merchant-tile' />)
jest.mock('components/NewMerchantModal', () => () => <div data-testid='new-merchant-modal' />)

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDatabasePageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DatabasePage />
  </Provider>
)
describe('MID Management DatabasePage', () => {
  describe('Test header content', () => {
    it('should render correct heading and sub heading text', () => {
      const {getByText} = render(getDatabasePageComponent())
      expect(getByText('MID Management')).toBeInTheDocument()
      expect(getByText('Create, view and manage MIDs for the merchants configured on the platform')).toBeInTheDocument()
    })

    it('should render the search bar and new merchant button', () => {
      const {queryByTestId, getByRole} = render(getDatabasePageComponent())
      expect(queryByTestId('search-bar')).toBeInTheDocument()
      expect(getByRole('button', {name: /New Merchant/i})).toBeInTheDocument()
    })
  })

  describe('Test merchant content', () => {
    it('should render correct number of merchant tiles', () => {
      const {getAllByTestId} = render(getDatabasePageComponent())
      const merchantTiles = getAllByTestId('merchant-tile')
      // TODO: must fix this test once real merchant data is used
      expect(merchantTiles).toHaveLength(5)
    })
  })

  describe('Test New Merchant button', () => {
    it('should render New Merchant Modal', () => {
      const store = mockStoreFn({
        modal: {
          modalRequested: 'MID_MANAGEMENT_NEW_MERCHANT',
        },
      })
      const {queryByTestId} = render(getDatabasePageComponent(store))
      expect(queryByTestId('new-merchant-modal')).toBeInTheDocument()
    })

    it('should not render Add Merchant Modal', () => {
      const {queryByTestId} = render(getDatabasePageComponent(store))
      expect(queryByTestId('new-merchant-modal')).not.toBeInTheDocument()
    })
  })
})
