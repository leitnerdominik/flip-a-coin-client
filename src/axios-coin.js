import axios from 'axios';

require('dotenv').config();

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : process.env.SERVER_NAME;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
