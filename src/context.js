import React, {useState, useContext, useEffect} from 'react'
import {useCallback} from 'react'

const url = 'https://api.themoviedb.org/3/search/multi?query='
const pop_url = 'https://api.themoviedb.org/3/trending/all/day'
const api_key_1 = `&api_key=${process.env.REACT_APP_API_KEY}`
const api_key_2 = `?api_key=${process.env.REACT_APP_API_KEY}`
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
            let endpoint;
            if (searchTerm !== '') {
                endpoint = `${url}${searchTerm}${api_key_1}`
            } else {
                endpoint = `${pop_url}${api_key_2}`;
            }

            const response = await fetch(endpoint);
            const data = await response.json();

            if (data.results.length > 0) {
                const newMovies = data.results.filter(function(item) {
                        if(item.media_type==="person"){
                            return false;
                        } 
                        return true;
                    })
                    .map((item) => {
                        if(item.media_type==="tv") {
                            const {
                                media_type,
                                backdrop_path,
                                id,
                                name,
                                poster_path,
                                first_air_date,
                                vote_average,
                                vote_count
                            } = item;
                            return {
                                media:media_type,
                                backdrop: backdrop_path,
                                id: id,
                                title: name,
                                poster: poster_path,
                                date: first_air_date,
                                average: vote_average,
                                count: vote_count
                            }
                        } else if(item.media_type==="movie"){
                            const {
                                media_type,
                                backdrop_path,
                                id,
                                title,
                                poster_path,
                                release_date,
                                vote_average,
                                vote_count
                            } = item;
                            return {
                                media:media_type,
                                backdrop: backdrop_path,
                                id: id,
                                title: title,
                                poster: poster_path,
                                date: release_date,
                                average: vote_average,
                                count: vote_count
                            }
                        } else {
                            return null;
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