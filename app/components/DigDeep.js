import React         from 'react';
import TagStore      from '../stores/tags';
import { TagString } from '../unicorns';
import Glyph         from './Glyph'; 
import Paging        from './Paging'; 
import Tags          from './Tags';
import DigRemixes    from './DigRemixes';

import {  QueryParamTagsRotate  } from '../mixins';

const TagCategoryRow = React.createClass({

  render: function() {
    var catNames   = Object.keys(this.props.model);
    var categories = this.props.model;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm">
        </div>{catNames.map( n => <Tags.TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}</div>
      );
  },
  
});


const SelectedTagRow = React.createClass({

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
        <div className="row">
          <div className="col-md-8 col-md-offset-2 tags editable">
            <Tags.SelectedTags {...this.state}/>
          </div>   
          <div className="col-md-2 whaaaaaat">
          </div>
        </div>
      );
  },

});

const TagsLoading = React.createClass({

  render: function() {
    return(
      <h4 className="center-text">{"Loading Tags "}<Glyph icon="spinner" pulse /></h4>
      );
  }
});

const RemixTagSelectionSection = React.createClass({

  getInitialState: function() {
    return { loading: true,
             model: {},
            };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      this.props.store.remixCategories().then( cats => {
        this.setState( {
          model: cats,
          loading: false });
      });
    }
  },

  componentDidUpdate: function() {
    this.props.playlist.emit('componentUpdate');
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model    = this.state.model;
    var store    = this.props.store;
    var playlist = this.props.playlist;

    return (
        <div className="page-header">
          <div className="container">
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <TagCategoryRow store={store} model={model} />
                    <SelectedTagRow store={store} playlist={playlist} />
                  </div>
            }
          </div>
        </div>
      );
  }
});


function makeRegexFromTags(tags) {
  var arr = TagString.toArray(tags);
  var str = '^(' + arr.join('|') + ')$';
  return new RegExp(str);
}

var DigDeep = React.createClass({

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
      <div>
        <RemixTagSelectionSection store={tagStore} playlist={store} />
        <Paging store={store} ref="paging"/>
        <DigRemixes store={store} />   
        <Tags.NoTagHits store={store}  />     
      </div>
    );
  }

});

module.exports = DigDeep;

