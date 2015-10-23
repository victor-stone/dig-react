import React from 'react';
import Glyph from './Glyph';

import pagingStats from '../unicorns/pagingStats';

const Pager = React.createClass({

  onClick: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.store.applyParams( { offset: this.props.offset } );
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
    var props = this.props;
    var state = {
      offset: props.offset,
      length: props.length,
      limit:  props.limit,
      total: props.total
    };
    this.props.store.on('playlist',this.onPlaylist);
    this.setState(state);
  },
  
  componentWillUnmount: function() {
    this.props.store.removeListener('playlist',this.onPlaylist);
  },

  onPlaylist: function(promise) {
    promise.then( model => {
      var state  = {
        offset: model.queryParams.offset,
        limit: model.queryParams.limit,
        length: model.playlist.length,
        total: model.total
      };
      setTimeout( () => this.setState(state), 50 );
    });
  },

  render: function() {
    var s = pagingStats(this.state);
    
    if( !s.shouldShow ) {
      return null;
    }
    var store = this.props.store;

    return(
      <div className="paging" data-keep-above=".footer" data-keep-below=".page-header">
        <ul className="pagination">  
          <Pager store={store} offset="0"            show={s.showFirst} icon="angle-double-left" />
          <Pager store={store} offset={s.prevValue}  show={s.showPrev}  icon="arrow-left" />
          <Pager store={store} offset={s.nextValue}  show={s.showNext}  icon="arrow-right" />
          <Pager store={store} offset={s.lastPage}   show={s.showLast}  icon="angle-double-right" />
        </ul>
        <div className="center-text">{s.printableOffset + ' - ' + s.printableLastValue + ' of ' + s.printableTotal}</div>
      </div>
      );
  },

});

module.exports = Paging;


