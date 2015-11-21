'use strict'
var fs = require('fs');

var renderToString  = require('react-dom/server').renderToStaticMarkup;
var React           = require('react');

class ReactServerRouter {

  constructor( router, AppModule, pathToIndexHTML, bodyRegex ) {
    this.router     = router;
    this.indexHTML  = fs.readFileSync(pathToIndexHTML,'utf8');
    this.bodyRegex  = bodyRegex;
    this.AppFactory = React.createFactory(AppModule);
  }

  resolve(url,req,res,errCallback,successCallback) {
  
    var handlers = this.router.resolve(url);

    if( !handlers ) {
      
      //console.log( '404:', url, req.headers['referer'] || '' );
      res.statusCode = 404;
      res.end('Not Found');
      successCallback(url,req,res);
      return;
    } 

    var h = handlers[0];

    h.component.store(h.params, h.queryParams)

      .then( (store) => {
    
          var props = {
            name:        h.component.displayName,
            component:   h.component,
            store:       store,
            params:      h.params,
            queryParams: h.queryParams 
          };

          var bodyHTML = renderToString( this.AppFactory(props) );

          var html = this.indexHTML.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

          if( h.component.title ) {
            html = html.replace( /<title>[^<]+<\/title>/, '<title>' + h.component.title + '</title>');
          }

          res.setHeader( 'Content-Type', 'text/html' );
          res.end(html);

          successCallback(url, req, res); 

      }).catch( function(err) {
        errCallback( url, req, res, err );
      });
  }
}

module.exports = ReactServerRouter;