'use strict';

/*
   users must implement:

    onQueryRequest: function(value) {
      // optionaly reply with: 
      this.respondWithState( { myparam: value } );
    }
*/
var QueryRequestHandler = {

  componentWillMount: function() {
    var name = this.requestName || this.paramName;
    this.props.store.on('query-request-' + name,this.onQueryRequest);
  },

  componentWillUnmount: function() {
    var name = this.requestName || this.paramName;
    this.props.store.removeListener('query-request-' + name,this.onQueryRequest);
  },

  respondWithState: function(state) {
    var store = this.props.store;
    this.setState( state, store.perform.bind(store) );
  }
};

module.exports = QueryRequestHandler;

