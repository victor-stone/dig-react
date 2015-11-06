'use strict';
var express     = require('express');
var serveStatic = require('serve-static')
var fs          = require('fs');
var getLogMap   = require('./log-map');

var LOG_DIR = __dirname + '/../logs/';

var app = express();

app.use(serveStatic( __dirname + '/public/'));

app.get('/logs/:date/:app/:type', getlog);

var port = 4080;

app.listen(port);
console.log(`Listening on port ${port}...`);

var filterCache = {};

function getlog(req,res) {
  var date   = req.params.date;
  var app    = req.params.app;
  var type   = req.params.type;
  var offset = req.query.offset || 0;
  var limit  = 30;

  var wantCount = req.query.wantCount || false;
  var filter    = null;
  var filterSig = null;
  
  var fname = `${LOG_DIR}${date}-${app}-${type}-log.json`;

  if( req.query.filter ) {
    filterSig = req.query.filter;
    filter    = JSON.parse(req.query.filter);
  }

  getLogMap(fname, handleError, function(logMap) {
    if( wantCount ) {
      res.end( JSON.stringify([ logMap.length ]));
    } else {
      getLogItems(logMap)
    }
  });    

  function getFilterMap(logMap) {
    if( fname in filterCache ) {
      var filters = filterCache[fname];
      if( filterSig in filters ) {
        return filters[filterSig];
      }
    } else {
      filterCache[fname] = {};
    }
  }

  function getLogItems(logMap) {
    var figs = translateMapOffsets(logMap);
    readChunk( figs.offset, figs.amount, function(json) {
      var eof = figs.eof ? ',{"end":"end"}' : '';
      try {
        json = JSON.parse( `[${json}${eof}]` );
        res.send( JSON.stringify(json) );
      } catch(e) {
        handleError(e);
      }
    });
  }

  function handleError(err) {
    var stack = err.stack || '(no stack)';
    var ret = {
      error: err + '',
      stack
    };
    res.end( JSON.stringify([ret]) );
  }

  function translateMapOffsets(map) {  
    if( offset !== 'tail') {
      offset = Number(offset);
    }
    if( map.length < limit ) {
      offset = 0;
      limit = map.length - 1 ;
    } else {
      if( offset === 'tail' || offset + limit >= map.length ) {
        offset = map.length - (limit+1);
      }
    }
    var trailingComma = `,\n`;
    var lastOffset    = (offset+limit);
    var fileOffset    = map[offset];
    var endOffset     = map[lastOffset];
    var amount        = (endOffset - fileOffset) - trailingComma.length;
    //console.log(`${offset} => ${fileOffset} - ${lastOffset} => ${endOffset} - read: ${amount} `);
    return {
      offset: fileOffset,
      amount,
      eof: offset + limit >= (map.length-1)
    };
  }

  function readChunk(offset,amount,resolve) {
    fs.open(fname, 'r', function(err, fd) {
      if( err ) {
        handleError(err);
      } else {
        var buffer = new Buffer(amount);
        fs.read(fd, buffer, 0, amount, offset, function(err,bytesRead,buffer) {
          fs.close(fd);
          if( err ) {
            handleError(err);
          } else {
            resolve(buffer.toString('utf8'));
          }
        });
      }
    });  
  }

}


