import React from 'react'
import Loading from '../components/Loading'
import {useParams, Link} from 'react-router-dom'
import DefaultImage from '../default_film_logo_white.jpg'

const url_movie = 'https://api.themoviedb.org/3/movie/'
const url_tv = 'https://api.themoviedb.org/3/tv/'
const api_key = `?api_key=${process.env.REACT_APP_API_KEY}`

const SingleMovie = () => {
    const {media,id} = useParams();
    const [loading,
        setLoading] = React.useState(false);
    const [movie,
        setMovie] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);
        async function getMovie() {
            try {
                let response;
                if(media==="tv"){
                    response = await fetch(`${url_tv}${id}${api_key}`);
                } else if (media==="movie"){
                    response = await fetch(`${url_movie}${id}${api_key}`);
                }

                const data = await response.json();
                console.log(data);
                if (data.status_code !== 34) {
                    if(media==="tv"){
                        const {
                            backdrop_path,
                            id,
                            name,
                            overview,
                            poster_path,
                            first_air_date,
                            vote_average,
                            vote_count,
                            genres
                        } = data;
                        const newMovie = {
                            backdrop: backdrop_path,
                            id: id,
                            title: name,
                            overview: overview,
                            poster: poster_path,
                            date: first_air_date,
                            average: vote_average,
                            count: vote_count,
                            genres: genres
                        }
                        setMovie(newMovie);
                    } else if (media==="movie"){
                        const {
                            backdrop_path,
                            id,
                            title,
                            overview,
                            poster_path,
                            release_date,
                            vote_average,
                            vote_count,
                            runtime,
                            genres,
                            budget
                        } = data;
                        const newMovie = {
                            backdrop: backdrop_path,
                            id: id,
                            title: title,
                            overview: overview,
                            poster: poster_path,
                            date: release_date,
                            average: vote_average,
                            count: vote_count,
                            runtime: runtime,
                            genres: genres,
                            budget: budget
                        }
                        setMovie(newMovie);
                    }
                } else {
                    setMovie(null)
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getMovie();
    }, [media,id])

    const currencyFormat = (num) => {
        return '$' + num
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    if (loading) {
        return <Loading/>
    }

    if (!movie) {
        return <h2 className="section-title">No Movie To Display</h2>
    }

    const {
        average,
        backdrop,
        budget,
        count,
        date,
        genres,
        overview,
        poster,
        runtime,
        title
    } = movie;

    return (
        <section className="section movie-section">
            <h2 className="section-title">
                {movie.title}
            </h2>
            <div className="film">
                <img
                    src={(()=>{
                        if(poster){
                            return `https://image.tmdb.org/t/p/original${poster}`
                        } else if (backdrop) {
                            return `https://image.tmdb.org/t/p/original${backdrop}`
                        } else {
                            return DefaultImage
                        }
                    })()}
                    onError={((e) => {
                        e.target.onerror=null;
                        e.target.src=DefaultImage;
                    })}
                    alt={title}/>
                <div className="film-info">

                    {(() => {
                        if(!average) return; 
                        if (average >= 7) {
                            return <p>
                                <span className="film-data">Reviews:</span>
                                <span className="good">{average}</span>/ 10 with {count} reviews</p>
                        } else if (average >= 5) {
                            return <p>
                                <span className="film-data">Reviews:</span>
                                <span className="ok">{average}</span>/ 10 with {count} reviews</p>
                        } else {
                            return <p>
                                <span className="film-data">Reviews:</span>
                                <span className="bad">{average}</span>/ 10 with {count} reviews</p>
                        }
                    })()}

                    {(()=>{
                        let startDate = new Date(date);
                        if(date){
                            return <p><span className="film-data">Release date:</span>{new Date(startDate.getTime()+Math.abs(startDate.getTimezoneOffset()*60000)).toLocaleDateString([], {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        } else {
                            return <p>Release date: Unknown</p>
                        }
                    })()}

                    {(()=>{
                        if(overview){
                            return <p><span className="film-data">Description:</span>{overview}</p>
                        }
                    })()}

                    {(()=>{
                        if(genres.length>0){
                            return <p><span className="film-data">Genres:</span>{genres.map((item, i) => {
                                if (genres.length === i + 1) {
                                    return item.name;
                                } else {
                                    return item.name + ", ";

                                }
                            })}</p>
                        }
                    })()}

                    {(()=>{
                        if(runtime){
                            return <p><span className="film-data">Runtime:</span>{runtime} minutes</p>
                        }
                    })()}

                    {(()=>{
                      if(budget>0){
                        return <p><span className="film-data">Budget:</span>{currencyFormat(budget)}</p>
                      }
                    })()}

                </div>
            </div>

            <Link to="/" className="btn btn-primary">Home</Link>

        </section>
    )
}

export default SingleMovie