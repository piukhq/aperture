import React from 'react'
import {render, screen} from '@testing-library/react'
import ImageDetails from './ImageDetails'

const mockImage = {
  type: 1,
  url: 'https://mock-hero-url',
  id: 1,
  encoding: '',
  description: '',
}

const mockImageAlternate = {
  type: 2,
  url: 'https://mock-other-url',
  id: 2,
  encoding: '',
  description: '',
}

const mockProps = {
  categoryAcrossEnvsArray: [
    [mockImage, mockImage],
    [mockImage, mockImage],
    [mockImage, mockImage],
  ],
}

const getImageDetailsComponent = (passedProps) => {
  return <ImageDetails {...mockProps} {...passedProps} />
}

describe('Test ImageDetails', () => {
  it('should render the ImageDetails component', () => {
    const {container} = render(getImageDetailsComponent({}))

    expect(container).toBeInTheDocument()
  })

  it('should display the correct copy when all images match across environments', () => {
    render(getImageDetailsComponent({}))
    expect(screen.queryByText('The number of images per type match across environments but please confirm they are actually the same via Asset Comparator')).toBeInTheDocument()
  })

  it('should display the correct copy when image types do not match across environments', () => {
    const mockPropsAlternateType = {
      categoryAcrossEnvsArray: [
        [mockImage, mockImage],
        [mockImage, mockImage],
        [mockImage, mockImageAlternate],
      ],
    }
    render(getImageDetailsComponent(mockPropsAlternateType))
    expect(screen.queryByText('The number of images per type do not match across environments')).toBeInTheDocument()
  })

  it('should display the correct copy when image counts do not match across environments', () => {
    const mockPropsMismatchedNumber = {
      categoryAcrossEnvsArray: [
        [mockImage, mockImage],
        [mockImage, mockImage],
        [mockImage],
      ],
    }
    render(getImageDetailsComponent(mockPropsMismatchedNumber))
    expect(screen.queryByText('The total number of images do not match across environments')).toBeInTheDocument()
  })
})
