import React            from 'react';
import Glyph            from './Glyph';
import PlaylistUpdater  from '../mixins/playlist-updater';
import BoundingMixin    from '../mixins/bounding-element';
import QueryParamValue  from '../mixins/query-param-value';

import { pagingStats, oassign } from '../unicorns';

var router = null;

const PagerLink = React.createClass({

  getInitialState: function() {
    var href = this.props.show ? '?offset=' + this.props.offset : '#';
    return { href };
  },

  componentWillReceiveProps: function(newProps) {
    var href = newProps.show ? '?offset=' + newProps.offset : '#';
    this.setState( { href } );
  },


  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    // it seems this link happens
    // on phones even when disabled

    if( this.state.href !== '#') {
      this.props.newOffset(this.props.offset);
    }
  },

  render: function() {
    var icon = this.props.icon;
    var cls  = this.props.show ? '' : 'disabled';
    var href = this.state.href;

    return (<li className={cls}>
              <a href={href} onClick={this.onClick}><Glyph x2 icon={icon} /></a>
            </li>);
  },

});


var OffsetParamValue = oassign( {}, QueryParamValue, {

    getParamValue: function(queryParams) {
      // 'get' only happens when the query changes
      // so we always want an offset of 0
      // (unless it's us deliberately setting
      // the offet b/c the user is paging)
      //
      queryParams.offset = this.settingOffset || 0;
      this.settingOffset = 0;
    },
});

const Paging = React.createClass({

  mixins: [BoundingMixin,PlaylistUpdater,OffsetParamValue],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header'
    };
  },

  paramName:         'offset',
  defaultParamValue: 0,
  paramIsClean:      true,

  stateFromStore: function(store) {
    var model = store.model;
    return {
        /*offset: model.queryParams.offset, */ 
        limit:  model.queryParams.limit,
        length: model.playlist.length,
        total:  model.total      
    };
  },

  settingOffset: 0,

  onNewOffset: function(offset) {

    this.settingOffset = offset;
    this.performQuery(offset);

    if( !router ) {
      router = require('../services/router');
    }
    router.setBrowserAddressBar('?offset='+offset);
  },
  
  render: function() {
    var s = pagingStats(this.state);
    var cls = 'paging' + (s.shouldShow ? '' : ' hidden');
    
    return(
      <div className={cls}>
        <ul className="pagination">  
          <PagerLink newOffset={this.onNewOffset} offset="0"            show={s.showFirst} icon="angle-double-left" />
          <PagerLink newOffset={this.onNewOffset} offset={s.prevValue}  show={s.showPrev}  icon="arrow-left" />
          <PagerLink newOffset={this.onNewOffset} offset={s.nextValue}  show={s.showNext}  icon="arrow-right" />
          <PagerLink newOffset={this.onNewOffset} offset={s.lastPage}   show={s.showLast}  icon="angle-double-right" />
        </ul>
        <div className="center-text">{s.printableOffset + ' - ' + s.printableLastValue + ' of ' + s.printableTotal}</div>
      </div>
      );
  },

});

module.exports = Paging;


