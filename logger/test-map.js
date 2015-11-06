var argv       = require('minimist')(process.argv.slice(2));
var fs  = require('fs');

var logFile = argv.l;
var max = argv.max;
var disp = argv.disp || 100;

console.log( '----------------------------------------------------')
console.log( '|                                                  |')
console.log( '|                                                  |')
console.log( '|                                                  |')
console.log( '|                                                  |')
console.log( '|                                                  |')
console.log( '|                                                  |')
console.log( '----------------------------------------------------')

var data = fs.readFileSync(logFile + '.map', 'utf8');

var offsets = JSON.parse(data);

var fd = fs.openSync(logFile,'r');

var len = max || offsets.length;

for( var i = 0; i < len; i++ ) {
  var offset = offsets[i];
  var buffer = new Buffer(disp);
  fs.readSync(fd, buffer, 0, disp, offset);
  var str = buffer.toString('utf8');
  console.log( `${i} ${offset} ${str}`)
}

fs.close(fd);

