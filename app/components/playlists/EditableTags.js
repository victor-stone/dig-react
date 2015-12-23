import React  from 'react';
import Glyph  from '../Glyph';
import Tags   from './Tags';

import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableTags = React.createClass({

  mixins: [PlaylistOwner,EditControls],

  getInitialState: function() {
    this.loading = false;
    return { tags: this.props.store.model.head.tags, pool: null };
  },

  componentWillMount: function() {
    if( this.state.isOwner || !this.state.pool ) {
      this.getTags();
    }
  },

  componentWillUpdate: function() {
    if( this.state.isOwner || !this.state.pool ) {
      this.getTags();
    }
  },

  getTags: function() {
    if( !this.loading ) {
      this.loading = true;
      var tagStore   = this.props.store.model.tracks.tags;

      tagStore.remixGenres().then( genres => {
        this.setState( { pool: genres }, () => this.loading = false );
      });
    }
  },

  removeTag: function(tag) {
    var _this = this;
    return function() {
      _this.setState( { tags: _this.state.tags.remove(tag),
                        pool: _this.state.pool.add(tag).sort() } );
    };
  },

  addTag: function(tag) {
    var _this = this;
    return function() {
      _this.setState( { tags: _this.state.tags.add(tag),
                        pool: _this.state.pool.remove(tag) } );
    };
  },

  render: function() {
    var body = null;
    if( this.state.editing ) {
      body = (
        <div className="static-playlist-tag-editor">
          <ul className="tags">
            {this.state.tags.map( (t,i) => <li key={i} onClick={this.removeTag(t)}><Glyph icon="times" />{t}</li> )}
          </ul>
          <ul className="pool">
            {this.state.pool.map( (t,i) => <li key={i} onClick={this.addTag(t)}><Glyph icon="plus"/>{t}</li> )}
          </ul>
          {this.editControls({title:'edit tags'})}
        </div>
      );
    } else {
      var controls = this.state.isOwner && !isDyn ? this.editControls({title:'edit tags'}) : null;
      body = (<Tags bg model={this.state.tags}>{controls}</Tags>);
    }

    var isDyn = this.props.store.model.head.isDynamic;

    return (
        <div>
          {body}
        </div>
      );
  }
});

module.exports = EditableTags;

//