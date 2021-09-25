import constant from './constant';
import constants from './../helper/constant';
import { checkApiStatus } from './error';
import AsyncStorage from '@react-native-async-storage/async-storage';
const productionURLToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY2NWE0YWVhY2I4NGNiYjI2ODJmOTQiLCJ1c2VybmFtZSI6ImtldGFudGVzdCIsImlhdCI6MTYyOTY5ODcxNSwiZXhwIjoxNjQ1MjUwNzE1fQ.go4Aect0lUCQZZkfBNeaYoaKpmLXyirUtPF2FDrTEsc';

const get = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call GET ====');
      console.log(baseURL);
      console.log('=== API Call ====');
    }

    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: undefined,
      },
    })
      .then(response => {
        console.log(response.headers.get('verified-mobile-token'));

        return Promise.all([response.status, response, response.headers || {}]);
      })
      .then(result => {
        console.log('=== API Response Success GET ===');
        console.log(result);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        console.log('=== API Response Fail GET ===');
        console.log(error.message);
        reject(error);
      });
  });
};

const getWithToken = (url = '', options = {}, test = false) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;
    if (test && constants.apiTesting) {
      baseURL = constant.baseUrlTest + url;
    }
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        header['user-access-token'] = userData.token;
        if (test && constants.apiTesting) {
          header['user-access-token'] = productionURLToken;
        }
      }

      if (constants.isShowAPI) {
        console.log('=== API Call GET ====');
        console.log(baseURL);
        console.log('Header');
        console.log(header);
      }

      fetch(baseURL, {
        ...options,
        method: 'GET',
        headers: header,
      })
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            reject(new Error(data.message));
          } else {
            if (constants.isLoadShow) {
              console.log('=== API Response Success GET ===');
              console.log(data);
            }
            resolve(data);
          }
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail GET ===');
            console.log(error.message);
          }
          reject(error);
        });
    });
  });
};

const getWithTokenDetail = (url = '', options = {}, test = false) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;
    if (test && constants.apiTesting) {
      baseURL = constant.baseUrlTest + url;
    }
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        header['user-access-token'] = userData.token;
        if (test && constants.apiTesting) {
          header['user-access-token'] = productionURLToken;
        }
      }

      if (constants.isShowAPI) {
        console.log('=== API Call GET ====');
        console.log(baseURL);
        console.log('Header');
        console.log(header);
      }

      fetch(baseURL, {
        ...options,
        method: 'GET',
        headers: header,
      })
        // .then(res => [res.json(), res.headers || {}])
        .then(res => {
          return Promise.all([res.json(), res.headers || {}]);
        })
        .then(data => {
          if (data[0].code) {
            reject(new Error(data[0].message));
          } else {
            if (constants.isLoadShow) {
              console.log('=== API Response Success GET ===');
              console.log(data[0]);
            }
            resolve({
              result: data[0],
              headers: data[1] || {},
            });
          }
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail GET ===');
            console.log(error.message);
          }
          reject(error);
        });
    });
  });
};

/**
 * Post method
 * @param url
 * @param data
 * @param header
 * @returns {Promise<R>}
 */
const post = (url, data, header = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call POST ====');
      console.log(baseURL);
      console.log('Body');
      console.log(data);
    }

    let reqHeader = Object.assign(header, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (constants.isLoadShow) {
      console.log('Header');
      console.log(reqHeader);
    }

    fetch(baseURL, {
      method: 'POST',
      headers: reqHeader,
      body: JSON.stringify(data),
    })
      .then(async response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return Promise.all([
            response.status,
            response.json(),
            response.headers,
          ]);
        } else {
          let responseText = await response.text();
          return Promise.all([
            response.status,
            responseText,
            response.headers || {},
          ]);
        }

        // if (response.status === 200) {
        //   const contentType = response.headers.get('content-type');
        //   if (contentType && contentType.indexOf('application/json') !== -1) {
        //     return Promise.all([
        //       response.status,
        //       response.json(),
        //       response.headers,
        //     ]);
        //   } else {
        //     return Promise.all([response.status, {}, response.headers]);
        //   }
        // } else {
        //   let responseText = await response.text();
        //   return Promise.all([
        //     response.status,
        //     responseText,
        //     response.headers || {},
        //   ]);
        // }
      })
      .then(result => {
        if (constants.isLoadShow) {
          console.log('=== API Response Success POST ===');
          console.log(result);
        }
        checkApiStatus(result[0]);
        resolve({
          code: result[0],
          result: result[1],
          headers: result[2],
        });
      })
      .catch(error => {
        if (constants.isLoadShow) {
          console.log('=== API Response Fail POST ===');
          console.log(error);
        }
        reject(error);
      });
  });
};

const postWithToken = (url, data, header = {}, test = false) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (test && constants.apiTesting) {
      baseURL = constant.baseUrlTest + url;
    }

    if (constants.isShowAPI) {
      console.log('=== API Call POST ====');
      console.log(baseURL);
      console.log('Body');
      console.log(data);
    }

    let reqHeader = Object.assign(header, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (constants.isShowAPI) {
      console.log('Header');
      console.log(reqHeader);
    }

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        reqHeader['user-access-token'] = userData.token;
      }
      if (test && constants.apiTesting) {
        header['user-access-token'] = productionURLToken;
      }
      fetch(baseURL, {
        method: 'POST',
        headers: reqHeader,
        body: JSON.stringify(data),
      })
        .then(async response => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return Promise.all([
              response.status,
              response.json(),
              response.headers,
            ]);
          } else {
            let responseText = await response.text();
            return Promise.all([
              response.status,
              responseText,
              response.headers || {},
            ]);
          }
        })
        .then(result => {
          if (constants.isLoadShow) {
            console.log('=== API Response Success POST ===');
            console.log(result);
          }
          checkApiStatus(result[0]);
          resolve({
            code: result[0],
            result: result[1],
            headers: result[2],
          });
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail POST ===');
            console.log(error);
          }
          reject(error);
        });
    });
  });
};

const putWithToken = (url, data, header = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call PUT ====');
      console.log(baseURL);
      console.log('Body');
      console.log(data);
    }

    let reqHeader = Object.assign(header, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (constants.isShowAPI) {
      console.log('Header');
      console.log(reqHeader);
    }

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        reqHeader['user-access-token'] = userData.token;
      }
      fetch(baseURL, {
        method: 'PUT',
        headers: reqHeader,
        body: JSON.stringify(data),
      })
        .then(async response => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return Promise.all([
              response.status,
              response.json(),
              response.headers,
            ]);
          } else {
            let responseText = await response.text();
            return Promise.all([
              response.status,
              responseText,
              response.headers || {},
            ]);
          }
        })
        .then(result => {
          if (constants.isLoadShow) {
            console.log('=== API Response Success POST ===');
            console.log(result);
          }
          checkApiStatus(result[0]);
          resolve({
            code: result[0],
            result: result[1],
            headers: result[2],
          });
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail POST ===');
            console.log(error);
          }
          reject(error);
        });
    });
  });
};

const deleteWithToken = (url, header = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = constant.baseUrl + url;

    if (constants.isShowAPI) {
      console.log('=== API Call POST ====');
      console.log(baseURL);
      console.log('Body');
    }

    let reqHeader = Object.assign(header, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    if (constants.isShowAPI) {
      console.log('Header');
      console.log(reqHeader);
    }

    return AsyncStorage.getItem('user').then(user => {
      if (user) {
        let userData = JSON.parse(user);
        reqHeader['user-access-token'] = userData.token;
      }
      fetch(baseURL, {
        method: 'DELETE',
        headers: reqHeader,
      })
        .then(async response => {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.indexOf('application/json') !== -1) {
            return Promise.all([
              response.status,
              response.json(),
              response.headers,
            ]);
          } else {
            let responseText = await response.text();
            return Promise.all([
              response.status,
              responseText,
              response.headers || {},
            ]);
          }
        })
        .then(result => {
          if (constants.isLoadShow) {
            console.log('=== API Response Success POST ===');
            console.log(result);
          }
          checkApiStatus(result[0]);
          resolve({
            code: result[0],
            result: result[1],
            headers: result[2],
          });
        })
        .catch(error => {
          if (constants.isLoadShow) {
            console.log('=== API Response Fail POST ===');
            console.log(error);
          }
          reject(error);
        });
    });
  });
};

export default {
  get,
  getWithToken,
  getWithTokenDetail,
  post,
  postWithToken,
  putWithToken,
  deleteWithToken,
};

/*
then(response => {
        return Promise.all([response.status, response.json()]);
      })
 */

/*
.then(response => {
        return Promise.all([response.status, response.json()]);
      })
      .then(result => {
        console.log('=== API Response Success ===');
        console.log(result);
        checkApiStatus(result[0]);
        resolve({
          code: result[0],
          result: result[1],
        });
      })
 */
