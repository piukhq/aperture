import {useRouter} from 'next/router'

type DirectoryQueries = {
  planId?: string
  merchantId?: string
  tab?: string
  ref?: string
  sub_location_ref?: string
}

const useGetRouterQueryString = () => { // This converts the router query values to strings to be strictly typed and avoid TS errors
  const router = useRouter()
  const routerQuery:DirectoryQueries = router.query
  const convertQueryToStrings = (routerQuery: Record<string, string | string[]>): DirectoryQueries => {
    const convertedQuery = Object.keys(routerQuery).reduce((acc, key) => {
      const value = routerQuery[key]
      if (Array.isArray(value)) {
        acc[key] = value[0] || ''
      } else {
        acc[key] = value || ''
      }
      return acc || ''
    }, {} as Record<string, string>)
    return convertedQuery
  }
  return convertQueryToStrings(routerQuery)
}

export default useGetRouterQueryString
