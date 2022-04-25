import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryDetailsHeader} from 'components'

jest.mock('components/DirectoryTile', () => () => <div data-testid='directory-tile' />)
jest.mock('components/DirectoryMerchantModal', () => () => <div data-testid='new-merchant-modal' />) // TODO: To be updated with new plan modal implementation

const mockName = 'mock_name'
const mockUrl = '/mock_url'
const mockSlug = 'mock_slug'
const mockId = 1234

const mockMetadata = {
  name: mockName,
  icon_url: mockUrl,
  slug: mockSlug,
  plan_id: mockId,
}

const getDirectoryDetailsHeaderComponent = () => (
  <DirectoryDetailsHeader metadata={mockMetadata} newItemButtonHandler={() => null} />
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

  it('should render correct plan details metadata', () => {
    render(getDirectoryDetailsHeaderComponent())
    expect(screen.getByText(mockName)).toBeInTheDocument()
    expect(screen.getByText(mockSlug)).toBeInTheDocument()
    expect(screen.getByText(mockId)).toBeInTheDocument()
  })

  it('should render the New Merchant button and Options button', () => {
    render(getDirectoryDetailsHeaderComponent())
    expect(screen.getByRole('button', {name: 'New Merchant'})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Options'})).toBeInTheDocument()
  })

  it('should render the icon image', () => {
    render(getDirectoryDetailsHeaderComponent())
    expect(screen.queryByTestId('icon-image')).toBeInTheDocument()
  })
})
