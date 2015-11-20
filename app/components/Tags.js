import React  from 'react';
import Glyph  from './Glyph';

import {  PlaylistUpdater, 
          SelectedTagsTracker,
          QueryParamToggle       } from '../mixins';

const DEFAULT_COL_SIZE = 3;

const SelectableTag = React.createClass({

  getInitialState: function() {
    return { selected: this.props.selected };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { selected: props.selected } );
  },

  onClick: function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    var selected = !this.state.selected;
    var catID    = this.props.catID;
    var tag      = this.props.model.id;

    this.props.store.toggleSelected(tag, selected, catID);
  },

  render: function() {
    var tag = this.props.model;
    var icon = this.state.selected ? 'check-square-o' : 'square-o';

    return (
        <li onClick={this.onClick}>
          <Glyph icon={icon} />
          {" "}
          {tag.id} 
          {" "}
          <span className="light-color">{"("}{tag.count}{")"}</span>
        </li>
      );
  }

});

const SelectableTagList = React.createClass({

  mixins: [SelectedTagsTracker],

  render: function() {
    var tags    = this.props.model;
    var store   = this.props.store;
    var selTags = this.state.selectedTags;
    var catID   = this.props.catID;

    return (
      <ul className="tags-list">{tags.map( tag => 
          <SelectableTag  key={tag.id} 
                          catID={catID} 
                          selected={selTags.containsOne(tag.id)} 
                          model={tag} 
                          store={store} 
          />
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
        <a href="#" onClick={this.remove} className="btn-exp btn-tag">
          <Glyph x2 icon="times-circle" />
          {" "}
          <span>{this.props.name}</span>
        </a>
      );                                         
  },

});

const SelectedTags = React.createClass({

  mixins: [SelectedTagsTracker],

  clear: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.store.clearSelected();
  },

  render: function() {
    var tags       = this.state.selectedTags;
    var store      = this.props.store;
    var matchAnyOK = tags.getLength() > 1;

    return( 
        <div>{tags.toArray().map( (t,i) => <SelectedTag key={i} name={t} store={store} /> )}
          {tags.getLength()
             ? <a  href="#" onClick={this.clear} className="btn btn-xs btn-danger">
                <Glyph icon="trash" />{" clear"}</a>
              : null
          }
          {' '}
          {matchAnyOK ? <MatchAnyButton store={this.props.playlist} /> : null}
      </div>
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
    return (  <label className="btn btn-primary btn-xs">
                <input onChange={this.performQuery} 
                       checked={this.state.toggle} 
                       type="checkbox"
                />
                {" match any"}
              </label>
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