import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {DirectoryMerchantMids} from 'components'

// TODO: Add tests for actual table content when pulling from the API

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  modalRequested: 'NO_MODAL',
}})

const getDirectoryMerchantMidsComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryMerchantMids />
  </Provider>
)

describe('DirectoryMerchantMids', () => {
  it('should render the add Mid buttons', () => {
    render(getDirectoryMerchantMidsComponent())

    const visaButton = screen.getByRole('button', {
      name: 'Add Visa MID',
    })
    const mastercardButton = screen.getByRole('button', {
      name: 'Add Mastercard MID',
    })
    const amexButton = screen.getByRole('button', {
      name: 'Add Amex MID',
    })

    expect(visaButton).toBeInTheDocument()
    expect(mastercardButton).toBeInTheDocument()
    expect(amexButton).toBeInTheDocument()
  })

  it('should have the correct number of table headers', () => {
    render(getDirectoryMerchantMidsComponent())
    const headings = screen.getAllByTestId('table-header')
    expect(headings).toHaveLength(7)
  })

  it('should have the correct table headers', () => {
    render(getDirectoryMerchantMidsComponent())
    const headings = screen.getAllByTestId('table-header')
    expect(headings).toHaveLength(7)
    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('BIN')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('SCHEME STATUS')
    expect(headings[6]).toHaveTextContent('HARMONIA STATUS')
  })
})
