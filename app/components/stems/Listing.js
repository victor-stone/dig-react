import React            from 'react';
import People           from '../People';
import Files            from './Files';
import Detail           from './Detail';
import { NoTagHits }    from '../Tags';
import { TagString,
         browserScripts }       from '../../unicorns';
import { ModelTracker,
         SelectedTagsTracker  } from '../../mixins';
import { CloseButton }          from '../ActionButtons';

const SCROLL_OFFSET = 100;

const Listing = React.createClass({

  mixins: [ ModelTracker, SelectedTagsTracker ],

  getDefaultProps: function() {
    return { skipUser: false,
             noHitsComp: NoTagHits };
  },
 
  stateFromStore(store) {
    var model       = store.model;
    var queryParams = model.queryParams;
    var expanded    = 0;
    var searchTerms = null;
    if( queryParams.searchp ) {
      searchTerms = new TagString(queryParams.searchp.replace(/\s/g,','));
    }

    return { model, expanded, searchTerms };
  },

  /* globals $ */
  onNameClick(id) {
    var _this = this;

    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      if( _this.state.expanded ) {
        var $e = $('#upload-detail-' + _this.state.expanded );
        if( _this.state.expanded === id ) {
          if ($e.is(':hidden')) {
            $e.slideDown('slow', function() { 
              browserScripts.scrollIntoView($e, SCROLL_OFFSET); 
            } );
          } else {
            $e.slideUp('fast');
          }
          return;
        } else {
          $e.slideUp('fast', function() {
            _this.setState( { expanded: id } );
          });
          return;
        }
      }
      _this.setState( { expanded: id } );
    };
  },

  onClose: function() {
    var qp = this.state.model.queryParams;
    delete qp['ids'];
    this.props.store.refreshModel(qp);
  },

  render: function() {
    var store = this.props.store;
    var model = this.state.model;

    if( !model || !model.total ) {
      if( this.props.noHitsComp ) {
        return (React.createElement(this.props.noHitsComp, { store }));
      }
      return (<h2>{"didn't catch that"}</h2>);
    }
    
    var fo = this.props.filesOnly;
    var nn = fo || this.props.namesOnly;
    var fl = !!model.queryParams.ids;

    var tags    = this.state.selectedTags;
    var searchp = this.state.searchTerms;

    return (
        <ul className="stems-listing">
          {model.items.map( (u,i) => {
            return (<li key={i}>
                      {fl ? <CloseButton className="close" onClick={this.onClose} /> : null}
                      {u.bpm ? <span className="bpm">{u.bpm}</span> : null}
                      {fo ? null : <a href="#" className="stem-name" onClick={this.onNameClick(u.id)}>{u.name}</a>}
                      {nn ? null : <People.Link model={u.artist} className="stem-artist" />}
                      <Files 
                        model={u} 
                        store={store} 
                        tags={tags} 
                        searchTerms={searchp} 
                      />
                      {fl || this.state.expanded === u.id
                        ? <Detail model={u} store={store} />
                        : null
                      }
                  </li>); })
          }
        </ul>
      );
    }
});

module.exports = Listing;
