import React            from 'react';
import Glyph            from './Glyph';
import serviceLookup    from '../services';

import { PlaylistUpdater,
         BoundingElement,
         StoreEvents,
         QueryParamValue } from '../mixins';

import { pagingStats, oassign } from '../unicorns';

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
      queryParams.offset = this.userOffset || 0;
      this.userOffset = 0;
    },
});

const Paging = React.createClass({

  mixins: [BoundingElement,PlaylistUpdater,OffsetParamValue,StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      storeEvent: 'componentUpdate'
    };
  },

  queryParam: {
    name: 'offset',
    clean: true,
    initValue: 0,
    avoidInitConflict: true
  },

  onComponentUpdate: function() {
    this.handleResize();
  },

  stateFromStore: function(store) {
    var model = store.model;
    return {
        offset: model.queryParams.offset,
        limit:  model.queryParams.limit,
        length: model.playlist.length,
        total:  model.total      
    };
  },

  userOffset: 0,

  onNewOffset: function(offset) {

    this.userOffset = offset;
    this.performQuery(offset);

    var router = serviceLookup('router');
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


