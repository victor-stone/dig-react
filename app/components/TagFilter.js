import React                   from 'react';
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

function TagFilter(props) {
  var store = props.store;
  return (
    <div className="tag-filter">
      <SelectedTagSection store={store} />
      <TagsList store={store} />
    </div>
  );
}

module.exports = TagFilter;

//