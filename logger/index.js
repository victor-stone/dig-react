'use strict';
var express     = require('express');
var serveStatic = require('serve-static')
var fs          = require('fs');
var getLogMap   = require('./log-map');

var LOG_DIR = '../logs/';

var app = express();

app.use(serveStatic('public/'));

app.get('/logs/:date/:app/:type', getlog);

var port = 4080;

app.listen(port);
console.log(`Listening on port ${port}...`);

function getlog(req,res) {
    var date   = req.params.date;
    var app    = req.params.app;
    var type   = req.params.type;
    var offset = req.query.offset || 0;

    var fname = `${LOG_DIR}${date}-${app}-${type}-log.json`;

    function handleError(err) {
      var ret = {
        error: err + '',
        exception: err
      };
      res.end( JSON.stringify(ret) );
    }

    var limit = 30;

    try {
      getLogMap(fname, handleError, function(logMapName) {

        fs.readFile( logMapName, 'utf8', function(err, data) {
          if( err ) {
            handleError(err);
          } else {
            var logMap = JSON.parse(data);
            data = null;
            var figs = getMapOffsets(logMap,offset,limit);
            logMap = null;
            readChunk(fname,figs.offset,figs.amount,handleError,function(json) {
              var eof = figs.eof ? ',{"end":"end"}' : '';
              json = JSON.parse( `[${json}${eof}]` );
              res.send( JSON.stringify(json) );
            });
          }
        });
      });
    }
    catch(e) {
      handleError(e);
    }
}

function getMapOffsets(map,offset,limit) {  
  if( offset !== 'tail') {
    offset = Number(offset);
  }
  if( map.length < limit ) {
    offset = 0;
    limit = map.length;
  } else {
    if( offset === 'tail' || offset + limit > map.length ) {
      offset = map.length - limit;
    }
  }
  var fileOffset = map[offset];
  var endOffset  = map[ (offset+limit)-1 ];
  return {
    offset: fileOffset,
    amount: (endOffset - fileOffset) - 2, // shave off trailing ',\n'
    eof: offset + limit >= (map.length-1)
  };
}

function readChunk(filepath,offset,amount,reject,resolve) {
  fs.open(filepath, 'r', function(err, fd) {
    var buffer = new Buffer(amount);
    fs.read(fd, buffer, 0, amount, offset, function(err,bytesRead,buffer) {
      if( err ) {
        reject(err);
      } else {
        resolve(buffer.toString('utf8'));
      }
      fs.close(fd);
    });
  });  
}
