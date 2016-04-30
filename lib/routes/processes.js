'use strict';

var exec = require('child_process').exec;
var router = require('express').Router();

router.get('/', function(req, res) {
  exec("ps axo pid,comm,pcpu,size", function(err, stdout, stderr) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var ps = stdout.trim()
      .split(/\n/)
      .slice(1)
      .map(function(line) {
        var match = line.match(/\s*(\d+)\s+(.+)\s*/);
        if (match == null) {
          return null;
        } else {
          return { pid: match[1], cmd: match[2], cpu: match[3], mem: match[4] };
        }
      });

    res.send(ps);
  });
});

module.exports = router;
