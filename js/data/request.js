import fetch from 'isomorphic-fetch';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Parse-Application-Id': 'mmoMgOQzCeRE8Ad4vmRkHMLYyTwEPPrAGXMEfDFm',
  'X-Parse-REST-API-Key': 'xvocUSdI55mrUV7m7fb0ylyXO2kQ6EML2mlBDEoY'
}

export function putRequest(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(data)
  });
}

export function postRequest(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data)
  });
}

export function getRequest(url) {
  return fetch(url, {headers: HEADERS});
}

export default {
  put: putRequest,
  post: postRequest,
  get: getRequest
}
