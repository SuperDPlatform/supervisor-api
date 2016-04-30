'use strict';

var notificationStream = require('./notificationStream');

function httpRoutes(server) {
  server.use('/devices', require('./routes/devices'));

  server.get('/notifications', notificationStream);
}

module.exports = httpRoutes;
