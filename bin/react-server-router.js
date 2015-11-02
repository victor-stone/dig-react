'use strict'
var fs = require('fs');

var renderToString  = require('react-dom/server').renderToStaticMarkup;
var React           = require('react');

class ReactServerRouter {

  constructor( router, AppModule, pathToIndexHTML, bodyRegex ) {
    this.router     = router;
    this.indexHTML  = pathToIndexHTML;
    this.bodyRegex  = bodyRegex;
    this.AppFactory = React.createFactory(AppModule);
  }

  resolve(url,res,errCallback,successCallback) {
  
    var handlers = this.router.resolve(url);

    if( !handlers ) {
      
      console.log( '404:', url );
      res.statusCode = 404;
      res.end('Not Found');

    } else {

      var h = handlers[0];

      h.component.store(h.params, h.queryParams)

        .then( (store) => {
      
          var fname = this.indexHTML;

          fs.readFile(fname, 'utf8', (err, data) => {
            if (err) {

              throw err;

            } else {

              var props = {
                name:        h.component.displayName,
                component:   h.component,
                store:       store,
                params:      h.params,
                queryParams: h.queryParams 
              };

              var bodyHTML = renderToString( this.AppFactory(props) );

              //console.log( bodyHTML );

              var html = data.replace(this.bodyRegex,'$1' + bodyHTML + '$3'); 

              if( h.component.title ) {
                html = html.replace( /<title>[^<]+<\/title>/, '<title>' + h.component.title + '</title>');
              }

              res.setHeader( 'Content-Type', 'text/html' );
              res.end(html);

              successCallback(url);
            }

          });

      }).catch( function(err) {
        errCallback( url, err );
      });
    }
  }
}

module.exports = ReactServerRouter;