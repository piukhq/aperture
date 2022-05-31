import React from 'react'
import {render, screen} from '@testing-library/react'
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
  const mockPlanMetadata = {
    name: mockName,
    icon_url: mockUrl,
    slug: 'mock_slug',
    plan_id: 1,
  }

  const mockStoreFn = configureStore([])
  const store = mockStoreFn({})

  const mockProps = {
    metadata: mockPlanMetadata,
    viewClickFn: jest.fn(),
    counts: {
      merchants: 2,
      locations: 2,
      payment_schemes: mockPaymentSchemes,
    },
    optionsMenuItems: [{
      label: 'mockItem',
      icon: jest.fn(),
      clickHandler: jest.fn(),
    }],
  }

  const getPlanDirectoryTile = (passedProps = {}) => {
    return (
      <Provider store={store}>
        <DirectoryTile {...mockProps} {...passedProps} />
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

    describe('Test icon render', () => {
      it('should render image component and name', () => {
        render(getPlanDirectoryTile())

        expect(screen.queryByTestId('icon')).toBeInTheDocument()
        expect(screen.getByText(mockName)).toBeInTheDocument()
      })

      it('should render the icon placeholder when the image is not available', () => {
        const props = {
          ...mockProps,
          metadata: {
            ...mockPlanMetadata,
            icon_url: null,
          },
        }
        render(getPlanDirectoryTile(props))
        expect(screen.queryByTestId('icon-placeholder')).toBeInTheDocument()
        expect(screen.getByText(mockName)).toBeInTheDocument()
      })
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
      const props = {
        ...mockProps,
        counts: {
          ...mockProps.counts,
          merchants: 2,
        },
      }
      const {queryByText} = render(getPlanDirectoryTile(props))
      const merchantText = queryByText(/2 Merchants/)

      expect(merchantText).toBeInTheDocument()
    })

    it('should show zero merchant count when no merchants found', () => {
      const props = {
        ...mockProps,
        counts: {
          ...mockProps.counts,
          merchants: 0,
        },
      }
      const {queryByText} = render(getPlanDirectoryTile(props))
      const merchantText = queryByText(/0 Merchants/)

      expect(merchantText).toBeInTheDocument()
    })

    it('should show locations count when only one merchant found', () => {
      const props = {
        ...mockProps,
        counts: {
          ...mockProps.counts,
          merchants: 1,
        },
      }
      const {queryByText} = render(getPlanDirectoryTile(props))
      const locationText = queryByText(/2 Locations/)

      expect(locationText).toBeInTheDocument()
    })
  })
  // TODO: Test Merchant Specific things when implemented
})


