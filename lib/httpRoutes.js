'use strict';

var notificationStream = require('./notificationStream');

function httpRoutes(server) {
  server.use('/devices', require('./routes/devices'));
  server.use('/processes', require('./routes/processes'));

  server.get('/notifications', notificationStream);
}

module.exports = httpRoutes;
