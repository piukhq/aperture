import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryMerchantMids} from 'components'

// TODO: Add tests for actual table content when pulling from the API

describe('DirectoryMerchantMids', () => {
  it('should render the add Mid buttons', () => {
    render(<DirectoryMerchantMids/>)
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


  it('should have the correct table headers', () => {
    render(<DirectoryMerchantMids/>)
    const headings = screen.getAllByTestId('table-header')
    expect(headings).toHaveLength(7)
    expect(headings[2]).toHaveTextContent('VALUE')
    expect(headings[3]).toHaveTextContent('BIN')
    expect(headings[4]).toHaveTextContent('DATE ADDED')
    expect(headings[5]).toHaveTextContent('SCHEME STATUS')
    expect(headings[6]).toHaveTextContent('HARMONIA STATUS')
  })
})
