/* eslint-disable */
import axios from 'axios'
import Mgr from './SecurityService'
import 'babel-polyfill';

const baseUrl = 'https://localhost:44390/api/';

var user = new Mgr()

user.getUser().then(
  sucess => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + sucess.access_token 
  }, err => {
    console.log(err)
})

export default class ApiService {

  async getAll(api){
    return axios
      .get(baseUrl + api)
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      })
  }
}

