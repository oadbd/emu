var fs = require('fs'),
	util = require('util'),
    server = require('../server');

function ApiError(code, message, cause) {
    this.code = code;
    this.message = message;
    this.cause = cause;
}


function ApiHelper(name) {
    server.Endpoint.call(this, name);
    
}
util.inherits(ApiHelper, server.Endpoint);

ApiHelper.prototype.jsonHeaders = function (data) {
    return {
        'Content-Type': 'text-plain',
        'Content-Length': data.length
    };
};

ApiHelper.prototype.send = function (res, code, data) {
    res.writeHead(code, this.jsonHeaders(data));
    res.end(data);
};

ApiHelper.prototype.error = function (res, code, message, cause) {
    var errorObj = new ApiError(code, message, cause);
    var data = JSON.stringify(errorObj);
    this.send(res, code, data);
};

ApiHelper.prototype.success = function (res, data) {
    var code = data ? 200 : 204;
    this.send(res, code, data);
};

module.exports = ApiHelper;
