var express = require('express');

var defaultShutdown = function () {
	console.log("\nSIGINT caught - Shutting down!");
	process.exit(0);
};

function ServerWrapper(cfg) {
	var config = cfg || {};
	
	this.port = config.port || 9090;
	this.host = config.host || '0.0.0.0';
	this.shutdown = config.shutdown || defaultShutdown;
	
	this.app = express.createServer();
	
	
}

ServerWrapper.prototype.start = function () {
	var wrapper = this;

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

exports.ServerWrapper = ServerWrapper;
