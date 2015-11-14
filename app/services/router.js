
import RouteRecognizer  from 'route-recognizer';
import rsvp             from 'rsvp';
import Eventer          from './eventer';

class Router extends Eventer
{
  constructor() {
    super(...arguments);

    this.recognizer = new RouteRecognizer();
    this.routes = [];
    this.rewrites = [];

    if( typeof window !== 'undefined' ) {
      window.onpopstate = this.updateURL.bind(this);
    }
  }
  
  addRoutes(routes, rewrites) {

    this.routes = routes;
    this.rewrites = rewrites || [];
    // baby steps: nothing nested for now

    for( var handler in routes ) {
      var component = routes[handler];
      var path = component.path || ('/' + handler);
      if( !component.store ) {
        component.store = function() { return rsvp.resolve({}); };
      }
      this.recognizer.add( [ { path, handler } ] );
    }
  }
  
  runRewrites(url) {
    if( url ) {
      for( var i = 0; i < this.rewrites.length; i++) {
        var rule = this.rewrites[i];
        if( url.match(rule.regex) !== null ) {
          return url.replace(rule.regex,rule.now);
        }
      }
    }
    return url;
  }

  resolve(url) {
    url = this.runRewrites(url);
    var results = this.recognizer.recognize(url);
    if( results ) {
      var handlers = results.slice();
      var queryParams = results.queryParams || {};
      var routes = this.routes;
      return handlers.map( function(h) { 
                                return { 
                                  component: routes[h.handler], 
                                  params: h.params || {},
                                  queryParams 
                                };
                              });
    }
    return null;
  }

  /* in browser methods */
  navigateTo(url,stateObj) {
    url = this.runRewrites(url);
    this.setBrowserAddressBar(url,stateObj);
    this.updateURL();
  }

  setBrowserAddressBar(url,stateObj) {
    url = this.runRewrites(url);
    if( url ) {
      window.history.pushState(stateObj || null,null,url);
      if( window.ga ) {
        window.ga( 'send', 'pageview', document.location.pathname );
      }
    }
  }

  updateURL() {
    var q = document.location.search || '';
    var handlers = this.resolve(document.location.pathname + q);
    if (!handlers ) {
      // ummmmm
      return window.alert('Not Found');
    }
    if( handlers.length > 1 ) {
      throw new Error('wups - don\'t do nested route handlers yet');
    }
    var handler = handlers[0];
    var hash = document.location.hash || '';
    handler.component.store(handler.params, handler.queryParams)
      .then( store => {
          this.emit('navigateTo', {
            name: handler.component.displayName, 
            component: handler.component,
            store,
            params: handler.params,
            queryParams: handler.queryParams,
            hash } );
      }).catch( function(err) {
        /* eslint no-console:0 */
        console.log( err + '', err.stack );
        /* xeslint no-console:2 */
        window.alert('Wups, could not show you that');
      });
  }

}
    
module.exports = new Router();

