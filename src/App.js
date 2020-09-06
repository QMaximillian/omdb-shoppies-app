import React, { useState } from 'react';
import OMDBSearch from './components/OMDBSearch'
const BASE_URL = `http://www.omdbapi.com/?`
function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  function handleMovieFetch(event, page = 1){
    event.preventDefault()
    const data = {
      apiKey: process.env.REACT_APP_OMDB_KEY,
      s: searchTerm,
      type: 'movie',
      page,
    }

    const searchParams = new URLSearchParams(data).toString()
    handleFetch(searchParams, setResults)

  }

  function handleFetch(searchParams, onFullfill, onError, url = BASE_URL, options = {}, ) {
    fetch(`${url}${searchParams}`, {
      headers: {
      "Accept": "application/json",
    },
      ...options
    })
    .then(response => response.json())
    .then(onFullfill)
    .catch(onError)
  }

  return (
    <form onSubmit={handleMovieFetch}>
      <OMDBSearch searchTerm={searchTerm} setSearchTerm={handleSearch} labelName={'omdb-search'} labelText={'Search'} />
      <pre>
        {JSON.stringify(results, undefined, 2)}
      </pre>
    </form>
  );
}

export default App;
