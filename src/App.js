import React, { useState, useCallback } from 'react';
import OMDBSearch from './components/OMDBSearch'
const BASE_URL = `http://www.omdbapi.com/?`
const RESULTS_PER_PAGE = 10

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)


  const handleMovieFetchCallback = useCallback(handleMovieFetch, [page, searchTerm])

  React.useEffect(() => {
    if (searchTerm) {
      handleMovieFetchCallback(setResults)
    }
  }, [page, searchTerm, handleMovieFetchCallback])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }

  
  function handleMovieFetch(onFullfill, onError, options = {}){
    const data = {
      apiKey: process.env.REACT_APP_OMDB_KEY,
      s: searchTerm,
      type: 'movie',
      page,
    }

    const searchParams = new URLSearchParams(data).toString()
    return fetch(`${BASE_URL}${searchParams}`, {
      headers: {
      "Accept": "application/json",
    },
      ...options
    })
    .then(response => response.json())
    .then(onFullfill)
    .catch(onError)

  }

  function nextPage() {
    setPage(currentPage => Math.ceil(results.totalResults / RESULTS_PER_PAGE) === currentPage ? currentPage : currentPage + 1)
  }

  function prevPage(){
    setPage(currentPage => currentPage - 1 === 0 ? currentPage : currentPage - 1)
  }


  return (
    <div>
    <form>
      <OMDBSearch searchTerm={searchTerm} setSearchTerm={handleSearch} labelName={'omdb-search'} labelText={'Search'} />
      <pre>
        {JSON.stringify(results, undefined, 2)}
      </pre>
    </form>
    <button onClick={prevPage}>{'<-'}</button>
    <button onClick={nextPage}>{'->'}</button>
    </div>
  );
}

export default App;
