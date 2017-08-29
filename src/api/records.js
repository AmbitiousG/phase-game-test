import Vue from 'vue'

export default {
  getCategories: (cb, errorCb) => {
    Vue.http.post('api/getCategories').then(response => {
      let res = response.body;
      if (!res.errorCode) {
        if (res.Categories && res.Categories.length > 0) {
          cb(_.map(res.Categories, c => {
            return {
              name: c.CategoryName,
              value: c.CategoryID.toString()
            }
          }));
        } else {
          errorCb && errorCb();
        }
      }
      else{
        cb && cb(res);
      }
    }, response => {
      errorCb && errorCb();
    })
  },
  getRecords: (data, cb, errorCb) => {
    Vue.http.post('/api/getList').then(response => {
      let res = response.body;
      if (!res.errorCode) {
        cb(res.Records);
      }
      else{
        cb && cb(res);
      }
    }, response => {
      errorCb();
    })
  },
  saveRecord: (data, cb, errorCb) => {
    Vue.http.post('/api/save', data).then(response => {
      let res = response.body;
      cb && cb(res);
    }, response => {
      errorCb && errorCb();
    })
  },
  deleteRecord: (data, cb, errorCb) => {
    Vue.http.post('/api/deleteRecord', data).then(response => {
      let res = response.body;
      // if (!res.errorCode) {
        cb && cb(res);
      // }
      // else{
      //   cb && cb(res);
      // }
    }, response => {
      errorCb && errorCb();
    })
  }
}
