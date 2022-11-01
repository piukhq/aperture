import {classNames} from './classNames'
import {DirectoryTxmStatus, DirectoryTxmStatusDisplayValue} from './enums'

export const determineHarmoniaStatus = (txmStatus: string) => {
  return {
    displayValue: DirectoryTxmStatusDisplayValue[txmStatus],
    additionalStyles: classNames(
      'font-body-3 pl-[20px]',
      `${txmStatus === DirectoryTxmStatus.NOT_ONBOARDED && 'text-grey-600'}`,
      `${txmStatus === DirectoryTxmStatus.ONBOARDED && 'text-aquamarine'}`,
      `${txmStatus === DirectoryTxmStatus.OFFBOARDED && 'text-red'}`,
      `${(txmStatus === DirectoryTxmStatus.ONBOARDING || txmStatus === DirectoryTxmStatus.OFFBOARDING) && 'text-yellow'}`,
    ),
  }
}
