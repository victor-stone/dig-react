
import RouteRecognizer from 'route-recognizer';

import routes from '../routes';
import util from 'util';
import { EventEmitter } from 'events';

// temp
import rsvp from 'rsvp';

var Router = function()
{
  EventEmitter.call(this);
  
  this.recognizer = new RouteRecognizer();

  if( typeof window !== 'undefined' ) {
    window.onpopstate = this.updateUrl.bind(this);
  }

  // baby steps: nothing nested for now

  for( var handler in routes ) {
    var component = routes[handler];
    var path = component.path || ('/' + handler);
    // temp code:
    if( !component.model ) {
      component.model = function() { return rsvp.resolve({}); }
    }
    this.recognizer.add( [ { path, handler } ] );
  }
}

util.inherits(Router,EventEmitter);

Router.prototype.resolve = function(url) {
  var results = this.recognizer.recognize(url);
  if( results ) {
    var handlers = results.slice();
    var queryParams = results.queryParams || {};
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

Router.prototype.navigateTo = function(url) {
  if( url ) {
    window.history.pushState(null, null, url);
  }
  this.updateUrl()
}

Router.prototype.updateUrl = function() {
  var q = document.location.search || '';
  var handlers = this.resolve(document.location.pathname + q)
  if (!handlers ) {
    // ummmmm
    return window.alert('Not Found')
  }
  if( handlers.length > 1 ) {
    throw new Error("wups - don't do nested route handlers yet");
  }
  var handler = handlers[0];
  handler.component.model(handler.params, handler.queryParams)
    .then( model => {
        this.emit('navigateTo', {
          name: handler.component.displayName, 
          component: handler.component,
          model: model, 
          params: handler.params,
          queryParams: handler.queryParams } );
    });
}
    
module.exports = new Router();

