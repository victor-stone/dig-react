import React                   from 'react';
import Glyph                   from './Glyph';
import { SelectedTags,
         SelectableTagList }   from './Tags';
import { SelectedTagsTracker } from '../mixins';

const SelectedTagSection = React.createClass({

  mixins: [ SelectedTagsTracker ],

  render: function() {
    var hasTags = this.state.selectedTags.getLength() > 0;

    return (
        <div className="selected-tags" >
          {hasTags
            ? <SelectedTags {...this.props}  />
            : <div className="no-selected-tags">{"no tags selected"}</div>
          }
        </div>
      );
  }

});

const TagsList = React.createClass({

  mixins: [ SelectedTagsTracker ],

  getInitialState: function() {
    return { 
      tags: [], 
      loading: true 
    };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.tags.remixCategories()
        .then( tags => this.setState( { tags: tags.genre, loading: false }) );
    }
  },

  render: function() {
    return (
        <SelectableTagList store={this.props.store} model={this.state.tags} />
      );
  }
});

var TagFilter = React.createClass({

  getInitialState: function() {
    return { showTags: false };
  },

  toggleShowTags: function() {
    this.setState( { showTags: !this.state.showTags } );
  },

  render: function() {
    var store = this.props.store;
    var chevron = this.state.showTags ? 'chevron-down' : 'chevron-left';
    return (
      <div className="tag-filter">
        <button className="pull-right tags-chevron" onClick={this.toggleShowTags}><Glyph icon={chevron} /></button>
        <SelectedTagSection store={store} />
        {this.state.showTags
          ? <TagsList store={store} />
          : null
        }        
      </div>
    );
  }
});

module.exports = TagFilter;

//