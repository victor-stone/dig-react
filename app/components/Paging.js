import React from 'react';
import Glyph from './Glyph';

import pagingStats from '../unicorns/pagingStats';

var router = null;

const PagerLink = React.createClass({

  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.newOffset(this.props.offset);

  },

  render: function() {
    var icon = this.props.icon;
    var cls  = this.props.show ? '' : 'disabled';
    var href = '?offset=' + this.props.offset;

    return (<li className={cls}>
              {this.props.show
                ? <a href={href} onClick={this.onClick}><Glyph x2 icon={icon} /></a>
                : <a href><Glyph x2 icon={icon} /></a>
              }
            </li>);
  },

});


const Paging = React.createClass({

  componentWillMount: function() {
    var store = this.props.store;
    var state = this.stateFromStore();
    store.on('playlist',this.onPlaylist);
    this.setState(state);
  },
  
  componentWillUnmount: function() {
    this.props.store.removeListener('playlist',this.onPlaylist);
  },

  stateFromStore: function() {
    var store = this.props.store;
    var model = store.model;
    return {
        offset: store.queryParams.offset,
        limit: store.queryParams.limit,
        length: model.playlist.length,
        total: model.total      
    };
  },

  onPlaylist: function() {
    var state  = this.stateFromStore();
    setTimeout( () => this.setState(state), 50 );
  },

  onNewOffset: function(offset) {
    // Trigger a new query()
    this.props.store.applyParams( { offset: offset } );
    // for now ...
    if( !router ) {
      router = require('../services/router');
    }
    router.setBrowserAddressBar('?offset='+offset);
  },
  
  render: function() {
    var s = pagingStats(this.state);
    
    if( !s.shouldShow ) {
      return null;
    }
    
    return(
      <div className="paging" data-keep-above=".footer" data-keep-below=".page-header">
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


