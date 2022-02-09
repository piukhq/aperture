import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Url, ClientID, BundleID} from 'utils/enums'

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
  baseQuery: fetchBaseQuery({baseUrl: Url.DEV_BASE_URL}),
  endpoints: builder => ({
    verifyDevCredentials: builder.mutation<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: `${endpointPrefix}/login`,
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.DEV_CLIENT_ID,
          bundle_id: BundleID.DEV_BUNDLE_ID,
        },
      }),
    }),
  }),
})

export const stagingVerifyApi = createApi({
  reducerPath: 'stagingVerifyApi',
  baseQuery: fetchBaseQuery({baseUrl: Url.STAGING_BASE_URL}),
  endpoints: builder => ({
    verifyStagingCredentials: builder.mutation<VerificationResponse, VerificationBody>({
      query: ({email, password}) => ({
        url: `${endpointPrefix}/login`,
        method: 'POST',
        body: {
          email,
          password,
          client_id: ClientID.STAGING_CLIENT_ID,
          bundle_id: BundleID.STAGING_BUNDLE_ID,
        },
      }),
    }),
  }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useVerifyDevCredentialsMutation} = devVerifyApi
export const {useVerifyStagingCredentialsMutation} = stagingVerifyApi
