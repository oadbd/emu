var express = require('express'),
    EventEmitter = require('events').EventEmitter,
    util = require('util');

var defaultShutdown = function () {
	console.log("\nSIGINT caught - Shutting down!");
	process.exit(0);
};

var initializeEndpoints = function (server) {
    var name;
    for (name in endpoints) {
        if (endpoints.hasOwnProperty(name)) {
            console.log('Initializing endpoint: ' + name);
            this.emit('endpoint', endpoints[name]);
            endpoints[name].init(server.app);
        }
    }
};

function ServerWrapper(cfg) {
    EventEmitter.call(this);
	var config = cfg || {};
	
	this.port = config.port || 9090;
	this.host = config.host || '0.0.0.0';
	this.shutdown = config.shutdown || defaultShutdown;
	
    this.endpoints = {};
    
	this.app = express.createServer();
}
util.inherits(ServerWrapper, EventEmitter);

ServerWrapper.prototype.register = function (endpoint) {
    if (endpoint && endpoint.name && typeof endpoint.init === "function") {
        this.endpoints[endpoint.name] = endpoint;
    }
    this.emit('register', endpoint);
    return this;
};

ServerWrapper.prototype.start = function () {
	var wrapper = this;
    this.emit('init', app, express);
        
	this.app.listen(this.port);
	process.on('SIGINT', function () {
		wrapper.stop();
	});
	console.log("Running at " + this.host + ":" + this.port + " - Ctrl-C to exit");
	return this;
};

ServerWrapper.prototype.stop = function () {
	this.shutdown();
	return this;
};

module.exports = ServerWrapper;
