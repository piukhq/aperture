// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.staging.gb.bink.com'}),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    postLogin: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: (credentials) => ({url: '/login', method: 'POST', body: credentials}),
    }),
  }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {usePostLoginQuery} = apiSlice


// DEV endpoint: https://api.dev.gb.bink.com/register
//email:    lk_test1@bink.com
//password: Portals1

// bundle ID:         com.bink.portal.internal
// Staging Client ID: joqEeXTSKaWTj9rdifFRtbIJD7vWN2YaueJ4zfOnEEO5dPoqcg
// Dev Client ID:     kudr77sTA0t5cvleNquOFUMHl68NMcqoCqRWrjlc3ZO60NFI3s
