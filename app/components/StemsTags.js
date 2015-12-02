import React            from 'react';
import Glyph            from './Glyph'; 
import Tags             from './Tags';
import SearchBox        from './SearchBox';
import { TagString }    from '../unicorns';
import events           from '../models/events';

import { StoreEvents,
         TopSideElement,
         BoundingElement,
         SelectedTagTracker }  from '../mixins';

const MIN_TAG_COUNT = 20;

const SelectedTagSection = React.createClass({

  mixins: [ TopSideElement ],

  render: function() {
    return (
        <div className="selected-tags">
          <Tags.SelectedTags {...this.props}/>
        </div>
      );
  }

});

function TagsLoading() {
  return(
    <div className="tags-loading center-text">
      {"Loading Tags "}
      <Glyph icon="spinner" pulse />
    </div>
  );
}

const StemsTagList = React.createClass({

  mixins: [ StoreEvents, SelectedTagTracker, BoundingElement ],

  getDefaultProps: function() {
    return { 
        keepAbove: '.footer',
        keepBelow: '.stems-tags-bumper',
        storeEvent: events.MODEL_UPDATED 
      };
  },
  
  getInitialState: function() {
    return { tab: 'all', related: [], tags: [], loading: true };
  },

  componentWillMount: function() {
    this.getModel();
  },

  onModelUpdated: function() {
    this.getModel();
  },

  getModel: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.getAllTags();
    }
  },

  getAllTags: function() {
    if( this.allTags ) {
      this.setState( { related: this.getRelatedTags(),
                       loading: false } );
    } else {
      this.props.store.tags.sampleCategories()
        .then( allTags => {
            this.allTags = allTags;
            this.setState( {
              tags: allTags,
              related: this.getRelatedTags(),
              loading: false });
          });    
    }
  },

  getRelatedTags: function() {
    var store = this.props.store;
    if( !!store.model.queryParams.tags && store.model.total ) {
      var uploadtags = new TagString();
      store.model.playlist.forEach( u => uploadtags.add(u.userTags) );
      var allTags = this.allTags.filter( t => t.count >= MIN_TAG_COUNT )
                                .map( t => t.id );
      var tags = uploadtags
                  .intersection( allTags )
                  .remove( this.props.store.model.queryParams.tags )
                  .sort()
                  .map( t => { return { id: t }; } );
      return tags;
    } 
    return [];
  },

  filter: function(filter, isIcon, filterCB) {
    if( isIcon ) {
      filterCB('');
      this.setState( { filtered: null } );
    } else if( filter && filter.length > 0 ) {
      var tags = this._currentTags();
      var filtered = tags.filter( t => t.id.includes(filter) );
      this.setState( { filtered } );
    } else {
      this.setState( { filtered: null } );
    }
  },

  checkActive: function(tab) {
    return tab === this.state.tab ? 'active' : '';
  },

  onTab: function(tab) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.setState( { tab, loading: true }, () => this.getModel() );
    };
  },

  _currentTags: function() {
    return this.state.tab === 'related' ? this.state.related : this.state.tags;
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var tags       = this.state.filtered || this._currentTags();
    var numRelated = this.state.related.length;

    return (
        <div className="stems-tags-widget">
          <ul className="nav nav-tabs">
            <li className={this.checkActive('all')} ><a href="#" onClick={this.onTab('all')}>{"all tags"}</a></li>
            <li className={this.checkActive('related')} ><a href="#" onClick={this.onTab('related')}>{"related "}<span className="badge">{numRelated}</span></a></li>
          </ul>
            {
              this.state.loading 
                ? <TagsLoading />
                : <div className="tab-content">
                    <SearchBox icon="times" placeholder="find tag" submitSearch={this.filter} anyKey />
                    <Tags.SelectableTagList className={this.state.tab} store={this.props.store} model={tags} />
                  </div>
            }
        </div>
      );
  }
});

module.exports = {
  SelectedTagSection,
  TagsLoading,
  StemsTagList
};

