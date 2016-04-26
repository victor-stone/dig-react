import React  from 'react';
import Glyph  from '../Glyph';
import Link   from '../Link';

import { PlaylistOwner } from '../../mixins';

var Tags = React.createClass({

  render: function() {
    var tags = this.props.model.toArray();
    if( !tags.length && !this.props.children ) {
      return null;
    }

    return (
        <div className="playlist-tags">
          <Glyph icon="tags" />
          {tags.map( t => {
              return(<Link key={t} className="playlist-tag" href={'/playlists/tags/' + t}>{t}</Link>);
          })}
          {this.props.children}
        </div>
      );
  }
});

var TagsEditor = React.createClass({

  mixins: [PlaylistOwner],

  getInitialState: function() {
    return { tags: null, pool: null };
  },

  componentWillMount: function() {
    if( !this.state.isOwner || !this.state.tags ) {
      this.getTags();
    }
  },

  componentWillUpdate: function() {
    if( !this.state.isOwner || !this.state.tags ) {
      this.getTags();
    }
  },

  getTags: function() {
    var tagStore   = this.props.store.model.tracks.tags;

    tagStore.remixGenres().then( genres => {
      this.setState( { tags: this.props.store.model.head.tags, pool: genres } );
    });
  },

  startEdit: function() {
    this.setState( { editing: true } );
  },

  doneEdit: function() {
    this.setState( { editing: false }, () => {

    });
  },

  cancelEdit: function() {
    this.setState( { editing: false } );
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
        </div>
      );
    } else {
      body = (<Tags model={this.props.store.model.head.tags} />);
    }
    return (
        <div>
          {body}
          {this.state.isOwner
            ? <div className="btn-group btn-group-sm edit-controls">
                <button className="btn btn-default" disabled={this.state.editing}  onClick={this.startEdit} ><Glyph icon="edit"  />{" edit tags"}</button>
                <button className="btn btn-default" disabled={!this.state.editing} onClick={this.doneEdit}  ><Glyph icon="check" /></button>
                <button className="btn btn-default" disabled={!this.state.editing} onClick={this.cancelEdit}><Glyph icon="times" /></button>
              </div>
            : null
          }
        </div>
      );
  }
});

Tags.Editor = TagsEditor;

module.exports = Tags;

//