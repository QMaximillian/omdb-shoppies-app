import React from 'react'
import PropTypes from 'prop-types'

export default function OMDBSearch({ searchTerm, setSearchTerm, labelName, labelText }){
    return <>
        <label htmlFor={labelName}>  
            {labelText} 
        </label>
        <input value={searchTerm} onChange={setSearchTerm} id={labelName}>
        </input>
        <button type="submit">Search</button>
    </>
}

OMDBSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    labelName: PropTypes.string.isRequired,
    labelText: PropTypes.string.isRequired
}