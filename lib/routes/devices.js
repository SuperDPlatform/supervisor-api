'use strict';

var exec = require('child_process').exec;
var router = require('express').Router();

router.get('/', function(req, res) {
  exec("lshw -json", function(err, stdout, stderr) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(stdout);
  });
});

module.exports = router;
