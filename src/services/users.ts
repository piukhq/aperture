import {createApi} from '@reduxjs/toolkit/query/react'
import {EnvironmentShortName, ClientID, BundleID} from 'utils/enums'
import {getDynamicBaseQuery} from 'utils/configureApiUrl'

const endpointPrefix = '/users'

type VerificationBody = {
  email: string,
  password: string,
}

type VerificationResponse = {
  email: string,
  api_key: string,
  uid: string,
}

export const devVerifyApi = createApi({
  reducerPath: 'devVerifyApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.DEV}),
  endpoints: builder => ({
    verifyDevCredentials: builder.mutation<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: `${endpointPrefix}/login`,
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.DEV_CLIENT_ID,
          bundle_id: BundleID.BUNDLE_ID,
        },
      }),
    }),
  }),
})

export const stagingVerifyApi = createApi({
  reducerPath: 'stagingVerifyApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.STAGING}),
  endpoints: builder => ({
    verifyStagingCredentials: builder.mutation<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: `${endpointPrefix}/login`,
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.STAGING_CLIENT_ID,
          bundle_id: BundleID.BUNDLE_ID,
        },
      }),
    }),
  }),
})

export const prodVerifyApi = createApi({
  reducerPath: 'prodVerifyApi',
  baseQuery: getDynamicBaseQuery({isLoyaltyApi: true, env: EnvironmentShortName.PROD}),
  endpoints: builder => ({
    verifyProdCredentials: builder.mutation<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: `${endpointPrefix}/login`,
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.PROD_CLIENT_ID,
          bundle_id: BundleID.BUNDLE_ID,
        },
      }),
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useVerifyDevCredentialsMutation} = devVerifyApi
export const {useVerifyStagingCredentialsMutation} = stagingVerifyApi
export const {useVerifyProdCredentialsMutation} = prodVerifyApi
