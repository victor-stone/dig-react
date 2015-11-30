import React              from 'react';
import qc                 from '../../models/query-configs';
import Query              from '../../stores/query';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import { PellsListing,
         PellDetail }     from '../../components/PellsBrowser';
import { Link,
         Glyph,
         Paging }         from '../../components';

import { QueryParamTracker } from '../../mixins';

var PellsUserSearch = React.createClass({

  getInitialState: function() {
    return { users: [] };
  },

  componentWillMount: function() {
    this.doSearch(this.props.searchTerm);
  },

  componentWillReceiveProps( nextProps ) {
    this.doSearch( nextProps.searchTerm );
  },

  doSearch: function(text) {
    var query = new Query();
    query.searchUsers({
      limit: 6, uploadmin: 1, searchp: text
    }).then( users => this.setState({users}));
  },

  render: function() {

    var users = this.state.users;
    var cls   = 'user-search-results' + (users.length ? '' : ' hidden');

    return (
        <div className={cls}>
          {users.map( u => <Link key={u.id} href={'/people/' + u.id} ><Glyph icon="user"/> {u.name}</Link> )}
        </div>
      );
  }

});

var SearchHeader = React.createClass({

  mixins: [ QueryParamTracker ],

  stateFromParams: function(queryParams) {
    return { searchTerm: queryParams.searchp };
  },

  render: function() {
    var searchTerm = this.state.searchTerm;

    return (
      <div className="page-header center-text">
        <div>
          <h2>
            <small>
              <Glyph icon="search" />
              {" search "}
            </small>
            {searchTerm}
          </h2>
          <PellsUserSearch searchTerm={searchTerm} />
        </div>
      </div>
    );
  }
});



function SearchResults(props) {
  var store = props.store;
  return (
    <div className="container pells-page">
      <div className="row">
        <div className="col-md-2 pell-paging">
          <Paging store={store} disableBumping />
        </div>
        <div className="col-md-7 pell-browser">
          <div className="tab-content">
            <PellsListing store={store} />
          </div>
        </div>
        <div className="col-md-3">
          <PellDetail store={store} />
        </div>
      </div>
    </div>
  );      
}

function search(props) {
  return (<div><SearchHeader {...props} /><SearchResults {...props} /></div>);
}

search.title = 'Search';

search.store = function(params,queryParams) {
  
  var opts     = mergeParams( {}, qc.pells );
  var qparams  = mergeParams( {}, opts, queryParams );

  return Acappellas.storeFromQuery(qparams, opts);
};

module.exports = search;

