import {ModalStyle} from 'utils/enums'

type ModalElements = {
  outerContainer: string,
  headerContainer: string,
  childrenContainer: string,
  isHeaderAtTop: boolean,
  header: string,
}

export const MODAL_STYLE_MAPS: Record<ModalStyle, ModalElements> = {
  [ModalStyle.WIDE]: {
    outerContainer: 'w-[750px] py-[53px]',
    headerContainer: 'h-[61px] flex-row-reverse rounded-t-[20px] border-b-[1px] border-grey-200 dark:border-grey-800',
    childrenContainer: 'max-h-[calc(100%-61px)] rounded-b-[20px] px-[70px]',
    isHeaderAtTop: false,
    header: 'font-heading-7 font-medium ',
  },
  [ModalStyle.CENTERED_HEADING]: {
    outerContainer: 'w-[600px] pt-[20%] pb-[10%]',
    headerContainer: 'h-[41px] place-content-between rounded-t-[15px]',
    childrenContainer: 'max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px]',
    isHeaderAtTop: true,
    header: 'font-semibold font-heading-5 w-full text-center',
  },
  [ModalStyle.COMPACT]: {
    outerContainer: 'w-[485px] pt-[20%] pb-[10%]',
    headerContainer: 'h-[41px] place-content-between rounded-t-[15px] border-b-[1px] border-grey-200 dark:border-grey-800',
    childrenContainer: 'max-h-[calc(100%-41px)] rounded-b-[15px] px-[15px] pb-[21px]',
    isHeaderAtTop: true,
    header: 'font-heading-7 font-medium',
  },
}
