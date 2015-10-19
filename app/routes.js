'use strict';

import App from './app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';


var historyType = global.IS_SERVER_REQUEST 
  ? require('history/lib/createMemoryHistory') 
  : require('history/lib/createBrowserHistory');

const RouterMap = (
  <Router history={historyType()}>
    <Route path="/" component={App}>
      <IndexRoute            component={require('./routes/index')} />
      <Route path="licenses" component={require('./routes/licenses')} />
      <Route path="dig"      component={require('./routes/dig')} />
      <Route path="free"     component={require('./routes/free')} />
      <Route path="ccplus"   component={require('./routes/ccplus')} />
      <Route path="edpicks"  component={require('./routes/edpicks')} />
      <Route path="games"    component={require('./routes/games')} />
      <Route path="film"     component={require('./routes/film')} />
      <Route path="search"   component={require('./routes/search')} />
      <Route path="people/:userID"     component={require('./routes/people')} />
      <Route path="files/:userID/:uploadID"     component={require('./routes/upload')} />
{/* routes */}
    </Route>
  </Router>
);

module.exports = RouterMap;

if( !global.IS_SERVER_REQUEST ) {
  ReactDOM.render( RouterMap,  document.getElementById('content') );
}

