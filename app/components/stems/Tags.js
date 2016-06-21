/* globals $ */
import React            from 'react';
import Glyph            from '../vanilla/Glyph'; 
import Tags             from '../Tags';
import SearchBox        from '../SearchBox';
import { TagString }    from '../../unicorns';
import events           from '../../models/events';

import { StoreEvents,
         SelectedTagsTracker }  from '../../mixins';

const MIN_TAG_COUNT = 20;
const FADE_IN_DELAY = 1800;
const FADE_IN_SPEED = 1000;

const SELECTED_TAG_HEIGHT = 50;

const SelectedTagSection = React.createClass({

  mixins: [ SelectedTagsTracker ],

  componentDidMount() {
    this.doFadeAnimation();
  },

  componentDidUpdate() {
    this.doFadeAnimation();
  },

  doFadeAnimation() {
    if( !global.IS_SERVER_REQUEST ) {
      var hasTags = this.state.selectedTags.length > 0;
      if( !hasTags ) {
        setTimeout( function() {
          $('.no-selected-tags').fadeIn( FADE_IN_SPEED );
        }, FADE_IN_DELAY );
      }
    }
  },

  render() {
    var hasTags = this.state.selectedTags.length > 0;
    var style   = { display: 'none' };

    return (
        <div className="selected-tags" >
          {hasTags
            ? <Tags.SelectedTags {...this.props}  />
            : <div className="no-selected-tags" style={style}><Glyph icon="check-square-o" />{" select tags to get started"}</div>
          }
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

const TagsList = React.createClass({

  mixins: [ StoreEvents, SelectedTagsTracker ],

  getDefaultProps() {
    return { 
        topMargin: SELECTED_TAG_HEIGHT,
        keepAbove: '.footer',
        storeEvent: events.MODEL_UPDATED 
      };
  },
  
  getInitialState() {
    return { 
      tab: 'all', 
      related: [], 
      filtered: [], 
      tags: [], 
      loading: true 
    };
  },

  componentWillMount() {
    this.getModel();
  },

  onModelUpdated() {
    this.getModel();
  },

  getModel() {
    if( !global.IS_SERVER_REQUEST ) {
      this.getAllTags();
    }
  },

  getAllTags() {
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

  getRelatedTags() {
    var store    = this.props.store;
    var seltags  = (store.model.queryParams.tags || '').toString();
    if( seltags.length > 0 && store.model.total ) {
      var uploadtags = new TagString();
      store.model.items.forEach( u => uploadtags.add(u.userTags) );
      var allTags = this.allTags.filter( t => t.count >= MIN_TAG_COUNT )
                                .map( t => t.id );
      var tags = uploadtags
                  .intersection( allTags )
                  .remove( seltags )
                  .sort()
                  .map( t => { return { id: t }; } );
      return tags;
    } 
    return [];
  },

  filter(filter, isIcon, filterCB) {
    if( isIcon ) {
      filterCB('');
      this.setState( { filtered: [] } );
    } else if( filter && filter.length > 0 ) {
      var tags = this._currentTags();
      var filtered = tags.filter( t => t.id.includes(filter) );
      this.setState( { filtered } );
    } else {
      this.setState( { filtered: [] } );
    }
  },

  checkActive(tab) {
    return tab === this.state.tab ? 'active' : '';
  },

  onTab(tab) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.setState( { tab, filtered: [] } );
    };
  },

  _currentTags() {
    return this.state.tab === 'related' ? this.state.related : this.state.tags;
  },

  render() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var filtered   = this.state.filtered;
    var tags       = filtered.length ? filtered : this._currentTags();
    var numRelated = this.state.related.length;

    return (
        <div className="stems-tags-widget hidden-xs hidden-sm">
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
  TagsList
};

