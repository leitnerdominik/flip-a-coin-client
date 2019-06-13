import axios from 'axios';

require('dotenv').config();

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : process.env.SERVER_NAME;

console.log(process.env.NODE_ENV, baseURL);

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
