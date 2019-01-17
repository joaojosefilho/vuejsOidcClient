/* eslint-disable */
import axios from 'axios'
import Mgr from './SecurityService'
import 'babel-polyfill';

const baseUrl = 'https://localhost:44390/api/';
var user = new Mgr()

export default class ApiService {

  async defineHeaderAxios () {
    await user.getAcessToken().then(
      acessToken => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + acessToken
      }, err => {
        console.log(err)
      })  
  }

  async getAll(api){
    await this.defineHeaderAxios() 
    return axios
      .get(baseUrl + api)
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      })
  }
}

