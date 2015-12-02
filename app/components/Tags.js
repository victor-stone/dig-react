import React         from 'react';
import Glyph         from './Glyph';
import { TagString } from '../unicorns';
import QueryOptions  from './QueryOptions';

import {  ModelTracker, 
          QueryParamTracker,
          SelectedTagsTracker   } from '../mixins';

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
    var tag      = this.props.model.id;
    var tags     = new TagString(this.props.store.model.queryParams.tags);

    this.props.store.applyTags( tags.toggle(tag,selected) );
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
          {tag.count
            ? <span className="light-color">{"("}{tag.count}{")"}</span>
            : null
          }
        </li>
      );
  }

});

const SelectableTagList = React.createClass({

  mixins: [SelectedTagsTracker],

  filterTagsByCat: function( tags ) {
    if( !this.cattags ) {
      this.cattags = new TagString(this.props.model.map( t => t.id ));
    }
    return this.cattags.intersection(tags);
  },

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
          <SelectableTagList model={tags} 
                             key={catID} 
                             catID={catID} 
                             store={store} 
          />
      </div>
    );
  }

});

const SelectedTag = React.createClass({

  remove: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var tags = new TagString(this.props.store.queryParams.tags);
    this.props.store.applyTags( tags.remove(this.props.name) );
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
    this.props.store.applyTags( '' );
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
          {matchAnyOK ? <MatchAllButton store={store} /> : null}
      </div>
      );
  },

});

const MatchAllButton = React.createClass({

  mixins: [QueryParamTracker],

  stateFromParams: function(queryParams) {
    return { toggle: queryParams.type === 'all' };
  },

  performQuery: function() {
    // yes, we reverse it here
    var type = this.state.toggle ? 'any' : 'all';
    this.props.store.applyHardParams( { type } );
  },

  render: function() {
    return (  <label className="btn btn-primary btn-xs">
                <input onChange={this.performQuery} 
                       checked={this.state.toggle} 
                       type="checkbox"
                />
                {" match all"}
              </label>
            );
  },
});

const NoTagHits = React.createClass({

  mixins: [ModelTracker],

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
                    {"You've selected a search for music that matches "}<strong>{"all"}</strong>{" the tags. "}
                    {"Try a search for "}<strong>{"any"}</strong>{" combination of tags by unchecking the 'all' button."}
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

module.exports = {
  SelectableTag,
  SelectableTagList,
  SelectedTag,
  SelectedTags,
  TagCategoryBox,
  NoTagHits,
  MatchAllButton,
};