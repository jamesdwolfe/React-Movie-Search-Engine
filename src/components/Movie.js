import React from 'react'
import {Link} from 'react-router-dom'
import DefaultImage from '../default_film_logo.jpg'

const Movie = ({
    average,
    backdrop,
    count,
    date,
    id,
    overview,
    poster,
    title
}) => {
    return (
        <article className="movie">
            <div className="img-container">
                <img
                    src={`https://image.tmdb.org/t/p/original/${backdrop}`}
                    onError={((e) => {
                        e.target.onerror=null;
                        if(poster===null){
                            e.target.src=DefaultImage;
                        } else {
                            e.target.src=`https://image.tmdb.org/t/p/original/${poster}`;
                        }
                    })}
                    alt={title}/>
                <div className="movie-footer">
                    <h4>{title}</h4>
                    {(() => {
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

                    <p>Release date: {new Date(date).toLocaleDateString([], {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</p>
                    <Link to={`/movie/${id}`} className="btn btn-primary">More Info</Link>
                </div>
            </div>
        </article>
    )
}

export default Movie