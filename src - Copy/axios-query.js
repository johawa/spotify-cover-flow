import axios from 'axios';


let accessToken = localStorage.getItem('TOKEN')

const instance = axios.create ({
    baseURL: 'https://api.spotify.com/v1/',
    headers: { 'Authorization': 'Bearer ' + accessToken },
});

export default instance;