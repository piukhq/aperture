import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import DirectoryTile from 'components/DirectoryTile'

jest.mock('components/OptionsMenuButton', () => () => <div data-testid='options-button' />)

describe('DirectoryTile', () => {
  const mockName = 'mock_name'
  const mockUrl = '/mock_url'
  const mockSchemeLabel = 'mock_scheme_label'
  const mockSchemeCount = 123456
  const mockPaymentSchemes = [
    {
      label: mockSchemeLabel,
      scheme_code: 0,
      count: mockSchemeCount,
    },
  ]
  const mockId = '1'
  const mockPlanMetadata = {
    name: mockName,
    icon_url: mockUrl,
    slug: 'mock_slug',
    plan_id: 1,
  }


  const mockStoreFn = configureStore([])
  const store = mockStoreFn({})


  const getPlanDirectoryTile = (merchantCount = 2) => {
    return (
      <Provider store={store}>
        <DirectoryTile
          metadata={mockPlanMetadata}
          counts={{
            merchants: merchantCount,
            locations: 2,
            payment_schemes: mockPaymentSchemes,
          }}
          id={mockId}
        />
      </Provider>
    )
  }

  describe('Test common elements', () => {
    it('should render Options button', () => {
      const {getByTestId} = render(getPlanDirectoryTile())

      expect(getByTestId('options-button')).toBeInTheDocument()
    })

    it('should render View button', () => {
      const {getByRole} = render(getPlanDirectoryTile())

      expect(getByRole('button', {name: /View/})).toBeInTheDocument()
    })

    it('should render image component and name', () => {
      const {queryByTestId, getByText} = render(getPlanDirectoryTile())

      expect(queryByTestId('icon')).toBeInTheDocument()
      expect(getByText(mockName)).toBeInTheDocument()
    })

    it('should render payment scheme labels and count', () => {
      const {getAllByText} = render(getPlanDirectoryTile())
      const schemeLabels = getAllByText(mockSchemeLabel.toLocaleUpperCase())

      expect(schemeLabels).toHaveLength(1)
      expect(schemeLabels[0]).toBeInTheDocument()
      expect(getAllByText(mockSchemeCount)[0]).toBeInTheDocument()
    })
  })

  describe('Test plan specific behavior', () => {
    it('should show merchant count when multiple merchants found', () => {
      const {queryByText} = render(getPlanDirectoryTile(2))
      const merchantText = queryByText(/2 Merchants/)

      expect(merchantText).toBeInTheDocument()
    })

    it('should show zero merchant count when no merchants found', () => {
      const {queryByText} = render(getPlanDirectoryTile(0))
      const merchantText = queryByText(/0 Merchants/)

      expect(merchantText).toBeInTheDocument()
    })

    it('should show locations count when only one merchant found', () => {
      const {queryByText} = render(getPlanDirectoryTile(1))
      const locationText = queryByText(/2 Locations/)

      expect(locationText).toBeInTheDocument()
    })
  })
  // TODO: Test Merchant Specific things when implemented
})


