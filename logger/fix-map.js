#!/usr/bin/env node
var argv       = require('minimist')(process.argv.slice(2));
var fs  = require('fs');

var logFile = argv.l;

var tmpName = '../tmp/logtemp';

var readable = fs.createReadStream(logFile,'utf8');

console.log('fixing: ',logFile);

readable.on('data', function(chunk) {
  chunk = chunk.replace(/[^\x00-\x7F]/g,' ');
  fs.appendFileSync(tmpName,chunk,'utf8');
});

readable.on('end', function() {
  fs.unlinkSync(logFile);
  fs.renameSync(tmpName,logFile);
});

readable.on( 'error', function(err) {
  throw err;
});


