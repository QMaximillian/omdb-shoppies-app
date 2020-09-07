import React, { useState, useCallback, useEffect } from 'react';
import OMDBSearch from './components/OMDBSearch'
import OMDBCard from './components/OMDBCard';
const BASE_URL = `http://www.omdbapi.com/?`
const RESULTS_PER_PAGE = 10

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [nominated, setNominated] = useState([])


  const handleMovieFetchCallback = useCallback(handleMovieFetch, [page, searchTerm])

  useEffect(() => {
    if (searchTerm) {
      handleMovieFetchCallback(setResults)
    }
  }, [page, searchTerm, handleMovieFetchCallback])

  function handleAddNominate(event, nominate, props){
    event.preventDefault()
    if (nominate) {
      setNominated(currentNominated => currentNominated.filter(element => element.title !== props.title))
    } else {
      setNominated(currentNominated => [...currentNominated, props])
    }
  }

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
      {nominated.length === 5 ? <div>YOU HAVE 5 NOMINATIONS</div> : null}
    <form>
      <OMDBSearch searchTerm={searchTerm} setSearchTerm={handleSearch} labelName={'omdb-search'} labelText={'Search'} />
      <div style={{height: 'auto', width: 'auto'}}>
      {results?.Search?.map((result, i) => {
        const lowercasedResultTitle = result.Title.toLowerCase()
        if (nominated.some(nominatedElement => nominatedElement.title.toLowerCase() === lowercasedResultTitle) ||
            nominated.length === 5) {
          return <OMDBCard key={result.Poster + i} title={lowercasedResultTitle} releaseYear={result.Year} posterUrl={result.Poster} handleAddNominate={handleAddNominate} alreadyNominated={true}/>
        } else {
          return <OMDBCard key={result.Poster + i} title={lowercasedResultTitle} releaseYear={result.Year} posterUrl={result.Poster} handleAddNominate={handleAddNominate} />
        }
      })}
        </div>
    </form>
    <button onClick={prevPage}>{'<-'}</button>
    <button onClick={nextPage}>{'->'}</button>
    <div>
      {nominated.map((result, i) => <OMDBCard nominate key={result.title + i} title={result.title} releaseYear={result.releaseYear} posterUrl={result.posterUrl} handleAddNominate={handleAddNominate}  {...result}/>)}
    </div>
    </div>
  );
}

export default App;
