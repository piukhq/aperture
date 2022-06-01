import {RootState} from 'app/store'
import {fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import {getUseApiReflector} from 'features/apiReflectorSlice'
import {ApiReflectorUrl, Url, EnvironmentShortName} from './enums'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
} from 'utils/storage'

const rawBaseQuery = (baseUrl: string, token: string) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('authorization', token)
    headers.set('accept', 'application/json;v=1.3')
    return headers
  },
})

const getLoyaltySpecificValues = (env: string) => {
  switch (env) {
    case EnvironmentShortName.DEV:
      return [Url.DEV_BASE_URL, `Token ${getDevVerificationToken()}`]
    case EnvironmentShortName.STAGING:
      return [Url.STAGING_BASE_URL, `Token ${getStagingVerificationToken()}`]
    case EnvironmentShortName.PROD:
      return [Url.PROD_BASE_URL, `Token ${getProdVerificationToken()}`]
    default:
      return [Url.DEV_BASE_URL, `Token ${getDevVerificationToken()}`]
  }
}

export const getDynamicBaseQuery = (configOptions?: {isLoyaltyApi: boolean, env: string}): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => async (args, api, extraOptions) => {
  const {isLoyaltyApi = false, env = ''} = configOptions || {}

  const shouldUseApiReflector = getUseApiReflector(api.getState() as RootState)

  const [url, token] = isLoyaltyApi ? getLoyaltySpecificValues(env) : [
    process.env.NEXT_PUBLIC_PORTAL_API_URL,
    `token ${process.env.NEXT_PUBLIC_PORTAL_API_KEY}`,
  ]

  const dynamicUrl = shouldUseApiReflector ? ApiReflectorUrl.REFLECTOR_URL : url
  return rawBaseQuery(dynamicUrl, token)(args, api, extraOptions)
}
