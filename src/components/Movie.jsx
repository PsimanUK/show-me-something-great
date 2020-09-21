import React, { useState, useEffect } from 'react';
import * as api from '../utils/api';

const Movie = () => {

    // declaring a state variable for the movie being displayed
    const [movie, setMovie] = useState(0);
    const [isGreatMovie, setIsGreatMovie] = useState(false);
    const [searchCount, setSearchCount] = useState(0);
    const [error, setError] = useState(0);
    const [fetchingData, setFetchingData] = useState(true);

    const randomiseNumber = () => {
        movieNumber = Math.floor(Math.random() * 999);
        return movieNumber;
    }

    let movieNumber;

    // useEffect is in place of componentDidMount
    useEffect(() => {
        if (isGreatMovie !== true) {
            console.log('Looking for a GREAT movie...');
            api.fetchSingleMovie(randomiseNumber()).then((response) => {
                if (response.status === 200 && response.data.vote_average > 7.7) {
                    console.log('The current number of the movie is: ' + movieNumber);
                    setMovie(response.data);
                    setIsGreatMovie(true);
                    setFetchingData(false);
                    setError(0);
                    setSearchCount(0);
                    console.log('We found a GREAT movie...');
                } else {
                    setSearchCount(searchCount + 1);
                    setIsGreatMovie(false);
                    setFetchingData(true);
                    console.log('Movie not good enough; searching for a GREAT movie...');
                }

            }).catch((err) => {
                console.dir('LOGGING ERROR: ' + err);
                setError(err.response.data.status_message);
                setSearchCount(searchCount + 1);
            });
        }
    }, [isGreatMovie, searchCount]);

    // resets movieNumber to a random number and movie back to zero
    // to reactivate useEffect to make another API call
    const searchAgain = (newMovieNumber) => {
        console.log('rolling again');
        movieNumber = newMovieNumber;
        console.log('Movie number is now: ' + movieNumber);
        setIsGreatMovie(false);
    }

    // conditional rendering to show when database is being searched and if there is an error
    if (fetchingData === false && error === 0) {
        console.log('rendering');
        return (
            <main>
                <section className="movieCard">
                    <section className="movieCardLeft">
                        <img className="moviePoster" src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie['poster_path']}`} alt="Placeholder" />
                    </section>
                    <section className="movieCardRight">
                        <h3>{movie['title']} ({movie['release_date'].slice(0, 4)})</h3>
                        <h4>{movie['vote_average']} / 10</h4>
                        <p class="overview" >{movie['overview']}</p>
                    </section>
                </section>
                <h3>Already seen it?</h3>
                <h4>Click the button to be served another great.</h4>
                <button onClick={() => searchAgain(randomiseNumber())} >Show Me Another</button>
            </main>
        );
    } else if (fetchingData === false && error !== 0) {
        console.log('displaying error message');
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => searchAgain(randomiseNumber())} >Let's Try Again</button>
            </div>
        );
    } else {
        console.log('displaying seaching database message');
        return (
            <div>
                <h4>Seaching our database...</h4>
            </div>
        );

    }

};

export default Movie;