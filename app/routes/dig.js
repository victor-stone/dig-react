/* globals $ */
  
import React        from 'react';
import { oassign }  from '../unicorns';
import TagString    from '../unicorns/tagString';
import qc           from '../models/queryConfigs';
import { Glyph, 
         Paging, 
         Playlist } from '../components';

import PlaylistStore  from '../stores/playlist';
import TagStore       from '../stores/tags';

const SelectableTag = React.createClass({

  getInitialState: function() {
    return { selected: this.props.selected };
  },

  componentWillReceiveProps: function(props) {
    this.setState( { selected: props.selected } );
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.selected != nextProps.selected ||
           this.selected != nextState.selected;
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
    if( cat == this.props.catID ) {
      setTimeout( () => {
        this.setState( { selectedTags: tagString } );
      }, 50 );      
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
    var colSize = this.props.colSize || 3;
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

const SelectedTags = React.createClass({

  /*
    props:
      store: tagStore

    state: 
      selectedTags: [],
  */
  getInitialState: function() {
    return { 
      selectedTags: [],
      matchAny: false
    };
  },

  componentWillMount: function() {
    this.props.store.on('selectedTags', this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('selectedTags', this.onSelectedTags );
  },

  onSelectedTags: function(t) {
    setTimeout( () => this.setState( {selectedTags: t.toArray()} ),
                500 );
  },

  clear: function(/*e*/) {
    this.props.store.clearSelected();
  },

  onMatchAny: function() {
    this.props.onMatchAny( $(this.refs['matchAny']).is(':checked') );
    this.setState( { matchAny: !this.state.matchAny });
  },

  render: function() {
    var tags       = this.state.selectedTags;
    var store      = this.props.store;
    var matchAnyOK = tags.length > 1;

    return( 
        <div>{tags.map( (t,i) => <SelectedTag key={i} name={t} store={store} /> )
          }{tags.length 
             ? <a  href="#" onClick={this.clear} className="btn btn-xs btn-danger">
                <Glyph icon="trash" />{" clear"}</a>
              : null
          }
          {" "}
          {matchAnyOK 
            ? <label className="btn btn-primary btn-xs"><input onChange={this.onMatchAny} checked={this.state.matchAny} type="checkbox" ref="matchAny" />{" match any"}</label>
            : null 
        }</div>
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
      var store = this.props.store;
      var names = store.remixCategoryNames();
      store.remixCategories().then( cats => {
        // throw this back on the window thread
         setTimeout( () =>
          this.setState( {
            categories: cats,
            categoryNames: names,
            loading: false
          }), 50 );
      });
    }
  },

  render: function() {

    if( global.IS_SERVER_REQUEST ) {
      return null;
    }

    var model = {
      categories:    this.state.categories,
      categoryNames: this.state.categoryNames
    };
    var store = this.props.store;

    return (
        <div className="page-header">
          <div className="container">
            {
              this.state.loading 
                ? <TagsLoading />
                : <div>
                    <TagCategoryRow store={store} model={model} />
                    <SelectedTagRow store={store} onMatchAny={this.props.onMatchAny} />
                  </div>
            }
          </div>
        </div>
      );
  }
});

const dig = React.createClass({

  componentWillMount: function() {
    this._myStore = this.props.store;
    var tagStore = new TagStore();    
    tagStore.on('selectedTags', this.onSelectedTags );
    this.setState({ tagStore });
  },

  componentWillUnmount: function() {
    this.state.tagStore.removeListener('selectedTags', this.onSelectedTags );
  },

  _myStore: null,

  onSelectedTags: function(t) {
    this._myStore.applyParams( 
        {
          tags: t.toString(),
          offset: 0
        } );
  },

  onMatchAny: function(val) {
    this._myStore.applyParams( 
        { type: val ? 'any' : 'all',
          offset: 0 // do I need do this?
         });
  },

  render() {

    var store    = this._myStore;
    var tagStore = this.state.tagStore;

    return (
      <div>
        <RemixTagSelectionSection store={tagStore} onMatchAny={this.onMatchAny}/>
        <Paging store={store} />
        <Playlist store={store} />        
      </div>
    );
  }

});

dig.store = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, queryParams );
  return PlaylistStore.queryAndReturnStore(qparams);
};

module.exports = dig;

