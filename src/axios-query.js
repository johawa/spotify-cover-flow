import axios from 'axios';
import queryString from 'query-string';

const parsed = queryString.parse(window.location.search); 
const accessToken = parsed.access_token;

const instance = axios.create ({
    baseURL: 'https://api.spotify.com/v1/',
    headers: { 'Authorization': 'Bearer ' + accessToken },
});

export default instance;