// Dummy secondary mids data, placeholder for future ticket. Unsure of exact date format is leaving as string for now till required.

import {DirectorySecondaryMids} from 'types'

export const mockSecondaryMidsData: DirectorySecondaryMids = [
  {
    secondary_mid_ref: 'SMID13fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 1,
      mid: '446720350',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_merchant_name: 'Mock Merchant 1',
    },
    date_added: 'Mar 21, 2020, 3:30pm',
    txm_status: 'txm_status 1',
  },
  {
    secondary_mid_ref: 'SMID23fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 2,
      mid: '222425984',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_merchant_name: 'Mock Merchant 2',
    },
    date_added: 'Feb 21, 2020, 2:11pm',
    txm_status: 'txm_status 2',
  },
  {
    secondary_mid_ref: 'SMID33fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 2,
      mid: '33342598',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_merchant_name: 'Mock Merchant 3',
    },
    date_added: 'Jun 24, 2021, 7:49pm',
    txm_status: 'txm_status 3',
  },
  {
    secondary_mid_ref: 'SMID43fa85f64-5717-4562-b3fc-2c963f66afa6',
    secondary_mid_metadata: {
      payment_scheme_code: 1,
      mid: '4444259847329',
      payment_enrolment_status: 'payroll_enrollment_status',
      payment_scheme_merchant_name: 'Mock Merchant 4',
    },
    date_added: 'Oct 1, 2012, 1:02am',
    txm_status: 'txm_status 4',
  },
]
