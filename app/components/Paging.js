import React            from 'react';
import Glyph            from './Glyph';
import events           from '../models/events';

import { ModelTracker,
         BoundingElement,
         StoreEvents } from '../mixins';

import { pagingStats } from '../unicorns';

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


const Paging = React.createClass({

  mixins: [BoundingElement,ModelTracker,StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      storeEvent: events.COMPONENT_UPDATE,
    };
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

  onNewOffset: function(offset) {
    this.props.store.paginate(offset);
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


