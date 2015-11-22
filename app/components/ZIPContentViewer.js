import React from 'react';
import Glyph from './Glyph'; 
import AB    from './ActionButtons';

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
      storeEvent: 'inspectZIP'
    };
  },

  getInitialState: function() {
    return { files: null };
  },

  componentDidUpdate: function() {
    this.resetBump();
  },

  onInspectZIP: function(file,tagStore) {
    if( tagStore ) {
      if( this.state.tagStore ) {
          if( this.state.tagStore !== tagStore ) {
            this._unsub(this.state.tagStore);
          }
      }
      this._sub(tagStore);
    }
    this.setState( { file, 
                     tagStore,
                     selectedTags: tagStore && tagStore.getSelectedTags(),
                     files: file && file.zipContents } );
  },

  onSelectedTags: function(tags) {
    this.setState( { selectedTags: tags } );
  },

  _sub: function(store) {
    store.on('selectedTags',this.onSelectedTags);
  },

  _unsub: function(store) {
    store.removeListener('selectedTags',this.onSelectedTags);
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