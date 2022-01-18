// Idea to have a singular place to hold all Typography in a (currently) single file to balance repetition of code Vs. Over-engineering. 

const Heading0 = ({styles = null, children}) => <h1 className={`text-5xl font-primary font-bold text-grey-800 dark:text-grey-100 ${styles}`}>{children}</h1>
const Heading1 = ({styles = null, children}) => <h1 className={`text-4xl font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h1>
const Heading2 = ({styles = null, children}) => <h2 className={`text-3xl font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h2>
const Heading3 = ({styles = null, children}) => <h3 className={`text-2xl font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h3>
const Heading4 = ({styles = null, children}) => <h4 className={`text-xl font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h4>
const Heading5 = ({styles = null, children}) => <h5 className={`text-lg font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h5>
const Heading6Semibold = ({styles = null, children}) => <h6 className={`text-base font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading6Title = ({styles = null, children}) => <h6 className={`text-base font-primary font-semibold text-grey-600 dark:text-grey-600 ${styles}`}>{children}</h6>
const Heading6Medium = ({styles = null, children}) => <h6 className={`text-base font-primary font-medium text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading7Semibold = ({styles = null, children}) => <h6 className={`text-sm font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading7Medium = ({styles = null, children}) => <h6 className={`text-sm font-primary font-medium text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading7Strikethrough = ({styles = null, children}) => <h6 className={`text-sm font-primary font-semibold line-through text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading8 = ({styles = null, children}) => <h6 className={`text-sm font-primary font-normal text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading9Semibold = ({styles = null, children}) => <h6 className={`text-2xs font-primary font-semibold text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading9Medium = ({styles = null, children}) => <h6 className={`text-2xs font-primary font-medium text-grey-900 dark:text-grey-100 ${styles}`}>{children}</h6>
const Heading10 = ({styles = null, children}) => <h6 className={`text-3xs font-primary font-semibold text-grey-800 dark:text-grey-100 ${styles}`}>{children}</h6>

const Body1Regular = ({styles = null, children}) => <p className={`text-lg font-body font-normal text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body1Grey = ({styles = null, children}) => <p className={`text-lg font-body font-normal text-grey-500 dark:text-grey-500 ${styles}`}>{children}</p>
const Body1Medium = ({styles = null, children}) => <p className={`text-lg font-body font-medium text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body2Regular = ({styles = null, children}) => <p className={`text-base font-body font-normal text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body2Strikethrough = ({styles = null, children}) => <p className={`text-base font-body font-regular line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body2Medium = ({styles = null, children}) => <p className={`text-base font-body font-medium line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body3Regular = ({styles = null, children}) => <p className={`text-sm font-body font-normal line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body3Medium = ({styles = null, children}) => <p className={`text-sm font-body font-medium line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body3Bold = ({styles = null, children}) => <p className={`text-sm font-body font-bold line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body4Regular = ({styles = null, children}) => <p className={`text-2xs font-body font-normal line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body4Medium = ({styles = null, children}) => <p className={`text-2xs font-body font-medium line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>
const Body4Bold = ({styles = null, children}) => <p className={`text-2xs font-body font-bold line-through text-grey-800 dark:text-grey-100 ${styles}`}>{children}</p>

export {
  Heading0,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6Semibold,
  Heading6Title,
  Heading6Medium,
  Heading7Semibold,
  Heading7Medium,
  Heading7Strikethrough,
  Heading8,
  Heading9Semibold,
  Heading9Medium,
  Heading10,
  Body1Regular,
  Body1Grey,
  Body1Medium,
  Body2Regular,
  Body2Strikethrough,
  Body2Medium,
  Body3Regular,
  Body3Medium,
  Body3Bold,
  Body4Regular,
  Body4Medium,
  Body4Bold,
} // Update index.ts too
