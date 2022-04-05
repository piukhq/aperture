import React from 'react'
import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import {AssetModal} from 'components'

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, unknown>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

const mockAsset = {
  image: {
    id: 1,
    type: 0,
    url: 'https://mock-url/mock-path/mock-image.jpg',
    description: 'mock-description',
    encoding: 'mock-encoding',
  },
  hasMultipleImagesOfThisType: true,
  typeIndex: 0,
  heading: 'mock-heading',
  environment: 'dev',
}

const mockDimensions = {
  naturalHeight: 123,
  naturalWidth: 456,
}

const mockStoreFn = configureStore([])

const {heading, typeIndex} = mockAsset
const mockHeading = `${heading} ${typeIndex + 1} Asset ${mockAsset.image.id}`

const mockModalObject = {modal: {
  modalRequested: 'MODAL',
}}

const mockInitialState = { // mocks when multiple assets are available
  mockModalObject,
  planAssets: {
    selectedPlanImages: [],
    selectedAssetEnvironment: 'dev',
    selectedAssetGroup: {
      dev: mockAsset,
      staging: mockAsset,
    },
  },
}

let store = mockStoreFn({...mockInitialState})

const getAssetModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <AssetModal/>
  </Provider>
)

describe('Asset Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockImplementationOnce(() => [mockDimensions, setStateMock])
      .mockImplementation(() => [false, setStateMock])
      .mockImplementation(() => [false, setStateMock])
  })

  describe('Test heading and environment tags ', () => {
    it('should render the correct heading', () => {
      render(getAssetModalComponent())
      const heading = screen.getByRole('heading', {
        name: mockHeading,
      })

      expect(heading).toBeInTheDocument()
    })

    it('should not render the Error state heading', () => {
      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockImplementation(() => [true, setStateMock])
      render(getAssetModalComponent())
      const errorHeading = screen.getByText(`${mockHeading} could not load`)

      expect(errorHeading).toBeInTheDocument()
    })

    // TODO: Update this test once all environments are implemented
    it('should render the correct environment tags', () => {
      render(getAssetModalComponent())
      const tagLabels = screen.getAllByTestId('tag-label')

      expect(tagLabels).toHaveLength(2)
      expect(tagLabels[0]).toHaveTextContent('D')
      expect(tagLabels[1]).toHaveTextContent('S')
    })
  })

  describe('Test Image Section ', () => {
    it('should render navigation buttons with correct aria-label', () => {
      render(getAssetModalComponent())
      const leftArrow = screen.getByLabelText('Previous Environment')
      const rightArrow = screen.getByLabelText('Next Environment')

      expect(leftArrow).toBeInTheDocument()
      expect(rightArrow).toBeInTheDocument()
    })

    it('should not render navigation buttons', () => {
      store = mockStoreFn({ // mocks when only one asset is found
        mockModalObject,
        planAssets: {
          selectedPlanImages: [],
          selectedAssetEnvironment: 'dev',
          selectedAssetGroup: {
            dev: mockAsset,
            staging: null,
          },
        }})
      render(getAssetModalComponent())
      const leftArrow = screen.queryByLabelText('Previous Environment')
      const rightArrow = screen.queryByLabelText('Next Environment')

      expect(leftArrow).not.toBeInTheDocument()
      expect(rightArrow).not.toBeInTheDocument()
    })

    it('should render the asset image with correct alt-text', () => {
      render(getAssetModalComponent())
      const assetImage = screen.getByAltText('mock-description')
      expect(assetImage).toBeInTheDocument()
    })
  })

  describe('Test Asset Details section ', () => {
    it('should render the asset details section ', () => {
      render(getAssetModalComponent())
      const assetDetails = screen.queryByTestId('asset-details')

      expect(assetDetails).toBeInTheDocument()
    })

    it('should not render the asset details section ', () => {
      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockImplementation(() => [true, setStateMock])
      render(getAssetModalComponent())
      const assetDetails = screen.queryByTestId('asset-details')

      expect(assetDetails).not.toBeInTheDocument()
    })

    it('should render the asset dimensions with the correct label', () => {
      render(getAssetModalComponent())
      const dimensionsLabel = screen.getByText('Dimensions')
      const dimensions = screen.getByText(`${mockDimensions.naturalWidth} x ${mockDimensions.naturalHeight}`)

      expect(dimensionsLabel).toBeInTheDocument()
      expect(dimensions).toBeInTheDocument()
    })

    it('should render the asset filetype with the correct capitalised label', () => {
      render(getAssetModalComponent())
      const fileTypeLabel = screen.getByText('Filetype')
      const fileType = screen.getByText(mockAsset.image.encoding.toLocaleUpperCase())

      expect(fileTypeLabel).toBeInTheDocument()
      expect(fileType).toBeInTheDocument()
    })

    it('should render the asset filename with correct label', () => {
      const urlArray = mockAsset.image.url.split('/')
      const mockFilename = urlArray[urlArray.length - 1]
      render(getAssetModalComponent())
      const fileNameLabel = screen.getByText('Filename')
      const fileName = screen.getByText(mockFilename)

      expect(fileNameLabel).toBeInTheDocument()
      expect(fileName).toBeInTheDocument()
    })
  })

  describe('Test JSON section ', () => {
    it('should render the JSON block', () => {
      render(getAssetModalComponent())
      const JSONBlock = screen.getByTestId('json-block')

      expect(JSONBlock).toBeInTheDocument()
    })

    it('should render correct number of line numbers', () => {
      const numberOfLines = JSON.stringify(mockAsset.image).split(/[,{}]+/).length
      render(getAssetModalComponent())
      const lineNumbers = screen.getByTestId('line-numbers')

      expect(lineNumbers).toBeInTheDocument()
      expect(lineNumbers.children).toHaveLength(numberOfLines)
    })
  })

  describe('Test Django link and download button', () => {
    it('should render the View in Django anchor tag with correct link', () => {
      const mockDjangoUrl = `https://api.${mockInitialState.planAssets.selectedAssetEnvironment}.gb.bink.com/admin/scheme/schemeimage/${mockAsset.image.id}/change/`
      render(getAssetModalComponent())
      const djangoLink = screen.getByRole('link', {
        name: 'View in Django',
      })

      expect(djangoLink).toBeInTheDocument()
      expect(djangoLink).toHaveAttribute('href', mockDjangoUrl)
    })

    it('should render the Download button', () => {
      render(getAssetModalComponent())
      const downloadButton = screen.getByRole('button', {
        name: 'Download',
      })

      expect(downloadButton).toBeInTheDocument()
    })
  })
})
