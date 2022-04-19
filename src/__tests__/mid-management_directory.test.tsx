import React from 'react'
import {render} from '@testing-library/react'
import DirectoryPage from 'pages/mid-management/directory'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/TextInputGroup', () => () => <div data-testid='search-bar' />)
jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)
jest.mock('components/NewMerchantModal', () => () => <div data-testid='new-merchant-modal' />) // TODO: To be updated with new plan modal implementation

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDatabasePageComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryPage />
  </Provider>
)

describe('MID Management DirectoryPage', () => {
  describe('Test header content', () => {
    it('should render correct heading and sub heading text', () => {
      const {getByText} = render(getDatabasePageComponent())
      expect(getByText('MID Management')).toBeInTheDocument()
      expect(getByText('Create, view and manage MIDs for the plans configured on the platform')).toBeInTheDocument()
    })

    it('should render the search bar and new Plan button', () => {
      const {queryByTestId, getByRole} = render(getDatabasePageComponent())
      expect(queryByTestId('search-bar')).toBeInTheDocument()
      expect(getByRole('button', {name: /New Plan/i})).toBeInTheDocument()
    })
  })

  describe('Test plan content', () => {
    it('should render correct number of plan tiles', () => {
      const {getAllByTestId} = render(getDatabasePageComponent())
      const planTiles = getAllByTestId('directory-tile')
      // TODO: must fix this test once real plan data is used
      expect(planTiles).toHaveLength(5)
    })
  })

  // TODO: Below to be updated with new plan modal implementation

  // describe('Test New Merchant button', () => {
  //   it('should render New Merchant Modal', () => {
  //     const store = mockStoreFn({
  //       modal: {
  //         modalRequested: 'MID_MANAGEMENT_NEW_MERCHANT',
  //       },
  //     })
  //     const {queryByTestId} = render(getDatabasePageComponent(store))
  //     expect(queryByTestId('new-merchant-modal')).toBeInTheDocument()
  //   })

  //   it('should not render Add Merchant Modal', () => {
  //     const {queryByTestId} = render(getDatabasePageComponent(store))
  //     expect(queryByTestId('new-merchant-modal')).not.toBeInTheDocument()
  //   })
  // })
})
