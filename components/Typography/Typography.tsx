// Idea to have a singular place to hold all Typography in a (currently) single file to balance repetition of code Vs. Over-engineering. 

const Paragraph = ({extraClasses = null, children}) => <p className={`font-light ${extraClasses && extraClasses}`}>{children}</p>

const LabelText = ({extraClasses = null, children}) => <p className={`${extraClasses && extraClasses}`}>{children}</p>

const Error = ({extraClasses = null, children}) => <p className={`text-sm text-invalidRed ${extraClasses && extraClasses}`}>{children}</p>

const Headline = ({extraClasses = null, children}) => <h1 className={`text-4xl font-bold ${extraClasses && extraClasses}`}>{children}</h1>

const Subtitle = ({extraClasses = null, children}) => <h2 className={`font-semibold text-binkGreen ${extraClasses && extraClasses}`}>{children}</h2> // This could be changed to specify heading level for semantics if needed.

const Hyperlink = ({href, extraClasses = null, children}) => <a className={`text-binkGreen ${extraClasses && extraClasses}`} href={href}>{children}</a> // External Hyperlink, Internal Routing should use Link tag

const Sidebar = ({extraClasses = null, children}) => <h2 className={`font-semibold text-binkGreen ${extraClasses && extraClasses}`}>{children}</h2> // Apparently the same as Subtitle?

export {
  Headline,
  Subtitle,
  Sidebar,
  Paragraph,
  Hyperlink, 
  LabelText, 
  Error
} // Update index.ts too
