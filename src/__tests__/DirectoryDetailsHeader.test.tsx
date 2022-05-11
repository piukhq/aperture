import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryDetailsHeader} from 'components'

jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)
jest.mock('components/DirectoryMerchantModal', () => () => <div data-testid='new-merchant-modal' />) // TODO: To be updated with new plan modal implementation

const mockName = 'mock_name'
const mockIconUrl = '/mock_url'
const mockSlug = 'mock_slug'
const mockPlanId = 1234
const mockLocationLabel = 'mock_cafe'

const getDirectoryDetailsHeaderPlanComponent = () => (
  <DirectoryDetailsHeader name={mockName} iconUrl={mockIconUrl} slug={mockSlug} planId={mockPlanId} newItemButtonHandler={() => null} />
)
const getDirectoryDetailsHeaderMerchantComponent = () => (
  <DirectoryDetailsHeader name={mockName} iconUrl={mockIconUrl} slug={mockSlug} planId={mockPlanId} locationLabel={mockLocationLabel} isMerchant />
)

describe('DirectoryDetailsHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_id',
      },
    }))
  })

  it('should render correct metadata', () => {
    render(getDirectoryDetailsHeaderPlanComponent())

    expect(screen.getByText(mockName)).toBeInTheDocument()
    expect(screen.getByText(mockSlug)).toBeInTheDocument()
    expect(screen.getByText(mockPlanId)).toBeInTheDocument()
  })

  it('should render the icon image', () => {
    render(getDirectoryDetailsHeaderPlanComponent())

    expect(screen.queryByTestId('icon-image')).toBeInTheDocument()
  })

  it('should render the Options button', () => {
    render(getDirectoryDetailsHeaderPlanComponent())
    expect(screen.getByRole('button', {name: 'Options'})).toBeInTheDocument()
  })


  describe('Plan-specific behavior', () => {
    it('should not render the location label', () => {
      render(getDirectoryDetailsHeaderPlanComponent())
      const locationLabel = screen.queryByText(mockLocationLabel)
      const locationLabelHeader = screen.queryByText('Location Label')

      expect(locationLabel).not.toBeInTheDocument()
      expect(locationLabelHeader).not.toBeInTheDocument()
    })

    it('should render the New Merchant button', () => {
      render(getDirectoryDetailsHeaderPlanComponent())
      expect(screen.getByRole('button', {name: 'New Merchant'})).toBeInTheDocument()
    })
  })

  describe('Merchant-specific behavior', () => {
    it('should render the location label', () => {
      render(getDirectoryDetailsHeaderMerchantComponent())
      const locationLabel = screen.queryByText(mockLocationLabel)
      const locationLabelHeader = screen.queryByText('Location Label')

      expect(locationLabel).toBeInTheDocument()
      expect(locationLabelHeader).toBeInTheDocument()
    })

    it('should not render the New Merchant button', () => {
      render(getDirectoryDetailsHeaderMerchantComponent())
      expect(screen.queryByRole('button', {name: 'New Merchant'})).not.toBeInTheDocument()
    })
  })
})
