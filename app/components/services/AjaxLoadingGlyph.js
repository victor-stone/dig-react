import React       from 'react';
import { AjaxTracker } from '../../mixins';
import LoadingGlyph    from '../vanilla/LoadingGlyph';

const AjaxLoadingGlyph = React.createClass({

  mixins: [AjaxTracker],

  render: function() {
    return <LoadingGlyph {...this.props} loading={this.state.ajax.loading} />;
  }  
});

module.exports = AjaxLoadingGlyph;