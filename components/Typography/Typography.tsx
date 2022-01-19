// Idea to have a singular place to hold all Typography in a (currently) single file to balance repetition of code Vs. Over-engineering. 

const Heading0 = ({children}) => <h1 className={`text-5xl font-heading font-bold text-grey-800 dark:text-grey-100`}>{children}</h1>
const Heading1 = ({children}) => <h1 className={`text-4xl font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h1>
const Heading2 = ({children}) => <h2 className={`text-3xl font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h2>
const Heading3 = ({children}) => <h3 className={`text-2xl font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h3>
const Heading4 = ({children}) => <h4 className={`text-xl font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h4>
const Heading5 = ({children}) => <h5 className={`text-lg font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h5>
const Heading6Semibold = ({children}) => <h6 className={`text-base font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading6Title = ({children}) => <h6 className={`text-base font-heading font-semibold text-grey-600 dark:text-grey-600`}>{children}</h6>
const Heading6Medium = ({children}) => <h6 className={`text-base font-heading font-medium text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading7Semibold = ({children}) => <h6 className={`text-sm font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading7Medium = ({children}) => <h6 className={`text-sm font-heading font-medium text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading7Strikethrough = ({children}) => <h6 className={`text-sm font-heading font-semibold line-through text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading8 = ({children}) => <h6 className={`text-sm font-heading font-normal text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading9Semibold = ({children}) => <h6 className={`text-2xs font-heading font-semibold text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading9Medium = ({children}) => <h6 className={`text-2xs font-heading font-medium text-grey-900 dark:text-grey-100`}>{children}</h6>
const Heading10 = ({children}) => <h6 className={`text-3xs font-heading font-semibold text-grey-800 dark:text-grey-100`}>{children}</h6>

const Body1Regular = ({children}) => <p className={`text-lg font-body font-normal text-grey-800 dark:text-grey-100`}>{children}</p>
const Body1Grey = ({children}) => <p className={`text-lg font-body font-normal text-grey-500 dark:text-grey-500`}>{children}</p>
const Body1Medium = ({children}) => <p className={`text-lg font-body font-medium text-grey-800 dark:text-grey-100`}>{children}</p>
const Body2Regular = ({children}) => <p className={`text-base font-body font-normal text-grey-800 dark:text-grey-100`}>{children}</p>
const Body2Strikethrough = ({children}) => <p className={`text-base font-body font-regular line-through text-grey-800 dark:text-grey-100`}>{children}</p>
const Body2Medium = ({children}) => <p className={`text-base font-body font-medium text-grey-800 dark:text-grey-100`}>{children}</p>
const Body3Regular = ({children}) => <p className={`text-sm font-body font-normal text-grey-800 dark:text-grey-100`}>{children}</p>
const Body3Medium = ({children}) => <p className={`text-sm font-body font-medium text-grey-800 dark:text-grey-100`}>{children}</p>
const Body3Bold = ({children}) => <p className={`text-sm font-body font-bold text-grey-800 dark:text-grey-100`}>{children}</p>
const Body4Regular = ({children}) => <p className={`text-2xs font-body font-normal text-grey-800 dark:text-grey-100`}>{children}</p>
const Body4Medium = ({children}) => <p className={`text-2xs font-body font-medium text-grey-800 dark:text-grey-100`}>{children}</p>
const Body4Bold = ({children}) => <p className={`text-2xs font-body font-bold text-grey-800 dark:text-grey-100`}>{children}</p>

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
}
