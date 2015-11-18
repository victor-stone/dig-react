import React         from 'react';
import TagStore      from '../stores/tags';

import { TagString } from '../unicorns';

import Glyph from './Glyph'; 
import Paging from './Paging'; 
import Tags from './Tags';
//import QueryOptions from './QueryOptions';
import Playlist from './Playlist';

import {  QueryParamTagsRotate  } from '../mixins';

const MIN_TAG_PAIR = 5;
const SORT_UP = 1;
const SORT_DOWN = -1;

const SelectedTagSection = React.createClass({

  render: function() {
    return (
        <div className="selected-tags">
          <Tags.SelectedTags {...this.props}/>
        </div>
      );
  },

});

const TagsLoading = React.createClass({

  render: function() {
    return(
      <div className="tags-loading center-text">{"Loading Tags "}<Glyph icon="spinner" pulse /></div>
      );
  }
});

const StemsTagSelectionSection = React.createClass({

  getInitialState: function() {
    return { loading: true };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var store = this.props.tagStore;
      store.categories( store.remixCategoryNames(), 'sample', MIN_TAG_PAIR )
        .then( cats => {
            var allTags = [];
            for( var k in cats ) {
              allTags = allTags.concat(cats[k]);
            }
            allTags.sort( function(a,b) { return a.id > b.id ? SORT_UP : SORT_DOWN; } );
            this.setState( {
              model: allTags,
              loading: false });
          });
    }
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = this.state.model;
    var store    = this.props.store;
    var tagStore = this.props.tagStore;

    return (
        <div>
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <SelectedTagSection store={store} tagStore={tagStore} />
                    <div className="tag-list-box">
                      <Tags.SelectableTagList store={tagStore} model={model} />                    
                    </div>
                  </div>
            }
        </div>
      );
  }
});


function makeRegexFromTags(tags) {
  var arr = TagString.toArray(tags);
  var str = '^(' + arr.join('|') + ')$';
  return new RegExp(str);
}

var StemsBrowser = React.createClass({

  mixins: [QueryParamTagsRotate],

  componentWillMount: function() {
    var tagStore = new TagStore();    
    tagStore.on('selectedTags', this.onSelectedTags );
    this.setState({ tagStore });
  },

  componentWillUnmount: function() {
    this.state.tagStore.removeListener('selectedTags', this.onSelectedTags );
  },

  queryParam: {
    name: 'tags',
    filter: /----/,
    clean: true,
  },
  
  onSelectedTags: function(tag) {
    this.queryParam.filter = this.previousTags ? makeRegexFromTags(this.previousTags) : /---/;
    this.setStateAndPerform( {tag} );
    this.previousTags = tag; // this allows removal next time around
    this.defaultTag = tag;   // this prevents a 'reset' from wiping us out
  },

  render() {

    var store    = this.props.store;
    var tagStore = this.state.tagStore;

    return (
      <div className="row stems-browser">
        <div  className="col-md-2">
          <StemsTagSelectionSection store={store} tagStore={tagStore} onUpdate={this.onTagSectionUpdate}/>
        </div>
        <div className="col-md-4">
          <Paging store={store} ref="paging" disableBumping />
          <Playlist store={store} />   
        </div>
      </div>
    );
  }

});

module.exports = StemsBrowser;

