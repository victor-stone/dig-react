var fs = require('fs');

//var fname   = '../logs/2015-11-03-dig-app-log.json';

function checkForMap(fname) {
  var mapName = fname + '.map';
  var mapStats = null;

  try {
    mapStats = fs.statSync(mapName);
  } catch(e) {
    return false;
  }

  var logStats = fs.statSync(fname);

  return logStats.mtime.getTime() > mapStats.mtime.getTime();
}

function createMap(fname, reject, resolve, force) {

  var mapName = fname + '.map';

  if( !force && checkForMap(fname) ) {
    resolve(mapName);
    return;
  }

  var readable = fs.createReadStream(fname,'utf8');

  var offset = 0;
  var offsets = [ 0 ];

  readable.on('data', function(chunk) {
    var pos = offset;
    offset += chunk.length;
    var index = 0;
    while (pos < offset) {
      index = chunk.indexOf(`\n`);
      if( index === -1 ) {
        break;
      }
      pos += (index+1);
      offsets.push(pos);
      chunk = chunk.substr(index+1);
    }
  });

  var wasError = false;

  readable.on('end', function() {
    var json = JSON.stringify(offsets);
    fs.writeFile( mapName, json, 'utf8');
    resolve(mapName);
  });

  readable.on( 'error', function(err) {
    wasError = true;
    reject(err);
  });
}


module.exports = createMap;
