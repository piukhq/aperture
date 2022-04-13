export enum InputType {
  TEXT,
  PASSWORD,
  SEARCH,
  SELECT,
  SEARCH_SELECT,
}

export enum InputWidth {
  FULL,
  LARGE,
  MEDIUM,
  SMALL,
}

export enum InputColour {
  BLUE,
  LIGHT_BLUE,
  RED,
  GREY,
  DARK_GREY,
  LIGHT_GREY,
  GREEN,
}

export enum InputStyle {
  FULL,
  UNDERLINE_ICON_LEFT,
  UNDERLINE_ICON_RIGHT,
  FULL_SMALL,
  FULL_SMALL_LABEL_HIDDEN,
  UNDERLINE_ICON_LEFT_SMALL,
  UNDERLINE_ICON_RIGHT_SMALL,
  UNDERLINE_SMALL_LABEL_HIDDEN,
  WHITE_ICON_LEFT_SMALL,
  TRANSPARENT_ICON_LEFT_SMALL,
  TRANSPARENT_ICON_RIGHT_SMALL,
  WHITE_ICON_LEFT,
  WHITE_ICON_RIGHT_SMALL,
  WHITE_ICON_RIGHT,
}

export const INPUT_TYPE_MAPS: Record<InputType, string> = {
  [InputType.TEXT]: 'text',
  [InputType.PASSWORD]: 'password',
  [InputType.SEARCH]: 'search',
  [InputType.SELECT]: 'select',
  [InputType.SEARCH_SELECT]: 'search-select',
}

export const INPUT_WIDTH_MAPS: Record<InputWidth, string> = {
  [InputWidth.FULL]: 'w-full',
  [InputWidth.LARGE]: 'w-[485px]',
  [InputWidth.MEDIUM]: 'w-[260px]',
  [InputWidth.SMALL]: 'w-[240px]',
}

export const INPUT_COLOUR_MAPS: Record<InputColour, { label: string, input: string}> = {
  [InputColour.BLUE]: {
    label: 'text-blue',
    input: 'border-blue border-b-blue',
  },
  [InputColour.LIGHT_BLUE]: {
    label: 'text-lightBlue',
    input: 'border-lightBlue border-b-lightBlue',
  },
  [InputColour.RED]: {
    label: 'text-red',
    input: 'border-red border-b-red',
  },
  [InputColour.GREY]: {
    label: 'text-grey-500',
    input: 'border-grey-500 border-b-grey-500',
  },
  [InputColour.DARK_GREY]: {
    label: 'text-grey-500',
    input: 'border-grey-700 border-b-grey-700',
  },
  [InputColour.LIGHT_GREY]: {
    label: 'text-grey-300',
    input: 'border-grey-300 border-b-grey-300',
  },
  [InputColour.GREEN]: {
    label: 'text-green',
    input: 'border-green border-b-green',
  },
}

export const INPUT_STYLE_MAPS: Record<InputStyle, { container: string, label: string, input: string, icon: string}> = {
  [InputStyle.UNDERLINE_ICON_LEFT]: {
    container: 'h-[48px]',
    label: 'hidden',
    input: 'w-full h-[48px] pl-9 border-b-[1px] bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[12px] left-[1px] w-[25px] h-[15px]',
  },
  [InputStyle.UNDERLINE_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-9 border-b-[1px] bg-transparent font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[8px] left-[1px]',
  },
  [InputStyle.UNDERLINE_ICON_RIGHT]: {
    container: 'h-[58px]',
    label: 'absolute top-[-13px] px-1 text-2xs text-grey-500 font-body bg-white dark:bg-grey-850 z-10',
    input: 'w-full h-[39px] pl-1 pr-10 border-b-[1px] bg-transparent font-body text-base tracking-[0.1px]',
    icon: 'absolute top-[8px] right-[1px]',
  },
  [InputStyle.UNDERLINE_ICON_RIGHT_SMALL]: {
    container: 'h-[55px]',
    label: 'absolute top-[-13px] px-1 text-2xs text-grey-500 font-body bg-white dark:bg-grey-850 z-10 tracking-[0px]',
    input: 'w-full h-[37px] pr-10 pl-1 border-b-[1px] bg-transparent font-body text-sm tracking-[0.09px]',
    icon: 'absolute top-[5px] right-[10px]',
  },
  [InputStyle.UNDERLINE_SMALL_LABEL_HIDDEN]: {
    container: 'h-[55px]',
    label: 'hidden',
    input: 'w-full h-[39px] p-1 border-b-[1px] bg-transparent font-body text-sm tracking-[0.09px] placeholder-grey-600',
    icon: 'absolute top-[10px] right-[1px]',
  },
  [InputStyle.FULL]: {
    container: 'h-[48px]',
    label: 'absolute top-[-8px] left-[13px] h-[10px] bg-white dark:bg-grey-850 bg-bottom px-1  text-2xs font-body z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.FULL_SMALL]: {
    container: 'h-[42px]',
    label: 'absolute top-[-8px] left-[13px] h-[10px] bg-white dark:bg-grey-850 bg-bottom px-1 dark:bg-grey-850 text-4xs font-body z-10',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.FULL_SMALL_LABEL_HIDDEN]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-full p-4 bg-transparent border rounded-[10px] font-body text-sm tracking-[0.1px] text-grey-800',
    icon: null,
  },
  [InputStyle.TRANSPARENT_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-12 bg-transparent rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[20px]',
  },
  [InputStyle.TRANSPARENT_ICON_RIGHT_SMALL]: {
    container: 'h-[50px] flex items-center',
    label: 'hidden',
    input: 'w-full h-[50px] pl-7 dark:bg-grey-850 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute right-[18px]',
  },
  [InputStyle.WHITE_ICON_LEFT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-12 bg-grey-100 dark:bg-grey-850 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[20px]',
  },
  [InputStyle.WHITE_ICON_RIGHT_SMALL]: {
    container: 'h-[42px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-7 bg-grey-100 dark:bg-grey-850 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] right-[10px]',
  },
  [InputStyle.WHITE_ICON_LEFT]: {
    container: 'h-[50px]',
    label: 'hidden',
    input: 'w-full h-[39px] pl-8 bg-grey-100 dark:bg-grey-850 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute top-[10px] left-[px]',
  },
  [InputStyle.WHITE_ICON_RIGHT]: {
    container: 'h-[50px] flex items-center',
    label: 'hidden',
    input: 'w-full h-[50px] pl-7 bg-grey-100 dark:bg-grey-850 rounded-[10px] font-body text-sm tracking-[0.1px]',
    icon: 'absolute right-[18px]',
  },
}
