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
    var isDyn = this.props.store.model.head.isDynamic;
    var controls = this.state.isOwner && !isDyn ? this.editControls({title:'edit tags'}) : null;

    return (
        <div className="static-playlist-tag-editor playlist-bg-color">
          {this.state.editing
            ? <div>
                <ul className="tags">
                  {this.state.tags.map( (t,i) => <li key={i} onClick={this.removeTag(t)}><Glyph icon="times" />{t}</li> )}
                </ul>
                <ul className="pool">
                  {this.state.pool.map( (t,i) => <li key={i} onClick={this.addTag(t)}><Glyph icon="plus"/>{t}</li> )}
                </ul>
              </div>
            : <Tags model={this.state.tags} />
          }
          {controls}
        </div>
      );
  }
});

module.exports = EditableTags;

//