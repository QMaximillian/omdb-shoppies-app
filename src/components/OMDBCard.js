import React from 'react'
import PropTypes from 'prop-types'

export default function OMDBCard({ title, releaseYear, posterUrl, ...props}) {
    console.log(props)
    return (
        <div style={{position: 'relative', height: '50%', width: '50%'}}>
            <img style={{width: '100%'}}alt={`Poster for the movie: "${title}"`} src={posterUrl}></img>
            <div style={{position: 'absolute', bottom: '3rem', right: 0, height: '5rem', width: "40%"}}>
            <div>{title}</div>
            <div>{releaseYear}</div>
        
        </div>
    </div>)
}

OMDBCard.propTypes = {
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,

}


