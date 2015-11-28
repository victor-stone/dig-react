import React  from 'react';
import Glyph  from './Glyph'; 
import AB     from './ActionButtons';
import events from '../models/events';

import {  StoreEvents,
          BoundingElement  } from '../mixins';

const UploadLink = AB.UploadLink;

const ZIPLink = React.createClass({
  onClick: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.onClick(this.props.model);
  },

  render: function() {
    var cls      = 'btn btn-info btn-lg hidden-xs hidden-sm ';
    return (<a className={cls} href="#" onClick={this.onClick}><Glyph fixed icon="info" /></a>);
  },
});

const ZIPContentViewer = React.createClass({

  mixins: [BoundingElement,StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      storeEvent: events.INSPECT_ZIP
    };
  },

  getInitialState: function() {
    return { files: null };
  },

  componentDidUpdate: function() {
    this.resetBump();
  },

  onInspectZip: function(file,store) {
    if( this.state.store ) {
      this._unsub(this.state.store);
    }
    this._sub(store);
    this.setState( { file, 
                     store,
                     selectedTags: store.tags.getSelectedTags(),
                     files: file && file.zipContents } );
  },

  onSelectedTags: function(tags) {
    this.setState( { selectedTags: tags } );
  },

  _sub: function(store) {
    store.tags.on( events.TAGS_CHANGED, this.onSelectedTags);
  },

  _unsub: function(store) {
    store.tags.removeListener( events.TAGS_CHANGED, this.onSelectedTags);
  },

  render: function() {
    if( !this.state.files ) {
      return null;
    }

    var upload = this.state.file.upload;
    var files  = this.state.files
                  .filter( f => f.match(/(__MACOSX|\.DS_Store)/) === null )
                  .map( f => f.replace(/\/.*\//g,'') );
    var tags   = this.state.selectedTags;
    return (
        <ul className="zip-contents">
          <li className="head"><Glyph icon="file-archive-o" />{" Contents of ZIP file"}</li>
          <li className="sub-head"><UploadLink model={upload} /></li>
          {files.map( (f,i) => {
            var cls = tags && tags.anyInString(f.toLowerCase()) ? 'hi-hi' : '';
            return( <li className={cls} key={i}>{f}</li> );
          })}
        </ul>
      );
  }
});

ZIPContentViewer.ZIPLink = ZIPLink;

module.exports = ZIPContentViewer;