import React from 'react'
import Movie from './Movie'
import Loading from './Loading'
import {useGlobalContext} from '../context'

const MovieList = () => {
    const {movies, loading} = useGlobalContext();

    if (loading) {
        return <Loading/>
    }

    if (movies.length < 1) {
        return (
            <h2 className="section-title">No Movies Matched Your Search</h2>
        )
    }

    return (
        <section className="section">

            <div className="movies-center">
                {movies.map((item) => {
                    if(item){
                        return <Movie key={item.id} {...item}/>
                    } else {
                        return ''
                    }
                })}
            </div>
        </section>
    )

}

export default MovieList