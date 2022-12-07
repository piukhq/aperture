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
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRows: [],
  },
})

const mockProps = {
  index: 1,
  row: mockRow,
  onCheckboxChange: jest.fn(),
  singleViewRequestHandler: jest.fn(),
  setCopyRow: jest.fn(),
  copyRow: 0,
  refValue: 'mock_ref_value',
}

const getDirectoryMerchantTableRow = (passedProps = {}) => (
  <Provider store={store}>
    <table>
      <tbody>
        <DirectoryMerchantDetailsTableRow {...mockProps} {...passedProps} />
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
    render(getDirectoryMerchantTableRow({copyRow: 1}))

    expect(screen.getByText('Copied')).toBeInTheDocument()
  })

  it('should render the icon and display value', () => {
    render(getDirectoryMerchantTableRow({
      row: [
        ...mockRow,
        {icon: 'mfdmsfm'},
      ],
    }))
    expect(screen.getByTestId('icon-display-value')).toBeInTheDocument()
  })

  it('should render only the display value', () => {
    render(getDirectoryMerchantTableRow({
      row: [{displayValue: 'mock_display_value_1'}],
    }))
    expect(screen.getByTestId('display-value')).toBeInTheDocument()
    expect(screen.queryByTestId('icon-display-value')).not.toBeInTheDocument()
  })
})
