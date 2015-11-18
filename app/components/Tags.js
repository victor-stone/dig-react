import React  from 'react';
import Glyph  from './Glyph';
import {  PlaylistUpdater, 
          QueryParamToggle       } from '../mixins';
import { TagString } from '../unicorns';


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
    if( this.props.catID ) {
      this.props.store.on('selectedCatTags', this.onSelectedTags );
    } else {
      this.props.store.on('selectedTags', this.onSelectedTags );
    }
  },

  componentWillUnmount: function() {
    if( this.props.catID ) {
      this.props.store.removeListener('selectedCatTags', this.onSelectedTags );
    } else {
      this.props.store.removeListener('selectedTags', this.onSelectedTags );
    }
  },

  onSelectedTags: function(tagString, cat) {
    if( !this.props.catID || cat === this.props.catID ) {
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

module.exports = {
  SelectableTag,
  SelectableTagList,
  SelectedTag,
  SelectedTags,
  TagCategoryBox,
  MatchAnyButton,
};