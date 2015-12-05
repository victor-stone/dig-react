import React  from 'react';
import Glyph  from './Glyph'; 
import AB     from './ActionButtons';
import events from '../models/events';

import { StoreEvents }      from '../mixins';
import { TagString }        from '../unicorns';

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


function ZIPFiles(props) {

    var files  = props.model.zipContents
                  .filter( f => f.match(/(__MACOSX|\.DS_Store)/) === null )
                  .map( f => f.replace(/\/.*\//g,'') );
    var tags   = props.tags;
    return (
        <ul className="zip-files">
          {files.map( (f,i) => {
            var cls = tags && tags.anyInString(f.toLowerCase()) ? 'hi-hi' : '';
            return( <li className={cls} key={i}>{f}</li> );
          })}
        </ul>
      );
}

const ZIPContentViewer = React.createClass({

  mixins: [StoreEvents],

  getDefaultProps: function() {
    return {
      keepAbove: '.footer',
      keepBelow: '.page-header',
      storeEvent: events.INSPECT_ZIP
    };
  },

  getInitialState: function() {
    return { file: null };
  },

  onInspectZip: function(file,store) {
    
    if( this.state.store ) {
      this._unsub(this.state.store);
    }
    this._sub(store);

    var qp   = store.model.queryParams;    
    var tags = qp.searchp 
                ? new TagString(qp.searchp.replace(/\s/g,','))
                : new TagString(store.model.queryParams.tags);

    this.setState( { file, store, tags } ); 
  },

  onSelectedTags: function(queryParams) {
    var tags = new TagString(queryParams.tags);
    this.setState( { tags } );
  },

  _sub: function(store) {
    store.on( events.PARAMS_CHANGED, this.onSelectedTags);
  },

  _unsub: function(store) {
    store.removeListener( events.PARAMS_CHANGED, this.onSelectedTags);
  },

  render: function() {
    if( !this.state.file ) {
      return null;
    }
    var upload = this.state.file.upload;
    var tags   = this.state.tags;
    return (
        <ul className="zip-contents">
          <li className="head"><Glyph icon="file-archive-o" />{" Contents of ZIP file"}</li>
          <li className="sub-head"><UploadLink model={upload} /></li>
          <ZIPFiles model={this.state.file} tags={tags} />
        </ul>
      );
  }
});

ZIPContentViewer.ZIPLink     = ZIPLink;
ZIPContentViewer.ZIPFiles    = ZIPFiles;

module.exports = ZIPContentViewer;

//