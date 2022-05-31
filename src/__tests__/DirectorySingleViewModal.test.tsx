import React from 'react'
import {render, screen} from '@testing-library/react'
import DirectorySingleViewModal from 'components/DirectorySingleViewModal'
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

const mockMidRef = 'mock_mid_ref'
const mockMid = 'mock_mid'
const mockVisaBin = 'mock_visa_bin'
const mockPayrollEnrollmentStatus = 'mock_payroll_enrollment_status'
const mockDateAdded = 'mock_date_added'
const mockTxmStatus = 'mock_txm_status'

const mockMerchantDetailsState = {
  directoryMerchant: {
    selectedEntity: {
      mid_ref: mockMidRef,
      mid_metadata: {
        payment_scheme_code: 1,
        mid: mockMid,
        visa_bin: mockVisaBin,
        payment_enrolment_status: mockPayrollEnrollmentStatus,
      },
      date_added: mockDateAdded,
      txm_status: mockTxmStatus,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockMerchantDetailsState})

const getDirectorySingleViewModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectorySingleViewModal />
  </Provider>
)

describe('DirectorySingleViewModal', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      query: {
        planId: 'mock_plan_id',
        merchantId: 'mock_merchant_id',
        tab: 'mids',
        ref: mockMidRef,
      },
    }))

    React.useState = jest.fn().mockReturnValueOnce(['Details', jest.fn()])
    React.useState = jest.fn().mockReturnValueOnce(['', jest.fn()])
    React.useState = jest.fn().mockReturnValue([null, jest.fn()])
  })

  it('should render the Navigation tabs', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Comments')).toBeInTheDocument()
  })

  it('should render the Copy Link button', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Copy link'})).toBeInTheDocument()
  })

  it('should render the Delete button', () => {
    render(getDirectorySingleViewModalComponent())
    expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument()
  })
})


