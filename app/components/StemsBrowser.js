import React            from 'react';
import TagStore         from '../stores/tags';
import { TagString }    from '../unicorns';
import StemsList        from './StemsList';
import Glyph            from './Glyph'; 
import Paging           from './Paging'; 
import Tags             from './Tags';
import SearchBox        from './SearchBox';
import ZIPContentViewer from './ZIPContentViewer';

//import QueryOptions from './QueryOptions';

import { QueryParamTagsRotate } from '../mixins';

const SelectedTagSection = React.createClass({

  getInitialState: function() {
    return { store:    this.props.store, 
             playlist: this.props.playlist };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { store:    props.store, 
                     playlist: props.playlist });
  },

  render: function() {
    return (
        <div className="selected-tags">
          <Tags.SelectedTags {...this.state}/>
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

const StemsTagList = React.createClass({

  getInitialState: function() {
    return { loading: true };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.sampleCategories()
        .then( allTags => {
            this.setState( {
              model: allTags,
              filtered: allTags,
              loading: false });
          });
    }
  },

  filter: function(filter, isIcon, filterCB) {
    if( isIcon ) {
      filterCB('');
      filter = null;
    }
    if( !filter || filter.length === 0 ) {
      this.setState( { filtered: this.state.model } );
    } else {
      var filtered = [];
      var regex = new RegExp(filter);
      this.state.model.forEach( t => {
        if( t.id.match(regex) ) {
          filtered.push(t);
        }
      });
      this.setState( { filtered } );
    }
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = this.state.filtered;
    var store = this.props.store;

    return (
        <div>
            {
              this.state.loading 
                ? <TagsLoading />
                : <div className="stems-tags-widget">
                    <SearchBox icon="times" placeholder="find tag" submitSearch={this.filter} anyKey />
                    <Tags.SelectableTagList store={store} model={model} />
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
    var tagStore = this.props.tagStore || new TagStore();
    tagStore.on('selectedTags', this.onSelectedTags );
    this.setState({ tagStore });
  },

  componentWillReceiveProps: function(props) {
    this.setState({tagStore: props.tagStore});
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
      <div className="stems-browser">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
              <SelectedTagSection store={tagStore} playlist={store} />
          </div>
        </div>
        <div className="row">
          <div  className="col-md-3">
            <StemsTagList store={tagStore} />
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Paging store={store} ref="paging" disableBumping />
            <StemsList store={store} />   
          </div>
          <div className="col-md-2">
            <ZIPContentViewer store={store} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = StemsBrowser;

