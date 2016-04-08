import React              from 'react';

import ApplyOutletGutter  from './ApplyOutletGutter';
import Remix              from './Remix';
import css                from './Style.js';

import { RemixContainer } from '../Remixes';

import InlineCSS        from '../InlineCSS';
import Paging           from '../Paging';

import { ModelTracker } from '../../mixins';
import { TagString }    from '../../unicorns';

const REMIX_FILTER    = /^(editorial_pick|remix|sample|acappella)$/;

var RemixTreeTabs = React.createClass({

  mixins: [ModelTracker],

  stateFromStore: function(store) {
    var tags   = store.model.queryParams.reqtags;
    var tag    = (new TagString(tags)).filter(REMIX_FILTER).toString();
    return { tag };
  },

  onFilter: function(filter) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.applyFilter(filter);
    };
  },

  applyFilter: function(filter) {
    var qptags  = this.props.store.queryParams.reqtags;
    var reqtags = qptags.replace( this.state.tag, filter ).toString();
    this.props.store.refreshHard( { reqtags } );    
  },

  checkActive: function(filter) {
    return filter === this.state.tag ? 'active' : '';
  },

  render: function() {

    return (
      <ul className="nav nav-tabs remix-tree-tabs">
        <li className={this.checkActive('editorial_pick')} ><a href="#" onClick={this.onFilter('editorial_pick')}>{"ed picks"}</a></li>
        <li className={this.checkActive('remix')}><a href="#" onClick={this.onFilter('remix')}>{"remixes"}</a></li>
        <li className={this.checkActive('sample')}><a href="#" onClick={this.onFilter('sample')}>{"stems"}</a></li>
        <li className={this.checkActive('acappella')}><a href="#" onClick={this.onFilter('acappella')}>{"pells"}</a></li>
      </ul>
      );
  }
});

var RemixTreeOptionBar = React.createClass({

  render() {
    return(
      <div className="remix-option-bar">
        <ApplyOutletGutter />
        <Paging {...this.props} disableBumping />
        <RemixTreeTabs {...this.props} />
      </div>
      );
  }
});

function Remixes(props) {
  return (
    <div className="remix-page">
      <InlineCSS css={css.Remixes} id="remix-page"/>
      <InlineCSS css={css.Remix}   id="remix-line"/>
      <RemixTreeOptionBar {...props} />
      <RemixContainer {...props} remixLine={Remix} />
    </div>
  );
}

module.exports = Remixes;

//
