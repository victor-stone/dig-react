import React     from 'react';
import Glyph     from './Glyph';
import { service as 
           ajaxAdapter } from '../services/query-ajax-adapter';

const LoadingGlyph = React.createClass({

  getInitialState: function() {
    return { loading: false };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.on( 'loading', this.onLoading );
    }
  },

  componentWillUnmount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      ajaxAdapter.removeListener( 'loading', this.onLoading );
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