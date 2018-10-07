import { ApiClient } from '../axios/client';

let apiClient = new ApiClient();

export default {

  all() {
    return apiClient.get('users');
  }



}
