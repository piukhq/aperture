import React from 'react'
import {render, screen} from '@testing-library/react'
import Asset from 'components/AssetGrid/components/Asset'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

const mockStoreFn = configureStore([])
const store = mockStoreFn({})

const mockImage = {
  id: 1,
  type: 0,
  url: 'https://mock-url/mock-path/mock-image.jpg',
  description: 'mock-description',
  encoding: 'mock-encoding',
  cta_url: 'mock-cta-url',
}

const mockAsset = {
  image: mockImage,
  assetType: {
    dev: [mockImage],
    hasMultipleImagesOfThisType: false,
    heading: 'mock-heading',
    longestAssetArray: [mockImage],
    staging: [],
  },
  typeIndex: 0,
  imageEnv: 'dev',
}

const {image, assetType, typeIndex, imageEnv} = mockAsset

const getAssetComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <Asset image={image} assetType={assetType} typeIndex={typeIndex} imageEnv={imageEnv}/>
  </Provider>
)


describe('Asset', () => {
  describe('Test Asset found', () => {
    it('should render a button with correct accessible name', () => {
      render(getAssetComponent())
      const assetButton = screen.getByRole('button', {
        name: `${imageEnv} ${mockImage.description}`,
      })

      expect(assetButton).toBeInTheDocument()
    })

    it('should render the asset image with correct alt-text', () => {
      render(getAssetComponent())
      const assetImage = screen.getByAltText('mock-description')

      expect(assetImage).toBeInTheDocument()
    })
  })

  describe('Test Asset Load error state', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValue([true, setStateMock])
    })

    it('should render a error button', () => {
      render(getAssetComponent())
      const errorButton = screen.getByTitle('Asset could not load')

      expect(errorButton).toBeInTheDocument()
    })
  })

  describe('Test Asset loading state', () => {
    beforeEach(() => {
      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValueOnce([false, setStateMock])
        .mockReturnValue([true, setStateMock])
    })

    it('should render a loading image when loading', () => {
      render(getAssetComponent())
      const loadingSection = screen.getByTitle('Loading')

      expect(loadingSection).toBeInTheDocument()
    })
  })
})
