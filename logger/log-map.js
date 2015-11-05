var fs = require('fs');

var log = function() { }; // console.log;

function checkForMap(logName,mapName) {

  var mapStats = null;

  try {
    mapStats = fs.statSync(mapName);
  } catch(e) {
    return false;
  }

  var logStats = fs.statSync(logName);

  return logStats.mtime.getTime() < mapStats.mtime.getTime();
}

var mapCache = {};

function createMap(logName, reject, resolve ) {

  var mapName = logName + '.map';

  if( checkForMap(logName,mapName) ) {
    if( logName in mapCache ) {
      log(`found ${mapName} in cache`);
      resolve(mapCache[logName]);
    } else {
      log(`didn't find ${logName} in cache - reading from disk`);
      fs.readFile( mapName, 'utf8', function(err, data) {
        if( err ) {
          reject(err);
        } else {
          try {
            mapCache[logName] = JSON.parse(data);
            log(`creating cache entry for ${logName}`);
            resolve(mapCache[logName]);
          } catch(err) {
            reject(err)
          }
        }
      });
    }
  } else {

    var offset  = 0;
    var offsets = [ 0 ];
    var sig     = `},\n`;
    var sigLen  = sig.length;
    var fsize   = fs.statSync(logName).size;

    log(`creating map for ${logName}`)
    var readable = fs.createReadStream(logName,'utf8');

    readable.on('data', function(chunk) {
      var pos      = offset;
      var localPos = 0;
      while (localPos < chunk.length) {
        var index = chunk.indexOf(sig,localPos);
        if( index === -1 ) {
          break;
        }
        localPos = (index+sigLen);
        offsets.push(offset + localPos);
      }
      offset += chunk.length;
    });

    readable.on('end', function() {
      offsets.push(fsize);
      var json = JSON.stringify(offsets);
      fs.writeFile( mapName, json, 'utf8');
      mapCache[logName] = offsets;
      log(`created cache entry for ${logName} - ${offsets.length} items`)
      resolve(offsets);
    });

    readable.on( 'error', function(err) {
      reject(err);
    });
  }
}


module.exports = createMap;
