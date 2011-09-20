var EventEmitter = require('events').EventEmitter,
    util = require('util');
    
function Endpoint(name) {
    EventEmitter.call(this);
    this.name = name;
}
util.inherits(Endpoint, EventEmitter);

Endpoint.prototype.init = function (app) {
    this.emit('init', this, app);  
};

module.exports = Endpoint;