import 'whatwg-fetch';

function serialize(obj) {
  const result = [];

  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      const value = obj[i];

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.keys(item).forEach(key => {
            result.push(i + '[' + index + ']' + '[' + key + ']' + '=' + item[key]);
          });
        });
      } else {
        result.push(i + '=' + value);
      }
    }
  }

  return result.join('&');
}

function callApi(api, method = 'GET', params) {
  let apiUrl = api;
  const apiData = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  if (params) {
    if (method === 'POST') {
      apiUrl += '?token=' + sessionStorage.__token;
      apiData.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      apiData.body = serialize(params);
    } else if (method === 'GET') {
      params.token = sessionStorage.__token;
      apiUrl += '?' + serialize(params);
    }
  } else {
    apiUrl += '?token=' + sessionStorage.__token;
  }

  return fetch(apiUrl, apiData)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { api } = callAPI;
  const { method, params, types, passMiddleware } = callAPI;

  if (typeof api === 'function') {
    api = api(store.getState());
  }

  if (typeof api !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  const actionWith = function(data, payload) {
    const finalPayload = { ...action.payload, ...payload };
    finalPayload.params = data.params;
    if (api) finalPayload.api = data.api;

    const finalAction = { ...action, payload: finalPayload, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [successType, failureType, errorType] = types;
  // 取消请求前的action.
  // next(actionWith({type: requestType}));

  return callApi(api, method, params)
    .then(response => {
      // 只有response的code为0才算是正常的数据。
      if (response.code === 0) {
        return next(actionWith({
          type: successType,
          params: params,
          passMiddleware: passMiddleware,
          status: 'success'
        }, response));
      } else {
        return next(actionWith({
          type: failureType,
          status: 'failure',
          params: params,
          api: callAPI,
          passMiddleware: passMiddleware,
          payload: response.msg,
          code: response.code
        }));
      }
    }, error => next(actionWith({
      type: errorType,
      status: 'failure',
      params: params,
      passMiddleware: passMiddleware,
      payload: error,
      error: true
    }))
    );
};

