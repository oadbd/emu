var ApiHelper = require('./ApiHelper').ApiHelper;

function Registry() {
	var registry = {};
	
	this.register = function (identifier, api) {
		if (api instanceof ApiHelper) {
			registry[identifier] = api;
		}
		return registry;
	};
	
	this.init = function (app) {
		for (var id in registry) {
			if (registry.hasOwnProperty(id)) {
				console.log("Initializing '" + id + "' endpoints");
				registry[id].init(app);
			}
		}
	};
}
exports.Registry = Registry; 
