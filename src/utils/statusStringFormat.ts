import {classNames} from './classNames'
import {PaymentSchemeStatus, PaymentSchemeStatusDisplayValue, DirectoryTxmStatus, DirectoryTxmStatusDisplayValue} from './enums'

export const getPaymentSchemeStatusString = (paymentEnrolmentStatus: string) => {
  return {
    displayValue: PaymentSchemeStatusDisplayValue[paymentEnrolmentStatus],
    additionalStyles: classNames(
      'font-body-3',
      `${(paymentEnrolmentStatus === PaymentSchemeStatus.UNKNOWN || paymentEnrolmentStatus === PaymentSchemeStatus.NOT_ENROLLED) && 'text-grey-600'}`,
      `${paymentEnrolmentStatus === PaymentSchemeStatus.ENROLLED && 'text-aquamarine'}`,
      `${paymentEnrolmentStatus === PaymentSchemeStatus.ENROLLING && 'text-yellow'}`,
      `${(paymentEnrolmentStatus === PaymentSchemeStatus.REMOVED || paymentEnrolmentStatus === PaymentSchemeStatus.FAILED) && 'text-red'}`,
    ),
  }
}

export const getHarmoniaStatusString = (txmStatus: string) => {
  return {
    displayValue: DirectoryTxmStatusDisplayValue[txmStatus],
    additionalStyles: classNames(
      'font-body-3',
      `${txmStatus === DirectoryTxmStatus.NOT_ONBOARDED && 'text-grey-600'}`,
      `${txmStatus === DirectoryTxmStatus.ONBOARDED && 'text-aquamarine'}`,
      `${txmStatus === DirectoryTxmStatus.OFFBOARDED && 'text-red'}`,
      `${(txmStatus === DirectoryTxmStatus.ONBOARDING || txmStatus === DirectoryTxmStatus.OFFBOARDING) && 'text-yellow'}`,
    ),
  }
}
