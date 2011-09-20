var ApiHelper = require('./ApiHelper').ApiHelper;
	
module.exports = {
	helper: function (name) {
		return new ApiHelper(name);
	},
    ApiHelper: ApiHelper
};
