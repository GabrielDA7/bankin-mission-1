const fetch = require('node-fetch');
const config = require('../configs');

async function client(endpoint, { body, method, ...customConfig } = {}) {
    if (!method) {
        throw new Error("You must provide a method for your request !");
    }
  
    const requestConfig = {
      method: method,
      headers: {
        ...customConfig.headers,
      },
    };
  
    if (body) {
        requestConfig.body = requestConfig.headers['Content-Type'] == "application/x-www-form-urlencoded" ? body : JSON.stringify(body);
    }

    return fetch(`${config.host}:${config.port}${endpoint}`, requestConfig)
      .then(async (response) => await handleResponse(response));
}

async function handleResponse(response) {  
    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject({
          status: response.status, 
          message: response.statusText
        });
    }
}

module.exports = {
    client
}