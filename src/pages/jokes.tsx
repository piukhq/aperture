import React, {useState} from 'react'
import {useGetRandomJokeQuery} from '../services/jokes'


const Jokes = () => {
  const [skip, setSkip] = useState(true)
  const {data, error, isLoading} = useGetRandomJokeQuery(null, {
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
