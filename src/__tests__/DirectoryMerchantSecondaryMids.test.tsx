import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantSecondaryMids} from 'components'

// TODO: Add tests for actual table content when pulling from the API

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryMerchantSecondaryMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantSecondaryMids />
  </Provider>
)

describe('DirectoryMerchantSecondaryMids', () => {
  it('should render the add Secondary Mid buttons', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const visaButton = screen.getByRole('button', {
      name: 'Add Visa Secondary MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard Secondary MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings).toHaveLength(7)
  })

  it('should have the correct table header labels', () => {
    render(getDirectoryMerchantSecondaryMidsComponent())
    const headings = screen.getAllByTestId('table-header')

    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('STORE NAME')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('SCHEME STATUS')
    expect(headings[6]).toHaveTextContent('HARMONIA STATUS')
  })
})
