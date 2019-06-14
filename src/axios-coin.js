import axios from 'axios';

require('dotenv').config();

const baseURL = process.env.API_ENDPOINT;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
