import React, { useState, useCallback, useEffect } from 'react';
import OMDBSearch from './components/OMDBSearch'
import OMDBCard from './components/OMDBCard';
import NominationDrawer from './components/NominationDrawer';
import styles from './App.module.css'

const BASE_URL = `http://www.omdbapi.com/?`
const RESULTS_PER_PAGE = 10

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [nominated, setNominated] = useState([])
  const [showNominations, setShowNominations] = useState(false)


  const handleMovieFetchCallback = useCallback(handleMovieFetch, [page, searchTerm])

  useEffect(() => {
    if (localStorage.getItem('nominations')) {
      setNominated(JSON.parse(localStorage.getItem('nominations')))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominated))
  }, [nominated])

  useEffect(() => {
    if (searchTerm) {
      handleMovieFetchCallback(setResults)
    } else {
      setResults([])
    }
  }, [page, searchTerm, handleMovieFetchCallback])

  function handleAddNominate(event, nominate, props){
    event.preventDefault()
    event.stopPropagation()

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
    <>
      {nominated.length === 5 ?
        <div className={styles['full-nominations-banner']}>YOU HAVE 5 NOMINATIONS</div> 
       : 
      null
      }
      <div className={styles['shoppies-banner']}>THE SHOPPIES</div>
      <div className={`${styles['search-container']}`}>
      <OMDBSearch searchTerm={searchTerm} setSearchTerm={handleSearch} labelName={'omdb-search'} labelText={'Movie Search'} />
      </div>
      <div className={`${styles['results-container']}`}>
      {results?.Search?.map((result, i) => {
        const lowercasedResultTitle = result.Title.toLowerCase()
        if (nominated.some(nominatedElement => nominatedElement.title.toLowerCase() === lowercasedResultTitle) ||
            nominated.length === 5) {
          return <OMDBCard key={result.Poster + i} title={lowercasedResultTitle} releaseYear={result.Year} posterUrl={result.Poster === "N/A" ? '' : result.Poster} handleAddNominate={handleAddNominate} alreadyNominated={true}/>
        } else {
          return <OMDBCard key={result.Poster + i} title={lowercasedResultTitle} releaseYear={result.Year} posterUrl={result.Poster === "N/A" ? '' : result.Poster} handleAddNominate={handleAddNominate} />
        }
      })}
        </div>
    <div className={`${styles['pagination-container']}`}>
    <button onClick={prevPage}>{'<-'}</button>
    <button onClick={nextPage}>{'->'}</button>
    </div>
    {results.Search?.length ? <p className={styles['page-fraction']}>{`${page} / ${Math.ceil(results.totalResults / RESULTS_PER_PAGE)}`}</p> : null}
    <NominationDrawer setShowNominations={setShowNominations} showNominations={showNominations}>
      <div className={`${styles['nominated-container']}`}>
        {nominated.length 
          ? 
            nominated.map((result, i) => <OMDBCard nominate key={result.title + i} title={result.title} releaseYear={result.releaseYear} posterUrl={result.Poster === "N/A" ? '' : result.Poster} handleAddNominate={handleAddNominate}  {...result}/>)
          : 
            <div>NO NOMINATIONS YET</div>
        }
      </div>
    </NominationDrawer>
    </>
  );
}

export default App;
