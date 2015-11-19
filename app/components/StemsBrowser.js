import React         from 'react';
import TagStore      from '../stores/tags';

import { TagString } from '../unicorns';

import Glyph from './Glyph'; 
import Paging from './Paging'; 
import Tags from './Tags';
import DownloadPopup from './DownloadPopup';
import SearchBox from './SearchBox';
//import QueryOptions from './QueryOptions';

import AudioPlayer from './AudioPlayer';

import {  QueryParamTagsRotate,
          StoreEvents,
          BoundingElement,
          PlaylistUpdater  } from '../mixins';

const SelectedTagSection = React.createClass({

  render: function() {
    return (
        <div className="selected-tags">
          <Tags.SelectedTags {...this.props}/>
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
      var store = this.props.tagStore;
      store.sampleCategories()
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

    var model    = this.state.filtered;
    var tagStore = this.props.tagStore;

    return (
        <div>
            {
              this.state.loading 
                ? <TagsLoading />
                : <div className="stems-tags-widget">
                    <SearchBox icon="times" placeholder="find tag" submitSearch={this.filter} anyKey />
                    <Tags.SelectableTagList store={tagStore} model={model} />
                  </div>
            }
        </div>
      );
  }
});

const ZIPLink = React.createClass({
  onClick: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick(this.props.model);
  },

  render: function() {
    var cls      = 'btn btn-info btn-lg';
    return (<a className={cls} href="#" onClick={this.onClick}><Glyph icon="info" /></a>);
  },
});

const SamplesFiles = React.createClass({

  onZIPClick: function(file) {
    file.upload = this.props.model;
    this.props.store.emit('inspectZIP',file);
  },

  render: function() {
    var model = this.props.model;
    var files = model.files;
    return(
        <ul className="stems-files">
          {files.map( f => {
            return (<li className="stem-files-line" key={f.id}>
                      <DownloadPopup btnClass="sm-download" model={model} file={f} /> 
                      {" "}
                      {f.isPlayableSample
                        ? <AudioPlayer.PlayButton model={f} />
                        : null
                      }
                      {f.isZIP
                        ? <ZIPLink model={f} onClick={this.onZIPClick} />
                        : null
                      }
                      {" "}
                      <span className="ext">{f.extension}</span>
                      {" "}
                      <span className="nic">{f.nicName}</span>
                    </li>);
            })
          }
        </ul>
      );
  }
});

const SamplesList = React.createClass({

  mixins: [PlaylistUpdater],

  getDefaultProps: function() {
    return { skipUser: false };
  },
 
  stateFromStore: function(store) {
    return { model: store.model };
  },

  render: function() {
    var model = this.state.model;

    if( !model || !model.total ) {
      return (<div className="well"><h2>{"nothing matches that combination of tags"}</h2></div>);
    }

    return (
        <ul className="stems-listing">
          {model.playlist.map( (u,i) => {
            return (<li key={i}>
                      <span className="stem-name">{u.name}</span>
                      {" "}
                      <span className="stem-artist">{u.artist.name}</span>
                      <SamplesFiles model={u} store={this.props.store} />
                  </li>); })
          }
        </ul>
      );
    }
});

const ZIPContentViewer = React.createClass({

  mixins: [BoundingElement,StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      storeEvent: 'inspectZIP'
    };
  },

  getInitialState: function() {
    return { files: null };
  },

  componentDidUpdate: function() {
    this.resetBump();
  },

  onStoreEvent: function(file) {
    this.setState( { file, files: file && file.zipContents } );
  },

  render: function() {
    if( !this.state.files ) {
      return null;
    }

    var upload = this.state.file.upload;
    var files  = this.state.files
                  .filter( f => f.match(/(__MACOSX|\.DS_Store)/) === null )
                  .map( f => f.replace(/\/.*\//g,'') );

    return (
        <ul className="zip-contents">
          <li className="head"><Glyph icon="file-archive-o" />{" Contents of ZIP file"}</li>
          <li className="sub-head">{upload.name}</li>
          {files.map( (f,i) => <li key={i}>{f}</li> )}
        </ul>
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
              <SelectedTagSection store={store} tagStore={tagStore} />
          </div>
        </div>
        <div className="row">
          <div  className="col-md-3">
            <StemsTagList store={store} tagStore={tagStore} onUpdate={this.onTagSectionUpdate}/>
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Paging store={store} ref="paging" disableBumping />
            <SamplesList store={store} />   
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

