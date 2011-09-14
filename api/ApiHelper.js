var fs = require('fs'),
	events = require('events'),
	util = require('util');

function ApiError(code, message, cause) {
    this.code = code;
    this.message = message;
    this.cause = cause;
};


function ApiHelper() {
	events.EventEmitter.call(this);
}
util.inherits(ApiHelper, events.EventEmitter);

ApiHelper.prototype.init = function (app) {
	this.emit('init', app);
};

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

exports.ApiHelper = ApiHelper;
