'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepExtend = require('deep-extend');

var _deepExtend2 = _interopRequireDefault(_deepExtend);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _components = require('./components');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtsHelpsApi = function () {
  /**
   * Sets up default configuration
   *
   * @param {object} options - An object containing options to override.
   */
  function UtsHelpsApi(options) {
    _classCallCheck(this, UtsHelpsApi);

    options = options || {};
    this.options = (0, _deepExtend2.default)({
      apiKey: '123456',
      restBase: 'http://utshelpsapi.azurewebsites.net/api'
    }, options);
    this.onResponseReceived = options.onResponseReceived || this._onResponseReceived;
    this.onBeforeRequest = options.onBeforeRequest || this._onBeforeRequest;

    this.version = '';
  }

  /**
   * Hook for doing processing before a request is made.
   *
   * @param uri
   * @param data
   * @param callback
   * @private
   */


  _createClass(UtsHelpsApi, [{
    key: '_onBeforeRequest',
    value: function _onBeforeRequest(uri, data, callback) {
      callback(uri, data);
    }

    /**
     * Hook for handling a response before it is returned to the caller.
     *
     * @param err
     * @param res
     * @param callback
     * @private
     */

  }, {
    key: '_onResponseReceived',
    value: function _onResponseReceived(err, res, callback) {
      callback(err, res);
    }

    /**
     * Prepends the version to the request endpoint.
     *
     * @returns {string} A string in the form /v{version_number}/{endpoint}.
     */

  }, {
    key: '_getURI',
    value: function _getURI(uri) {
      return uri;
    }

    /**
     * Builds the absolute path for a request.
     *
     * @param {string} uri - The request endpoint, excluding the version number.
     * @returns {string} An absolute path for the request.
     */

  }, {
    key: '_buildEndpoint',
    value: function _buildEndpoint(uri) {
      return '' + this.options.restBase + this._getURI(uri);
    }

    /**
     * Gets the request headers for a user.
     */

  }, {
    key: 'getRequestHeaders',
    value: function getRequestHeaders() {
      return {
        AppKey: this.options.apiKey,
        'Content-Type': 'application/json'
      };
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

  }, {
    key: '_processResponse',
    value: function _processResponse(callback, err, res) {
      if (err || !res.body.IsSuccess) {
        return this.onResponseReceived(err || res.body, res, callback);
      }
      this.onResponseReceived(null, res.body, callback);
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

  }, {
    key: '_buildFormRequestOptions',
    value: function _buildFormRequestOptions(uri, data, method) {
      var headers = data.headers;
      var form = data.form;
      var qs = data.qs;

      return {
        url: this._buildEndpoint(uri),
        method: method,
        headers: headers,
        form: (typeof form === 'undefined' ? 'undefined' : _typeof(form)) === 'object' ? form : {},
        qs: (typeof qs === 'undefined' ? 'undefined' : _typeof(qs)) === 'object' ? qs : {},
        withCredentials: false
      };
    }

    /**
     * Runs the onBeforeRequest hook to allow modifications/cancellation of the request.
     *
     * @param uri
     * @param data
     * @param callback
     * @private
     */

  }, {
    key: '_processRequest',
    value: function _processRequest(uri, data, callback) {
      var _this = this;

      this.onBeforeRequest(uri, data, function (newUri, newData) {
        if (newUri === false || typeof newUri === 'undefined' || typeof newData === 'undefined') {
          return callback({ data: { message: 'Request cancelled' } });
        }
        _this._makeRequest(newUri, newData, callback);
      });
    }

    /**
     * Performs the request.
     *
     * @param uri
     * @param data
     * @param callback
     * @private
     */

  }, {
    key: '_makeRequest',
    value: function _makeRequest(uri, data, callback) {
      var request = (0, _superagent2.default)(data.method, this._buildEndpoint(uri)).set(data.headers || this.getRequestHeaders(data));
      if (data.query) {
        request.query(data.query);
      }
      if (data.form) {
        if (!data.fileUpload) {
          request.type('form');
        }
        request.send(data.form);
      }
      request.end(this._processResponse.bind(this, callback));
    }

    /**
     * Makes a GET request.
     *
     * @param uri
     * @param data
     * @param callback
     */

  }, {
    key: 'get',
    value: function get(uri, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = {};
      }
      this._processRequest(uri, _extends({}, data, { method: 'GET' }), callback);
    }

    /**
     * Makes a PUT request.
     * @param uri
     * @param data
     * @param callback
     */

  }, {
    key: 'put',
    value: function put(uri, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = {};
      }
      this._processRequest(uri, _extends({}, data, { method: 'PUT' }), callback);
    }

    /**
     * Makes a POST request.
     *
     * @param uri
     * @param data
     * @param callback
     */

  }, {
    key: 'post',
    value: function post(uri, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = {};
      }
      this._processRequest(uri, _extends({}, data, { method: 'POST' }), callback);
    }

    /**
     * Makes a DELETE request.
     *
     * @param uri
     * @param data
     * @param callback
     */

  }, {
    key: 'del',
    value: function del(uri, data, callback) {
      if (typeof data === 'function') {
        callback = data;
        data = {};
      }
      this._processRequest(uri, _extends({}, data, { method: 'DELETE' }), callback);
    }
  }]);

  return UtsHelpsApi;
}();

exports.default = UtsHelpsApi;

UtsHelpsApi.prototype.endpoints = {};

/**
 * Adds a component's endpoints and methods to the UtsHelpsApi class.
 *
 * @param obj
 * @param classObj
 */
function addComponentToClass(obj, classObj) {
  if (obj.endpoints) {
    classObj.prototype.endpoints = _extends({}, classObj.prototype.endpoints, obj.endpoints);
  }
  if (obj.methods) {
    Object.keys(obj.methods).forEach(function (key) {
      classObj.prototype[key] = obj.methods[key];
    });
  }
}

Object.keys(components).forEach(function (c) {
  addComponentToClass(components[c], UtsHelpsApi);
});