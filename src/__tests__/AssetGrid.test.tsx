import React from 'react'
import {render, screen} from '@testing-library/react'
import AssetGrid from 'components/AssetGrid'

jest.mock('components/AssetGrid/components/Asset', () => () => <div data-testid='asset'></div>)

const mockImageBaseProperties = {
  id: 1,
  description: 'mock-description',
  encoding: 'mock-encoding',
  cta_url: 'mock-cta-url',
}
const mockHeroImage = {
  type: 0,
  url: 'https://mock-url/mock-path/mock-image.jpg',
  ...mockImageBaseProperties,
}
const mockBannerImage = {
  type: 1,
  url: 'https://mock-url/mock-path/mock-image.jpg',
  ...mockImageBaseProperties,
}

const mockAssetGridComponent = (
  <AssetGrid planAssets={{
    dev: [mockHeroImage],
    staging: [mockHeroImage, mockBannerImage],
  }} />
)

describe('Asset Grid', () => {
  describe('Test Labels', () => {
    it('should render the correct number of labels', () => {
      render(mockAssetGridComponent)
      const labels = screen.getAllByRole('heading')

      expect(labels).toHaveLength(2)
    })

    it('should have correct label names', () => {
      render(mockAssetGridComponent)
      const heroLabel = screen.getByRole('heading', {
        name: 'HERO',
      })
      const bannerLabel = screen.getByRole('heading', {
        name: 'BANNER',
      })

      expect(heroLabel).toBeInTheDocument()
      expect(bannerLabel).toBeInTheDocument()
    })

    it('should have correct label numbering with multiple assets of the same type', () => {
      render(<AssetGrid planAssets={{
        dev: [],
        staging: [mockBannerImage, {
          type: 1,
          url: 'https://mock-url/mock-path/mock-image2.jpg',
          ...mockImageBaseProperties,
        }],
      }} />)

      const banner1 = screen.getByText('BANNER 1')
      const banner2 = screen.getByText('BANNER 2')
      const banner = screen.queryByText('BANNER')

      expect(banner1).toBeInTheDocument()
      expect(banner2).toBeInTheDocument()
      expect(banner).not.toBeInTheDocument()
    })
  })

  describe('Test Assets', () => {
    it('should render the correct number of assets', () => {
      render(mockAssetGridComponent)
      const assets = screen.getAllByTestId('asset')

      expect(assets).toHaveLength(3)
    })

    it('should render the correct number of Asset Not Found images', () => {
      render(mockAssetGridComponent)
      const assetNotFoundImage = screen.queryAllByTitle('No asset available')

      expect(assetNotFoundImage).toHaveLength(1)
    })
  })
})
