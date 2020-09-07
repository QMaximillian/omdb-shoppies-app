import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/OMDBCard.module.css'

export default function OMDBCard({ alreadyNominated = false, nominate = false, title, releaseYear, posterUrl, handleAddNominate, ...props}) {

    return (
        <div className={styles['omdb-card-container']}>
            <img className={styles['img-classes']} alt={`Poster for the movie: "${title}"`} src={posterUrl}></img>
            <div className={styles['info-container']}>
                <div className={styles['info-text']} title={title}>{title}</div>
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


