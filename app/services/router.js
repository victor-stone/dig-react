import RouteRecognizer  from 'route-recognizer';
import rsvp             from 'rsvp';

import Eventer          from './eventer';
import env              from './env';
import events           from '../models/events';

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
  
  get _currentPath() {
    const { search = '', pathname } = document.location;
    return pathname + search;
  }

  addRoutes(routes, rewrites = {}) {

    this.routes   = routes;
    this.rewrites = rewrites;

    const noopStore  = () => rsvp.resolve({});
    const genericUrl = path => store => path + (store.queryString || '');

    // baby steps: nothing nested for now

    for( const handler in routes ) {
      const { path = ['/' + handler], store = noopStore, urlFromStore } = routes[handler];
      const paths = Array.isArray( path ) ? path : [ path ];
      Object.assign( routes[handler], { path, store, urlFromStore: urlFromStore || genericUrl(paths[0]) } );
      paths.forEach( path => this.recognizer.add( [ { path, handler } ] ) );
    }
  }
  
  runRewrites(url) {
    if( url ) {
      url = this.rewrites.find( rule => url.match(rule.regex) ) || url;
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
      var queryParams = handlers.queryParams || {};
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
      url = this.runRewrites(url);
      this.setBrowserAddressBar(url,stateObj);
      this.updateURL();
    } 
    catch(e) {
      env.error(e);
    }
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

  // Called from .navigateTo() and when user hits 'back' or 'foward' button
  updateURL() {
    var handlers = this.resolve(this._currentPath);
    if (!handlers ) {
      return window.alert('Not Found');
    }
    if( handlers.length > 1 ) {
      throw new Error('wups - don\'t do nested route handlers yet');
    }
    var handler = handlers[0];

    handler.component.store(handler.params, handler.queryParams)
      .then( store => {
  
          const meta = {
            store,              
            name:        handler.component.displayName, 
            component:   handler.component,
            path:        handler.component.path,
            params:      handler.params,
            queryParams: handler.queryParams,
            hash:        document.location.hash || ''
          };
          
          this.emit( events.PRE_NAVIGATE, meta, this.__currRoute );

          const prevStore = this.__currRoute.store;
          if( prevStore && prevStore.removeListener ) {
            prevStore.removeListener( events.MODEL_UPDATED, this.modelChanged.bind(this,prevStore) );
          }

          this.__currRoute = {
            component: handler.component,
            store
          };

          store.on && store.on( events.MODEL_UPDATED, this.modelChanged.bind(this,store) );

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
    if( this.routes === null && env.routes) {
      this.addRoutes( env.routes, env.rewriteRules );
    }
  }
}
    
module.exports = new Router();

