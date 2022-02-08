import React, {useState} from 'react'
import {
  useVerifyDevCredentialsQuery,
  // useVerifyStagingCredentialsQuery
} from 'services/verification'

const Jokes = () => {
  const requestBody = {
    email: 'stevenson5@typicalfer.com',
    password: 'Password1',
  }

  const [skip, setSkip] = useState(true)
  const {data, error, isLoading} = useVerifyDevCredentialsQuery(requestBody, {
    skip, // Used to conditionally call fetch api
  })

  return (
    <div>
      <h2>Generate random joke</h2>
      {isLoading && <p>Loading...</p>}
      {data && <p>{JSON.stringify(data)}</p>}
      {error && <p>Oops, something went wrong</p>}
      <button onClick={() => setSkip(prev => !prev)}>
        Generate joke
      </button>
    </div>
  )
}

export default Jokes
