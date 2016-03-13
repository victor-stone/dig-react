import React            from 'react';
import Glyph            from './Glyph';
import events           from '../models/events';

import { ModelTracker,
         QueryParamTracker,
         BoundingElement,
         StoreEvents } from '../mixins';

import { pagingStats } from '../unicorns';

const MIN_LIMIT = 10;

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

const LimitFilter = React.createClass({ 

  mixins: [QueryParamTracker],

  stateFromParams: function(queryParams) {
    return { limit: queryParams.limit };
  },

  performQuery: function() {
    var limit = this.refs['limit'].value;
    this.props.store.refreshHard( { limit } );
  },

  render: function() {
    var cls = 'limit-label ' + (this.props.className || '');
    var opts = [];
    //var limit = this.state.limit + '';
    [ '10', '20', '40' ].forEach( value => {
      opts.push( (<option key={value} value={value}>{value}</option>) );
    });

    return (
        <label className={cls}>{"display "}
          <select ref="limit" id="limit" value={this.state.limit} onChange={this.performQuery} >
            {opts}
          </select>
        </label>
      );    
  }

});

const Paging = React.createClass({

  mixins: [BoundingElement,ModelTracker,StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      disableAtWidth: 770,
      storeEvent: events.COMPONENT_UPDATE,
    };
  },

  onComponentUpdate: function() {
    this.recalcBoundries();
  },

  stateFromStore: function(store) {
    var model = store.model;
    return {
        offset: model.queryParams.offset,
        limit:  model.queryParams.limit,
        length: model.items.length,
        total:  model.total      
    };
  },

  onNewOffset: function(offset) {
    this.props.store.paginate(offset);
  },
  
  render: function() {
    var s    = pagingStats(this.state);
    var cls  = 'paging' + (s.total > 0 ? '' : ' hidden');
    var cls2 = 'pagination' + (s.shouldShow ? '' : ' hidden');
    var cls3 = s.total > MIN_LIMIT ? '' : 'hidden';
    return(
      <div className={cls}>
        <ul className={cls2}>  
          <PagerLink newOffset={this.onNewOffset} offset="0"            show={s.showFirst} icon="angle-double-left" />
          <PagerLink newOffset={this.onNewOffset} offset={s.prevValue}  show={s.showPrev}  icon="arrow-left" />
          <PagerLink newOffset={this.onNewOffset} offset={s.nextValue}  show={s.showNext}  icon="arrow-right" />
          <PagerLink newOffset={this.onNewOffset} offset={s.lastPage}   show={s.showLast}  icon="angle-double-right" />
        </ul>
        <div className="paging-caption center-text">{s.printableOffset + ' - ' + s.printableLastValue + ' of ' + s.printableTotal}</div>
        <LimitFilter store={this.props.store} className={cls3} />
      </div>
      );
  },

});

module.exports = Paging;


