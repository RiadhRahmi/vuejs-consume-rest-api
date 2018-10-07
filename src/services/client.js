import Vue from "vue";
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.http.interceptors.push(function (request) {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const baseUrl = 'http://dev.apilaravel.com/api/';

  request.headers.set('Accept', 'application/json');
  request.url = baseUrl + request.url;
  if (currentUser) {
    request.headers.set('Authorization', 'Bearer ' + currentUser.token);
    request.headers.set('role', '' + currentUser.role === '0' ? 'admin' : 'editor');
  }

});


export class ApiClient {


  get(url) {
    return Vue.http.get(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }

  post(url, data) {
    return Vue.http.post(url, data)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }

  update(url, data) {
    return Vue.http.post(url, data)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }

  delete(url) {
    return Vue.http.delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error));
  }


}

