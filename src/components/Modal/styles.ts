import {ModalStyle} from 'utils/enums'

type ModalElements = {
  outerContainer: string,
  innerContainer: string,
  headerContainer: string,
  childrenContainer: string,
  isHeaderAtTop: boolean,
  header: string,
}

export const MODAL_STYLE_MAPS: Record<ModalStyle, ModalElements> = {
  [ModalStyle.WIDE]: {
    outerContainer: 'w-[620px] max-w-screen py-[10%]',
    innerContainer: 'rounded-[20px]',
    headerContainer: 'h-[61px] flex-row-reverse',
    childrenContainer: 'px-[10%]',
    isHeaderAtTop: false,
    header: 'font-heading-7 font-medium ',
  },
  [ModalStyle.CENTERED_HEADING]: {
    outerContainer: 'w-[650px] py-[10%]',
    innerContainer: 'rounded-[15px]',
    headerContainer: 'h-[41px] place-content-between',
    childrenContainer: 'px-[15px] pb-[21px]',
    isHeaderAtTop: true,
    header: 'font-semibold font-heading-5 w-full text-center',
  },
  [ModalStyle.COMPACT]: {
    outerContainer: 'w-[485px] py-[10%]',
    innerContainer: 'rounded-[15px]',
    headerContainer: 'h-[41px] place-content-between',
    childrenContainer: 'px-[15px] pb-[21px]',
    isHeaderAtTop: true,
    header: 'font-heading-7 font-medium',
  },
}
