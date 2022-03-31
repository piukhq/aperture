import React from 'react'
import {render} from '@testing-library/react'
import DatabasePage from 'pages/mids/database'

jest.mock('components/TextInputGroup', () => () => <div data-testid='search-bar' />)
jest.mock('components/MerchantTile', () => () => <div data-testid='merchant-tile' />)

describe('Mid Management DatabasePage', () => {
  describe('Test header content', () => {
    it('should render correct heading and sun heading text', () => {
      const {getByText} = render(<DatabasePage />)
      expect(getByText('MID Management')).toBeInTheDocument()
      expect(getByText('Create, view and manage MIDs for the merchants configured on the platform')).toBeInTheDocument()
    })

    it('should render the search bar and new merchant button', () => {
      const {queryByTestId, getByRole} = render(<DatabasePage />)
      expect(queryByTestId('search-bar')).toBeInTheDocument()
      expect(getByRole('button', {name: /New Merchant/i})).toBeInTheDocument()
    })
  })

  describe('Test merchant content', () => {
    it('should render correct number of merchant tiles', () => {
      const {getAllByTestId} = render(<DatabasePage />)
      const merchantTiles = getAllByTestId('merchant-tile')
      // TODO: must fix this test once real merchant data is used
      expect(merchantTiles).toHaveLength(5)
    })
  })
})
