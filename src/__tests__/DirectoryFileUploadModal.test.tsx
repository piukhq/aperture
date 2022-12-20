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

const mockStoreFn = configureStore([])
const store = mockStoreFn({})
const getDirectoryFileUploadModalComponent = () => (
  <Provider store={store}>
    <DirectoryFileUploadModal isPlanLevelFileUpload />
  </Provider>
)

describe('DirectoryFileUploadModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([null, setStateMock])
      .mockReturnValueOnce([null, setStateMock])
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
})
