import axios from 'axios';

export const baseUrl = 'http://18.237.111.97:9000/api/';
export const imageUrl = 'http://18.237.111.97:9000/';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
});

axios.defaults.headers.common['Accept'] = 'application/json';

AxiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('Token');
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error?.response?.status == 502) {
    } else if (
      error?.response?.status == 401 &&
      error?.response?.data?.code == 'user_not_found'
    ) {

      return Promise.reject('refresh_not_valid'); 
    } else if (error?.response?.status == 403) {
      return Promise.reject('refresh_not_valid'); 
    } else {
      return Promise.reject(error);
    }
  },
);

export {AxiosInstance};
