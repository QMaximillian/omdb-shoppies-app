import React from 'react'
import PropTypes from 'prop-types'

export default function OMDBCard({ alreadyNominated = false, nominate = false, title, releaseYear, posterUrl, handleAddNominate, ...props}) {

    return (
        <div style={{height: '100%', width: 'auto'}}>
            <img alt={`Poster for the movie: "${title}"`} src={posterUrl}></img>
            <div >
            <div style={{textTransform: 'capitalize'}}>{title}</div>
            <div>{releaseYear}</div>
            <button disabled={alreadyNominated} style={{color: alreadyNominated ? 'grey' : 'black'}} onClick={(event) => handleAddNominate(event, nominate, { title, releaseYear, posterUrl })}>{nominate ? 'Remove Nomination' : 'Nominate'}</button>
        </div>
    </div>)
}

OMDBCard.propTypes = {
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    handleAddNominate: PropTypes.func.isRequired

}


