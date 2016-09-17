import extend from 'deep-extend'
import superagent from 'superagent'

import * as components from './components'

export default class ScoreboardApi {
  /**
   * Sets up default configuration
   *
   * @param {object} options - An object containing options to override.
   */
  constructor(options) {
    options = options || {}
    this.options = extend({
      apiKey: '123456',
      restBase: 'http://utshelps.ddns.net/api'
    }, options)
    this.onResponseReceived = options.onResponseReceived || this._onResponseReceived
    this.onBeforeRequest = options.onBeforeRequest || this._onBeforeRequest

    this.version = ''
  }

  /**
   * Hook for doing processing before a request is made.
   *
   * @param uri
   * @param data
   * @param callback
   * @private
   */
  _onBeforeRequest(uri, data, callback) {
    callback(uri, data)
  }

  /**
   * Hook for handling a response before it is returned to the caller.
   *
   * @param err
   * @param res
   * @param callback
   * @private
   */
  _onResponseReceived(err, res, callback) {
    callback(err, res)
  }

  /**
   * Prepends the version to the request endpoint.
   *
   * @returns {string} A string in the form /v{version_number}/{endpoint}.
   */
  _getURI(uri) {
    return `/${this.version}${uri}`
  }

  /**
   * Builds the absolute path for a request.
   *
   * @param {string} uri - The request endpoint, excluding the version number.
   * @returns {string} An absolute path for the request.
   */
  _buildEndpoint(uri) {
    return `${this.options.restBase}${this._getURI(uri)}`
  }

  /**
   * Gets the request headers for a user.
   */
  getRequestHeaders() {
    return {
      AppKey: `AppKey ${this.apiKey}`,
      'Content-Type': 'application/json'
    }
  }

  /**
   * Processes an API response.
   *
   * @param callback
   * @param err
   * @param res
   * @returns {*}
   * @private
   */
  _processResponse(callback, err, res) {
    if (err || res.success === false) {
      return this.onResponseReceived(err.response, res, callback)
    }
    this.onResponseReceived(null, res.body.data, callback)
  }

  /**
   * Builds the request object for a form-related request (e.g. POST/DELETE/PUT).
   *
   * @param uri
   * @param data
   * @param method
   * @returns {{url: string, method: *, headers, form: {}, qs: {}, withCredentials: boolean}}
   * @private
   */
  _buildFormRequestOptions(uri, data, method) {
    const { headers, form, qs } = data
    return {
      url: this._buildEndpoint(uri),
      method,
      headers,
      form: typeof form === 'object' ? form : {},
      qs: typeof qs === 'object' ? qs : {},
      withCredentials: false
    }
  }

  /**
   * Runs the onBeforeRequest hook to allow modifications/cancellation of the request.
   *
   * @param uri
   * @param data
   * @param callback
   * @private
   */
  _processRequest(uri, data, callback) {
    this.onBeforeRequest(uri, data, (newUri, newData) => {
      if (newUri === false || typeof newUri === 'undefined' || typeof newData === 'undefined') {
        return callback({data: {message: 'Request cancelled'}})
      }
      this._makeRequest(newUri, newData, callback)
    })
  }

  /**
   * Performs the request.
   *
   * @param uri
   * @param data
   * @param callback
   * @private
   */
  _makeRequest(uri, data, callback) {
    let request =
      superagent(data.method, this._buildEndpoint(uri))
        .set(data.headers || this.getRequestHeaders(data))

    if (data.query) {
      request.query(data.query)
    }
    if (data.form) {
      if (!data.fileUpload) {
        request.type('form')
      }
      request.send(data.form)
    }
    request.end(this._processResponse.bind(this, callback))
  }

  /**
   * Makes a GET request.
   *
   * @param uri
   * @param data
   * @param callback
   */
  get(uri, data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = {}
    }
    this._processRequest(uri, {...data, method: 'GET'}, callback)
  }

  /**
   * Makes a PUT request.
   * @param uri
   * @param data
   * @param callback
   */
  put(uri, data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = {}
    }
    this._processRequest(uri, {...data, method: 'PUT'}, callback)
  }

  /**
   * Makes a POST request.
   *
   * @param uri
   * @param data
   * @param callback
   */
  post(uri, data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = {}
    }
    this._processRequest(uri, {...data, method: 'POST'}, callback)
  }

  /**
   * Makes a DELETE request.
   *
   * @param uri
   * @param data
   * @param callback
   */
  del(uri, data, callback) {
    if (typeof data === 'function') {
      callback = data
      data = {}
    }
    this._processRequest(uri, {...data, method: 'DELETE'}, callback)
  }
}
ScoreboardApi.prototype.endpoints = {}

/**
 * Adds a component's endpoints and methods to the ScoreboardApi class.
 *
 * @param obj
 * @param classObj
 */
function addComponentToClass(obj, classObj) {
  if (obj.endpoints) {
    classObj.prototype.endpoints = {
      ...classObj.prototype.endpoints,
      ...obj.endpoints
    }
  }
  if (obj.methods) {
    Object.keys(obj.methods).forEach(key => {
      classObj.prototype[key] = obj.methods[key]
    })
  }
}

Object.keys(components).forEach(c => {
  addComponentToClass(components[c], ScoreboardApi)
})
