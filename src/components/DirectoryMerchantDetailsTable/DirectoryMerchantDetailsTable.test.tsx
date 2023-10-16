import React from 'react'
import {render, screen} from '@testing-library/react'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import DirectoryMerchantDetailsTable from 'components/DirectoryMerchantDetailsTable'

jest.mock('components/DirectoryMerchantDetailsTable/components/DirectoryMerchantDetailsTableRow', () => () => <tr data-testid='table-row' />)

const mockStoreFn = configureStore([])
const store = mockStoreFn({
  directoryMerchant: {
    selectedTableCheckedRows: [],
  },
})

const mockTableHeaderDisplayValue1 = 'mock_table_header_display_value_1'
const mockTableHeaderDisplayValue2 = 'mock_table_header_display_value_2'
const mockTableHeaderDisplayValue3 = 'mock_table_header_display_value_3'

const mockTableRowDisplayValue1 = 'mock_table_row_display_value_1'
const mockTableRowDisplayValue2 = 'mock_table_row_display_value_2'
const mockTableRowDisplayValue3 = 'mock_table_row_display_value_3'

const mockTableHeaders = [
  {
    displayValue: mockTableHeaderDisplayValue1,
  },
  {
    displayValue: mockTableHeaderDisplayValue2,
  },
  {
    displayValue: mockTableHeaderDisplayValue3,
  },
]

const mockTableRows = [[
  {
    displayValue: mockTableRowDisplayValue1,
  },
  {
    displayValue: mockTableRowDisplayValue2,
  },
  {
    displayValue: mockTableRowDisplayValue3,
  },
], [
  {
    displayValue: mockTableRowDisplayValue1,
  },
  {
    displayValue: mockTableRowDisplayValue2,
  },
  {
    displayValue: mockTableRowDisplayValue3,
  },
]]

const getDirectoryMerchantDetailsTable = (passedProps = {}) => (
  <Provider store={store}>
    <DirectoryMerchantDetailsTable
      fieldSortedBy='mock_field_sorted_by'
      sortingFn={jest.fn()}
      tableHeaders={mockTableHeaders}
      tableRows={mockTableRows}
      singleViewRequestHandler={jest.fn()}
      refArray={[]}
      {...passedProps}
    />
  </Provider>
)

describe('Test DirectoryMerchantDetailsTable', () => {
  it('should render the correct table headers', () => {
    render(getDirectoryMerchantDetailsTable())

    const headings = screen.getAllByTestId('table-header')
    expect(headings[1]).toHaveTextContent(mockTableHeaderDisplayValue1)
    expect(headings[2]).toHaveTextContent(mockTableHeaderDisplayValue2)
    expect(headings[3]).toHaveTextContent(mockTableHeaderDisplayValue3)
  })

  it('should render the correct number of DirectoryMerchantDetailsTableRow components', () => {
    render(getDirectoryMerchantDetailsTable())
    expect(screen.getAllByTestId('table-row')).toHaveLength(2)
  })

  it('should not render the table headers if there are no table rows', () => {
    render(getDirectoryMerchantDetailsTable({tableRows: []}))
    expect(screen.queryByTestId('table-header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('table-row')).not.toBeInTheDocument()
  })
})
