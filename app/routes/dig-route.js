import React         from 'react';
import qc            from '../models/query-configs';
import PlaylistStore from '../stores/playlist';
import TagStore      from '../stores/tags';

import { mergeParams,
         TagString } from '../unicorns';

import { Glyph, 
         Paging, 
         QueryOptions,
         Playlist } from '../components';

import {  QueryParamTagsRotate,
          PlaylistUpdater, 
          QueryParamToggle       } from '../mixins';

const DEFAULT_COL_SIZE = 3;

const SelectableTag = React.createClass({

  getInitialState: function() {
    return { selected: this.props.selected };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { selected: props.selected } );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.selected !== nextProps.selected ||
           this.selected !== nextState.selected;
  },

  onClick: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var selected = !this.state.selected;
    var catID    = this.props.catID;
    this.props.store.toggleSelected(this.props.model.id, selected, catID);
  },

  render: function() {
    var tag = this.props.model;
    var icon = this.state.selected ? 'check-square-o' : 'square-o';

    return (
        <li onClick={this.onClick}><Glyph icon={icon} /> {tag.id} <span className="light-color">{"("}{tag.count}{")"}</span></li>
      );
  }

});


const SelectableTagList = React.createClass({

  getInitialState: function() {
    return { selectedTags: TagString() };
  },

  componentWillMount: function() {
    this.props.store.on('selectedCatTags', this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('selectedCatTags', this.onSelectedTags );
  },

  onSelectedTags: function(tagString, cat) {
    if( cat === this.props.catID ) {
      this.setState( { selectedTags: tagString } );
    }
  },

  render: function() {
    var tags    = this.props.model;
    var store   = this.props.store;
    var selTags = this.state.selectedTags;
    var catID   = this.props.catID;

    return (
      <ul className="tags-list">{tags.map( tag => 
          <SelectableTag key={tag.id} catID={catID} selected={selTags.contains(tag.id)} model={tag} store={store} />
      )}</ul>
    );
  }
});

var nameMap = {
  genre: 'Genres',
  instr: 'Instrument',
  mood: 'Style'
};

const TagCategoryBox = React.createClass({

  render: function() {
    var name    = nameMap[this.props.catID];
    var store   = this.props.store;
    var tags    = this.props.model;
    var catID   = this.props.catID;
    var colSize = this.props.colSize || DEFAULT_COL_SIZE;
    var cls     = 'col-sm-' + colSize;

    return(
      <div className={cls}>
          <h4 className="center-text">{name}</h4>
          <SelectableTagList model={tags} key={catID} catID={catID} store={store} />
      </div>
    );
  }

});


const TagCategoryRow = React.createClass({

  render: function() {
    var catNames   = this.props.model.categoryNames;
    var categories = this.props.model.categories;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm">
        </div>{catNames.map( n => <TagCategoryBox model={categories[n]} key={n} catID={n} store={store} /> )}</div>
      );
  },
  
});

const SelectedTag = React.createClass({

  remove: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.store.removeSelected(this.props.name);
  },

  render: function() {

    return (
        <a href="#" onClick={this.remove} className="btn-exp btn-tag"><Glyph x2 icon="times-circle" />{" "}<span>{this.props.name}</span></a>
      );                                         
  },

});

const MatchAnyButton = React.createClass({

  mixins: [QueryParamToggle,PlaylistUpdater],

  queryParam: {
    name:     'type',
    valueON:  'any',
    valueOFF: 'all',
    clean:    true,
    avoidInitConflict: true
  },

  stateFromStore: function(store) {
    var qp = store.model.queryParams;
    return { toggle: qp[this.queryParam.name] === this.queryParam.valueON };
  },

  render: function() {
    return (<label className="btn btn-primary btn-xs"><input onChange={this.performQuery} checked={this.state.toggle} type="checkbox" />{" match any"}</label>);
  },
});

const SelectedTags = React.createClass({

  getInitialState: function() {
    return { selectedTags: new TagString() };
  },

  componentWillMount: function() {
    var store = this.props.tagStore;
    store.on('selectedTags', this.onSelectedTags );
  },

  componentWillUnmount: function() {
    var store = this.props.tagStore;
    store.removeListener('selectedTags', this.onSelectedTags );
  },

  onSelectedTags: function(selectedTags) {
    this.setState( { selectedTags } );
  },

  clear: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var store = this.props.tagStore;
    store.clearSelected();
  },

  render: function() {
    var tags       = this.state.selectedTags;
    var store      = this.props.store;
    var tagStore   = this.props.tagStore;
    var matchAnyOK = tags.getLength() > 1;

    return( 
        <div>{tags.toArray().map( (t,i) => <SelectedTag key={i} name={t} store={tagStore} /> )}
          {tags.getLength()
             ? <a  href="#" onClick={this.clear} className="btn btn-xs btn-danger">
                <Glyph icon="trash" />{" clear"}</a>
              : null
          }
          {' '}
          {matchAnyOK ? <MatchAnyButton store={store} /> : null}
      </div>
      );
  },

});

const SelectedTagRow = React.createClass({

  render: function() {
    return (
        <div className="row">
          <div className="col-md-8 col-md-offset-2 tags editable">
            <SelectedTags {...this.props}/>
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
             categories: [],
             categoryNames: [] };
  },

  componentWillMount: function() {
    if( !global.IS_SERVER_REQUEST ) {
      var store = this.props.tagStore;
      var names = store.remixCategoryNames();
      store.remixCategories().then( cats => {
        this.setState( {
          categories: cats,
          categoryNames: names,
          loading: false });
      });
    }
  },

  componentDidUpdate: function() {
    this.props.onUpdate(this.state.loading);
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = {
      categories:    this.state.categories,
      categoryNames: this.state.categoryNames
    };
    var store    = this.props.store;
    var tagStore = this.props.tagStore;

    return (
        <div className="page-header">
          <div className="container">
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <TagCategoryRow store={tagStore} model={model} />
                    <SelectedTagRow store={store} tagStore={tagStore} />
                  </div>
            }
          </div>
        </div>
      );
  }
});

const NoTagHits = React.createClass({

  mixins: [PlaylistUpdater],

  stateFromStore: function(store) {
    var optionsDirty = store.paramsDirty();
    var showNoHits   = !store.model.total;
    var qp           = store.model.queryParams;
    var numTags      = (new TagString(qp.tags)).getLength();
    var showMatchAny = qp.type === 'all' && numTags > 1;
    return { optionsDirty, showNoHits, showMatchAny };
  },

  render: function() {
    if( !this.state.showNoHits ) {
      return null;
    }

    var store        = this.props.store;
    var optionsDirty = this.state.optionsDirty;
    var showMatchAny = this.state.showMatchAny;

    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3 no-hit-suggestion">
          <div className="jumbotron empty-query">
            <h3>{"wups, no matches for that combination of tags..."}</h3>
              <ul>
                <li>
                  {"Try removing tags by clicking on the tags marked "}<Glyph icon="times-circle" />
                </li>
                {showMatchAny
                  ?<li>
                    {"The default search is for music that matches "}<strong>{"all"}</strong>{" the tags. "}
                    {"Try a search for "}<strong>{"any"}</strong>{" combination of them."}
                  </li>
                  : null
                }
                {optionsDirty
                  ?<li>{"Try resetting your filters "}<QueryOptions.ResetOptionsButton store={store} /></li>
                  : null
                }
              </ul>
          </div>
        </div>
      </div>
      );
  },
});

function makeRegexFromTags(tags) {
  var arr = TagString.toArray(tags);
  var str = '^(' + arr.join('|') + ')$';
  return new RegExp(str);
}

var dig = React.createClass({

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

  onTagSectionUpdate: function(loading) {
    if( !loading ) {
      this.refs['paging'].handleResize();
    }
  },

  render() {

    var store    = this.props.store;
    var tagStore = this.state.tagStore;

    return (
      <div>
        <RemixTagSelectionSection store={store} tagStore={tagStore} onUpdate={this.onTagSectionUpdate}/>
        <Paging store={store} ref="paging"/>
        <Playlist store={store} />   
        <NoTagHits store={store} tagStore={tagStore} />     
      </div>
    );
  }

});

dig.title = 'Dig Deep';

dig.path  = '/dig';

dig.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.default, { type: 'all' }, queryParams );
  return PlaylistStore.storeFromQuery(qparams);
};

module.exports = dig;

