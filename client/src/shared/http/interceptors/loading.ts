import axios from 'axios';
import store from '../../../store';
import {DECREMENT_LOADING_STATE, INCREMENT_LOADING_STATE} from '../../../store/modules/loading/mutation-types';

axios.interceptors.request.use(config => {
  store.commit(INCREMENT_LOADING_STATE, Date.now());
  return config;
}, error => Promise.reject(error));

axios.interceptors.response.use(response => {
  store.commit(DECREMENT_LOADING_STATE);
  return response;
}, error => {
  store.commit(DECREMENT_LOADING_STATE);
  return Promise.reject(error);
});
