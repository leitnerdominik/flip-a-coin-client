import axios from 'axios';

const baseURL = 'https://flip-a-coin-server.herokuapp.com/';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
