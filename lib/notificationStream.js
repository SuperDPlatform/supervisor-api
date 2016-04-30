function notificationStream(req, res) {
  res.sseSetup();
}

module.exports = notificationStream;
