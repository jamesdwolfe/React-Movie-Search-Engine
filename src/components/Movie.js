import React from 'react'
import {Link} from 'react-router-dom'
import DefaultImage from '../default_film_logo.jpg'

const Movie = ({
    media,
    average,
    backdrop,
    count,
    date,
    id,
    poster,
    title
}) => {
    return (
        <article className="movie">
            <div className="img-container">
                <img
                    src={(()=>{
                        if(backdrop){
                            return `https://image.tmdb.org/t/p/original${backdrop}`
                        } else if (poster) {
                            return `https://image.tmdb.org/t/p/original${poster}`
                        } else {
                            return DefaultImage
                        }
                    })()}
                    onError={((e) => {
                        e.target.onerror=null;
                        e.target.src=DefaultImage;
                    })}
                    alt={title}/>
                <div className="movie-footer">
                    <h4>{title} {media==="tv" ? "(TV)" : "(Movie)"}</h4>
                    {(() => {
                        if(!count || !average){
                            return <span className="bad">No reviews</span>
                        }

                        if (average >= 7) {
                            return <h4>
                                <span className="good">{average}</span>/10 with {count} reviews</h4>
                        } else if (average >= 5) {
                            return <h4>
                                <span className="ok">{average}</span>/10 with {count} reviews</h4>
                        } else {
                            return <h4>
                                <span className="bad">{average}</span>/10 with {count} reviews</h4>
                        }
                    })()}

                    {(()=>{
                        let startDate = new Date(date);
                        if(date){
                            return <p>Release date: {new Date(startDate.getTime()+Math.abs(startDate.getTimezoneOffset()*60000)).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        } else {
                            return <p>Release date: Unknown</p>
                        }
                    })()}
                    
                    <Link to={`/show/${media}/${id}`} className="btn btn-primary">More Info</Link>
                </div>
            </div>
        </article>
    )
}

export default Movie