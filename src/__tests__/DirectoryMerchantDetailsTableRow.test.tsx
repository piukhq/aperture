import React from 'react'
import {render, screen} from '@testing-library/react'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import DirectoryMerchantDetailsTableRow from 'components/DirectoryMerchantDetailsTable/components/DirectoryMerchantDetailsTableRow'

const mockRow = [
  {displayValue: 'mock_display_value_1'},
  {displayValue: 'mock_display_value_2'},
  {displayValue: 'mock_display_value_3'},
]

const mockStoreFn = configureStore([])
const store = mockStoreFn({})

let mockCopyRow = 0

const getDirectoryMerchantTableRow = () => (
  <Provider store={store}>
    <table>
      <tbody>
        <DirectoryMerchantDetailsTableRow
          index={1}
          row={mockRow}
          checked={false}
          onCheckboxChange={jest.fn()}
          singleViewRequestHandler={jest.fn()}
          setCopyRow={jest.fn()}
          copyRow={mockCopyRow}
          refValue='mock_ref_value'
        />
      </tbody>
    </table>
  </Provider>
)

describe('Test DirectoryMerchantDetailsTableRow', () => {
  it('should render the correct number of cells', () => {
    render(getDirectoryMerchantTableRow())

    expect(screen.getAllByRole('cell')).toHaveLength(mockRow.length + 2) // +2 for the checkbox and the copy URL button
  })

  it('should render a checkbox cell', () => {
    render(getDirectoryMerchantTableRow())

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('should render a copy url button when the row is not the set copy row', () => {
    render(getDirectoryMerchantTableRow())

    const button = screen.getByRole('button', {name: 'Copy URL'})
    expect(button).toBeInTheDocument()
  })

  it('should display copied label when row is the set copy row', () => {
    mockCopyRow = 1 // set the row to be the copy row
    render(getDirectoryMerchantTableRow())

    expect(screen.getByText('Copied')).toBeInTheDocument()
  })
})
