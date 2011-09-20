var ServerWrapper = require('./ServerWrapper'),
    Endpoint = require('./Endpoint');

module.exports = {
    create : function (cfg) {
        return new ServerWrapper(cfg);
    },
    ServerWrapper: ServerWrapper,
    Endpoint: Endpoint
};
