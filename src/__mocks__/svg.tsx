// Fake svg file for jest, fixes issue with React 18. See https://stackoverflow.com/questions/75966690/nextjs-jest-element-type-is-invalid-expected-a-string-for-built-in-component

import React, {SVGProps} from 'react'

const SvgrMock = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => <svg ref={ref} {...props} />
)

export const ReactComponent = SvgrMock
export default SvgrMock
