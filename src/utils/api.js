import axios from 'axios';
import apiKey from './apiKey.json';

export const fetchSingleMovie = (movie_id) => {
    //return console.log('The URI is : ', `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey['apiKey']}`);
    return axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey['apiKey']}`).then((response) => {
        console.dir(response.status);
        return response;
    });
};