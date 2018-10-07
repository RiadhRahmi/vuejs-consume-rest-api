import axios from 'axios';


const getClientAxios = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const options = {
    baseURL: 'http://dev.apilaravel.com/api/',
    headers: {
      Accept: 'application/json',
    }
  };

  if (currentUser) {
    options.headers.Authorization = 'Bearer ' + currentUser.token;
    options.headers.role = '' + currentUser.role === '0' ? 'admin' : 'editor';
  }

  const clientAxios = axios.create(options);
  return clientAxios;
};


export class ApiClient {

  constructor() {
    this.client = getClientAxios();
  }

  get(url) {
    return this.client.get(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }


}

