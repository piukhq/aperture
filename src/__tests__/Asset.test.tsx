import React from 'react'
import * as Redux from 'react-redux'
import {render, screen, fireEvent} from '@testing-library/react'
import Asset from 'components/AssetGrid/components/Asset'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {setSelectedAssetEnvironment, setSelectedAssetGroup} from 'features/planAssetsSlice'
import {requestModal} from 'features/modalSlice'
import {ModalType} from 'utils/enums'

const useDispatchMock = jest.spyOn(Redux, 'useDispatch')

const mockImage = {
  id: 1,
  type: 0,
  url: 'https://mock-url/mock-path/mock-image.jpg',
  description: 'mock-description',
  encoding: 'mock-encoding',
  cta_url: 'mock-cta-url',
}

const mockAssetType = {
  dev: [mockImage],
  hasMultipleImagesOfThisType: false,
  heading: 'mock-heading',
  longestAssetArray: [mockImage],
  staging: [],
  prod: [],
}

const mockTypeIndex = 0
const mockImageEnv = 'dev'

const setStateMock = jest.fn()

const mockStoreFn = configureStore([])
const store = mockStoreFn({})
const getAssetComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <Asset image={mockImage} assetType={mockAssetType} typeIndex={mockTypeIndex} imageEnv={mockImageEnv}/>
  </Provider>
)

const dummyDispatch = jest.fn()
useDispatchMock.mockReturnValue(dummyDispatch)

describe('Asset', () => {
  describe('Test Asset found', () => {
    it('should render a button with correct accessible name', () => {
      render(getAssetComponent())
      const assetButton = screen.getByRole('button', {
        name: `${mockImageEnv} ${mockImage.description}`,
      })

      expect(assetButton).toBeInTheDocument()
    })

    it('should render the asset image with correct alt-text', () => {
      render(getAssetComponent())
      const assetImage = screen.getByAltText(`${mockImageEnv} ${mockAssetType.heading} ${mockAssetType.hasMultipleImagesOfThisType && mockTypeIndex + 1}`)

      expect(assetImage).toBeInTheDocument()
    })

    // Unsure about this test as it feels like it leaks a certain
    // level of implementation details within the test.
    it('should dispatch the correct redux actions when clicked', () => {
      const mockAssetObject = {
        dev: {
          environment: 'dev',
          hasMultipleImagesOfThisType: false,
          heading: 'mock-heading',
          image: {
            cta_url: 'mock-cta-url',
            description: 'mock-description',
            encoding: 'mock-encoding',
            id: 1,
            type: 0,
            url: 'https://mock-url/mock-path/mock-image.jpg',
          },
          typeIndex: 0,
        },
        staging: null,
        prod: null,
      }

      render(getAssetComponent())

      const assetButton = screen.getByRole('button', {
        name: `${mockImageEnv} ${mockImage.description}`,
      })

      fireEvent.click(assetButton)

      expect(dummyDispatch).toBeCalledWith(setSelectedAssetEnvironment(mockImageEnv))
      expect(dummyDispatch).toBeCalledWith(setSelectedAssetGroup(mockAssetObject))
      expect(dummyDispatch).toBeCalledWith(requestModal(ModalType.ASSET_COMPARATOR_ASSET))
    })
  })

  describe('Test Asset Load error state', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      React.useState = jest.fn().mockReturnValue([true, setStateMock])
    })

    it('should render a error button', () => {
      render(getAssetComponent())
      const errorButton = screen.getByTitle('Asset could not load')

      expect(errorButton).toBeInTheDocument()
    })
  })

  describe('Test Asset loading state', () => {
    beforeEach(() => {
      React.useState = jest.fn()
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
