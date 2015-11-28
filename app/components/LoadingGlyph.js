import React       from 'react';
import Glyph       from './Glyph';
import ajaxAdapter from '../services/query-ajax-adapter';
import events      from '../models/events';

const LoadingGlyph = React.createClass({

  getInitialState: function() {
    return { loading: false };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.on( events.LOADING, this.onLoading );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.removeListener( events.LOADING, this.onLoading );
    }
  },

  onLoading: function(loading) {
    this.setState( { loading } ); 
  },

  render: function() {
    if( !this.state.loading ) {
      return null;
    }
    return( <Glyph icon="spinner" pulse /> );
  }  
});

module.exports = LoadingGlyph;