import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Shoppies404 from './Shoppies404';
import styles from '../styles/OMDBCard.module.css'

export default function OMDBCard({ alreadyNominated = false, nominate = false, title, releaseYear, posterUrl, handleAddNominate, ...props}) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className={styles['omdb-card-container']} 
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        >
           {posterUrl ? <img alt={`Poster for the movie: "${title}"`} src={posterUrl}></img> : <Shoppies404/>}
            {isHovered ? <div className={styles['info-container']}>
                <div className={styles['info-text']} title={title}>{title}</div>
                <div>{releaseYear}</div>
                <button className={styles['nominate-button']} disabled={alreadyNominated} style={{color: alreadyNominated ? 'grey' : 'black'}} onClick={(event) => handleAddNominate(event, nominate, { title, releaseYear, posterUrl })}>{nominate ? 'Remove' : 'Nominate'}</button>
            </div> : null}
        </div>)
}

OMDBCard.propTypes = {
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
    handleAddNominate: PropTypes.func.isRequired
}


