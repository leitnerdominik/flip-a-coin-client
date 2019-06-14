import axios from 'axios';

require('dotenv').config();

const baseURL = process.env.SERVER_NAME;


const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
