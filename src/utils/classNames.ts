export function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(' ')
}

//usage example
// <button className={classNames('this is always applied', 
//         isTruthy && 'this only when the isTruthy is truthy',
//         active ? 'active classes' : 'inactive classes')}>
//  Text
// </button>
