import React       from 'react';
import Glyph       from '../vanilla/Glyph';
import { AjaxTracker } from '../../mixins';

const LoadingGlyph = React.createClass({

  mixins: [AjaxTracker],

  render: function() {
    if( !this.state.ajax.loading ) {
      return null;
    }
    return( <Glyph {...this.props} icon="spinner" pulse /> );
  }  
});

module.exports = LoadingGlyph;