import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantLocations} from 'components'

// TODO: Add tests for actual table content when pulling from the API

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryMerchantLocationsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantLocations />
  </Provider>
)

describe('DirectoryMerchantLocations', () => {
  it('should render the add store button', () => {
    render(getDirectoryMerchantLocationsComponent())
    const addStoreButton = screen.getByRole('button', {
      name: 'Add Store',
    })

    expect(addStoreButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantLocationsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(9)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantLocationsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[1]).toHaveTextContent('NAME')
    expect(headings[2]).toHaveTextContent('DATE ADDED')
    expect(headings[3]).toHaveTextContent('PHYSICAL')
    expect(headings[4]).toHaveTextContent('ADDRESS')
    expect(headings[5]).toHaveTextContent('TOWN')
    expect(headings[6]).toHaveTextContent('POSTCODE')
    expect(headings[7]).toHaveTextContent('LOCATION ID')
    expect(headings[8]).toHaveTextContent('INTERNAL ID')
  })
})
