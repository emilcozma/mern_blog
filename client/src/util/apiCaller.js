import fetch from 'isomorphic-fetch';

import authRequestHeader from "./../User/services/requestHeader";

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const callApi = async (endpoint, method = 'get', body, uploadFile = false) => {

  const headers = uploadFile ? {} : { 'content-type': 'application/json' };

  return fetch(`${API_URL}/${endpoint}`, {
    headers: {...headers, ...authRequestHeader()},
    method,
    body: uploadFile ? body : JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  .then(
    response => response,
    error => error
  );
}


export default callApi;