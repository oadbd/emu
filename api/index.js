var Registry = require('./Registry').Registry,
	ApiHelper = require('./ApiHelper').ApiHelper;
	
module.exports = {
	helper: function (opts) {
		return new ApiHelper(opts);
	},
	registry: function (opts) {
		return new Registry(opts);
	}
};
