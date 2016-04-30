'use strict';

var config = require('./config');
var httpServer = require('./lib/httpServer');
var socketServer = require('./lib/socketServer')(httpServer);

httpServer.listen(config.httpServer.port);
