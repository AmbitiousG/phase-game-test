import Vue from 'vue'
import {setIdToken} from '../utils/auth'

export default {
  login: (userInfo, cb, errorCb) => {
    Vue.http.post('/login/login', userInfo).then(response => {
      let res = response.body;
      if(!res.error){
        setIdToken(res.token);
        Vue.http.headers.common['Authorization'] = 'Bearer ' + res.token;
      }
      cb(res);
    }, response => {
      errorCb();
    })
  },
  register: (userInfo, cb, errorCb) => {
    Vue.http.post('/login/register', userInfo).then(response => {
      let res = response.body;
      cb(res);
    }, response => {
      errorCb();
    })
  }
}
