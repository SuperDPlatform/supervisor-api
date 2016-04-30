function sse(req, res, next) {
  res.sseSetup = function() {
    req.socket.setKeepAlive(true);
    req.socket.setTimeout(0);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.status(200);

    res.write(':' + Array(2049).join(' ') + '\n');
    res.write('retry: 2000\n\n');
  }

  res.sendEvent = function(name, data) {
    res.write("event: " + name + "\n");

    if (data instanceof Object)
      res.write("data: " + JSON.stringify(data) + "\n\n");
    else
      res.write("data: " + data + "\n\n");
  }

  var keepAlive = setInterval(function() {
    res.write(':keep-alive\n\n');
  }, 20000);

  res.on('close', function close() {
    clearInterval(keepAlive);
  });

  next();
}

module.exports = sse;
