import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantIdentifiers} from 'components'

// TODO: Add tests for actual table content when pulling from the API

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryMerchantIdentifiersComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantIdentifiers />
  </Provider>
)

describe('DirectoryMerchantIdentifiers', () => {
  it('should render the add Identifier buttons', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa Identifier',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard Identifier',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(6)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantIdentifiersComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('SCHEME NAME')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('HARMONIA STATUS')
  })
})
