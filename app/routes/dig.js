/* globals $ */
import React        from 'react';
import { oassign }  from '../unicorns/goodies';
import qc           from '../models/queryConfigs';
import { Glyph, 
         Paging, 
         Playlist } from '../components';

import PlaylistStore  from '../stores/playlist';
import TagStore       from '../stores/tags';

const SelecctableTag = React.createClass({

  /* 
    props: 
      model: Tag (Model)
      store: tagStore

    state: 
      selected: bool
  */

  getInitialState: function() {
    var selected = this.props.clear === false ? false : this.props.selected;    
    return { selected };
  },

  onClick: function() {
    var selected = !this.state.selected;
    this.setState( { selected: selected });
    this.props.store.toggleSelected(this.props.model.id, selected);
  },

  render: function() {
    var tag = this.props.model;
    var icon = this.state.selected ? 'check-square-o' : 'square-o';

    return (
        <li onClick={this.onClick}><Glyph icon={icon} /> {tag.name} <span className="light-color">{"("}{tag.count}{")"}</span></li>
      );
  }

});


const SelectableTagList = React.createClass({

  /*
    props: 
      catId: str
      model: TagModels[]
      store: tagStore
  */
  render: function() {
    var catId  = this.props.catId;
    var id     = catId + '_tags';
    var tags   = this.props.model;
    var store  = this.props.store;
    var clear  = this.props.clear;

    return (
        <ul className="tags-list" id={id}>{tags.map( (tag,i) => <SelecctableTag key={i} model={tag} catId={catId} store={store} clear={clear}/> )}</ul>
      );
  }
});

var nameMap = {
  genre: 'Genres',
  instr: 'Instrument',
  mood: 'Style'
};

const TagCategoryBox = React.createClass({

  getInitialState: function() {
    return { clear: false };
  },

  componentWillMount: function() {
    this.props.store.on('selectedTags', this.onSelectedTags );
  },

  componentWillUnmount: function() {
    this.props.store.removeListener('selectedTags', this.onSelectedTags );
  },

  onSelectedTags: function(t) {
    var clear = t.isEmpty();
    setTimeout( () => this.setState( { clear } ),
              500 );
  },

  /*
    props:
      store: tagStore
      model: tags[]
      catId: str
      colSize: num (optional, default:3)
  */
  render: function() {
    var name    = nameMap[this.props.catId];
    var store   = this.props.store;
    var tags    = this.props.model;
    var catId   = this.props.catId;
    var colSize = this.props.colSize || 3;
    var cls     = 'col-sm-' + colSize;
    return(
      <div className={cls}>
          <h4 className="center-text">{name}</h4>
          <SelectableTagList model={tags} catId={catId} store={store} toggle={this.state.clear} />
      </div>
    );
  }

});


const TagCategoryRow = React.createClass({

    /*
      props:
        store: tagStore
        model: { categoryNames[], categories[] }
        colSize: num (optional, default:3)
    */

  render: function() {
    var catNames   = this.props.model.categoryNames;
    var categories = this.props.model.categories;
    var store      = this.props.store;

    return (
      <div className="row">
        <div className="col-md-1 hmmmmmm">
        </div>{catNames.map( (n,i) => <TagCategoryBox model={categories[n]} catId={n} key={i} store={store} /> )}</div>
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
      selectedTags: []
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
    this.props.onMatchAny( $(this.refs.matchAny).is(':checked') );
  },

  render: function() {
    var selectedTags = this.state.selectedTags;

    var matchAnyOK = selectedTags.length > 1;

    return( 
        <div>{selectedTags.map( (t,i) => <a key={i} href="#" onClick={this.remove} className="btn-exp btn-tag">
                                          <Glyph x2 icon="times-circle" />{" "}<span>{t}</span>
                                         </a> )
          }{selectedTags.length 
             ? <a  href="#" onClick={this.clear} className="btn btn-xs btn-danger">
                <Glyph icon="trash" />{" clear"}</a>
              : null
          }
          {" "}
          {matchAnyOK 
            ? <label className="btn btn-primary btn-xs"><input onChange={this.onMatchAny} type="checkbox" ref="matchAny" />{" match any"}</label>
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
    if( !global.IS_SERVER_REUQEST ) {
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
    var tagStore = new TagStore();
    tagStore.on('selectedTags', this.onSelectedTags );
    this.setState({ tagStore });
  },

  componentWillUnmount: function() {
    this.state.tagStore.removeListener('selectedTags', this.onSelectedTags );
  },

  onSelectedTags: function(t) {
    var playlistStore = this.props.model.store;
    playlistStore.applyParams( 
        {
          tags: t.toString(),
          offset: 0
        } );
  },

  onMatchAny: function(val) {
    this.props.model.store.applyParams( 
        { type: val ? 'any' : 'all',
          offset: 0 // do I need do this?
         });
  },

  render() {

    var model    = this.props.model;
    var offset   = this.props.queryParams.offset || 0;
    var limit    = this.props.queryParams.limit  || 10;
    var tagStore = this.state.tagStore;

    return (
      <div>
        <RemixTagSelectionSection store={tagStore} onMatchAny={this.onMatchAny}/>
        <Paging 
            offset={offset}
            length={model.playlist.length}
            limit ={limit}
            total ={model.total} 
            store ={this.props.model.store}
        />
        <Playlist model={model} />        
      </div>
    );
  }

});

dig.model = function(params,queryParams) {
  var qparams = oassign( {}, qc.default, queryParams||{} );
  var playlist = new PlaylistStore();
  return playlist.playlist(qparams);
};

module.exports = dig;

