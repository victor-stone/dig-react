'use strict';

var React       = require('react');
var ReactDOM    = require('react-dom');
var ReactRouter = require('react-router');

var Router     = ReactRouter.Router;
var Route      = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

const createBrowserHistory = require('history/lib/createBrowserHistory');

var Header = require('./components/Header');

const App = React.createClass({
  render: function() {
    return (
      <div id="App">
        <Header />
        <div id="outlet">
          {this.props.children}
        </div>
      </div>
    );
  },
});

const RouterMap = (
  <Router history={createBrowserHistory()}>
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

ReactDOM.render( RouterMap,  document.getElementById('content') );

