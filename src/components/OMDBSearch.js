import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/OMDBSearch.module.css'

export default function OMDBSearch({ searchTerm, setSearchTerm, labelName, labelText }){
    return (
        <div className={styles['omdb-search-container']}>
        <label htmlFor={labelName}>  
            {labelText} 
        </label>
        <input className={styles['omdb-search-bar']} placeholder={"Search..."} value={searchTerm} onChange={setSearchTerm} id={labelName}>
        </input>
        </div>
    )
}

OMDBSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    labelName: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired
}