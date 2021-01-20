import React, {useState, useContext, useEffect} from 'react'
import {useCallback} from 'react'

const url = 'https://api.themoviedb.org/3/search/movie?query='
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const api_key = `&api_key=${process.env.REACT_APP_API_KEY}`
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [loading,
        setLoading] = useState(true);
    const [searchTerm,
        setSearchTerm] = useState('');
    const [movies,
        setMovies] = useState([]);

    const fetchMovies = useCallback(async() => {
        setLoading(true);
        try {
            let endpoint = `${pop_url}${api_key}`;
            if (searchTerm !== '') {
                endpoint = `${url}${searchTerm}${api_key}`
            }

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.results.length > 0) {
                const newMovies = data
                    .results
                    .map((item) => {
                        const {
                            backdrop_path,
                            id,
                            title,
                            poster_path,
                            release_date,
                            vote_average,
                            vote_count
                        } = item;
                        return {
                            backdrop: backdrop_path,
                            id: id,
                            title: title,
                            poster: poster_path,
                            date: release_date,
                            average: vote_average,
                            count: vote_count
                        }
                    })
                setMovies(newMovies);
            } else {
                setMovies([]);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm])

    useEffect(() => {
        fetchMovies();
    }, [searchTerm, fetchMovies])

    return (
        <AppContext.Provider
            value={{
            loading,
            movies,
            setSearchTerm
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}