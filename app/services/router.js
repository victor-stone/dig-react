import RouteRecognizer  from 'route-recognizer';
import rsvp             from 'rsvp';

import Eventer          from 'services/eventer';
import env              from 'services/env';
import events           from 'models/events';

const NoopStore = new class {
  on() {}
  removeListener() {}
};

class Router extends Eventer
{
  constructor() {
    super(...arguments);

    this.recognizer = new RouteRecognizer();

    this.routes = null;
    this.rewrites = [];
    this.__currRoute = {};

    (typeof window !== 'undefined') && (window.onpopstate = this.updateURL.bind(this));
  }
  
  addRoutes(routes, rewrites = {}) {

    this.routes   = routes;
    this.rewrites = rewrites;

    const noopStore  = () => rsvp.resolve(NoopStore);

    const genericUrl = path => store => path + (store.queryString() || '');

    // baby steps: nothing nested for now

    for( const handler in routes ) {

      const route = routes[handler];

      const { 
        path = ['/' + handler], 
        store = noopStore, 
        urlFromStore 
      } = route;
    
      const paths = Array.isArray( path ) ? path : [ path ];
      
      Object.assign( route, { 
        path, 
        store, 
        urlFromStore: urlFromStore || genericUrl(paths[0]) 
      });
      
      paths.forEach( path => this.recognizer.add( [ { path, handler } ] ) );
    }
  }
  
  get _currentPath() {
    const { search = '', pathname } = document.location;
    return pathname + search;
  }

  runRewrites(url) {
    if( url ) {
      const rule = this.rewrites.find( rule => url.match(rule.regex) );
      if( rule ) {
        url = rule.now;
      }
    }
    return url;
  }

  /*
    convert a url into a component based handler
  */
  resolve(url) {

    this._ensureRoutes();

    url = this.runRewrites(url);

    const handlers = this.recognizer.recognize(url);

    if( handlers ) {

      // result is an array-like object with a 'queryParams' property

      const { queryParams = {} } = handlers;
      
      return handlers.slice().map( h => { 
                                    return { 
                                      component: this.routes[h.handler], 
                                      params: h.params || {},
                                      queryParams 
                                    };
                                  });
    }

    return null;
  }

  /* in browser methods */
  navigateTo(url,stateObj) {
    
    try {
      this.setBrowserAddressBar(url,stateObj);
      this.updateURL();
    } 
    catch(e) {
      env.error(e);
    }
  }

  setBrowserAddressBar(url,stateObj) {
    if( url ) {
      window.history.pushState(stateObj || null,null,url);
      if( window.ga ) {
        window.ga( 'send', 'pageview', document.location.pathname );
      }
    }
  }

  // Called from .navigateTo() and when user hits 'back' or 'foward' button
  updateURL() {
    
    var handlers = this.resolve(this._currentPath);

    if (!handlers ) {
      // TODO: signal a 404
      return window && window.alert('Not Found');
    }

    if( handlers.length > 1 ) {
      
      // TODO: signal a 500
      throw new Error('wups - don\'t do nested route handlers yet');
    }

    var handler = handlers[0];

    const { 
      params,
      queryParams,
      component,
      component: { 
        displayName:name, 
        path,
      }            
    } = handler;

    component.store(params, queryParams)
      .then( store => {
  
          const meta = {
            store,              
            name,
            component,
            path,
            params,
            queryParams,
            hash:  (document && document.location.hash) || ''
          };
          
          this.emit( events.PRE_NAVIGATE, meta, this.__currRoute );

          const prevStore = this.__currRoute.store;

          prevStore && prevStore.removeListener( events.MODEL_UPDATED, this.modelChanged.bind(this,prevStore) );

          this.__currRoute = {
            component,
            store
          };

          store.on( events.MODEL_UPDATED, this.modelChanged.bind(this,store) );

          this.emit( events.NAVIGATE_TO, meta);
          
      }).catch( error => {
        env.error( error );
      });
  }

  modelChanged() {

    const { component, store } = this.__currRoute;
    
    var url = component.urlFromStore( store );
    
    if( url !== this._currentPath ) {
      this.setBrowserAddressBar( url );
      this.emit( events.NAVIGATE_TO_THIS );
    }
  }

  _ensureRoutes() {
    this.routes === null && env.routes && this.addRoutes( env.routes, env.rewriteRules );
  }
}
    
module.exports = new Router();

