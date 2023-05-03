// TODO Add adjust for future functionality to be added in the component
import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryFileUploadModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

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

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown'/>)

jest.mock('react', () => {
  const actualReact = jest.requireActual('react')
  return {
    ...actualReact,
    useState: jest.fn(),
    useRef: jest.fn(), // causes issues mocking State without this
  }
})

const setState = jest.fn()

const mockStoreFn = configureStore([])
const store = mockStoreFn({})
const getDirectoryFileUploadModalComponent = () => (
  <Provider store={store}>
    <DirectoryFileUploadModal isPlanLevelFileUpload />
  </Provider>
)

const mockInvalidFile = {
  name: 'bad-test.csv',
  type: 'text/jpg',
}

const mockValidFile = {
  name: 'good-test.csv',
  type: 'text/csv',
  size: 2000,
}

const mockValidSmallFile = {
  name: 'good-small-test.csv',
  type: 'text/csv',
  size: 1000,
}

describe('DirectoryFileUploadModal', () => {

  describe('Test default behaviour', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      jest.spyOn(React, 'useState')
        .mockReturnValueOnce([false, setState])
        .mockReturnValueOnce([false, setState])
        .mockReturnValueOnce([false, setState])
        .mockReturnValue(['Merchant Details', setState])
    })


    it('should render the correct heading', () => {
      render(getDirectoryFileUploadModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'File Upload',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the file type label', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByText('FILE TYPE')).toBeInTheDocument()
    })

    it('should render the file type dropdown', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the drag and drop copy', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByText('Drag and drop file here or')).toBeInTheDocument()
    })

    it('should render the file browser button', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByLabelText('Browse')).toBeInTheDocument()
    })

    it('should render the upload button', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByLabelText('Upload')).toBeInTheDocument()
    })

    it('should render a disabled upload button', () => {
      render(getDirectoryFileUploadModalComponent())

      expect(screen.getByLabelText('Upload')).toBeDisabled()
    })
  })

  describe('Test when the file is not valid', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      jest.spyOn(React, 'useState')
        .mockReturnValueOnce([mockInvalidFile, setState])
        .mockReturnValueOnce([false, setState])
        .mockReturnValueOnce([false, setState])
        .mockReturnValue(['Merchant Details', setState])
    })


    it('should render the invalid file message', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByText('Oops!')).toBeInTheDocument()
      expect(screen.getByText('The file you have selected is not supported')).toBeInTheDocument()
      expect(screen.getByText('Drag and drop a CSV here to continue or')).toBeInTheDocument()
    })
  })

  describe('Test when the file is valid', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(React, 'useState')
        .mockReturnValueOnce([mockValidFile, jest.fn()]) // file
        .mockReturnValueOnce([true, jest.fn()]) // isValidFile
        .mockReturnValueOnce([false, jest.fn()]) // isUploading
        .mockReturnValueOnce(['Merchant Details', jest.fn()])
    })

    it('should render the file name', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByText('good-test.csv')).toBeInTheDocument()
    })

    it('should render the file size in kb', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByText('2kb')).toBeInTheDocument()
    })
    it('should render the remove file button', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByRole('button', {name: 'Remove file'})).toBeInTheDocument()
    })

    it('should render the enabled upload button', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByLabelText('Upload')).toBeEnabled()
    })
  })

  describe('Test when the file is valid and small', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(React, 'useState')
        .mockReturnValueOnce([mockValidSmallFile, jest.fn()]) // file
        .mockReturnValueOnce([true, jest.fn()]) // isValidFile
        .mockReturnValueOnce([false, jest.fn()]) // isUploading
        .mockReturnValueOnce(['Merchant Details', jest.fn()])
    })

    it('should render the file size in bytes', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByText('1000 bytes')).toBeInTheDocument()
    })
  })

  describe('Test when the file is uploading', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.spyOn(React, 'useState')
        .mockReturnValueOnce([mockValidFile, jest.fn()]) // file
        .mockReturnValueOnce([true, jest.fn()]) // isValidFile
        .mockReturnValueOnce([true, jest.fn()]) // isUploading
        .mockReturnValueOnce(['Merchant Details', jest.fn()])
    })

    it('should render the correct heading', () => {
      render(getDirectoryFileUploadModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'File Uploading',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the file uploading copy', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.getByText(/Upload has started for Merchant Details "good-test.csv". Depending on filesize, this could take a few minutes/)).toBeInTheDocument()
      expect(screen.getByText('Check the Action Log for further updates on upload progress')).toBeInTheDocument()
    })

    it('should not render the upload button', () => {
      render(getDirectoryFileUploadModalComponent())
      expect(screen.queryByLabelText('Upload')).not.toBeInTheDocument()
    })
  })
})


