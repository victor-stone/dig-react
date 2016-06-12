import React  from 'react';
import Glyph  from '../Glyph';
import Tags   from './Tags';
import api    from '../../services/ccmixter';
import { PlaylistOwner,
         EditControls } from '../../mixins';

var EditableTags = React.createClass({

  mixins: [PlaylistOwner,EditControls],

  getInitialState: function() {
    this.loading = false;
    var tags = this.props.store.model.head.tags;

    return { tags, pool: null, orgTags: tags.clone() };
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

  removeTag(tag) {
    var _this = this;
    return function() {
      _this.setState( { tags: _this.state.tags.remove(tag),
                        pool: _this.state.pool.add(tag).sort() } );
    };
  },

  addTag(tag) {
    var _this = this;
    return function() {
      _this.setState( { tags: _this.state.tags.add(tag),
                        pool: _this.state.pool.remove(tag) } );
    };
  },

  doneEdit: function() {
    var tags = this.state.tags.toString();
    var id   = this.props.store.model.head.id;
    api.playlist.update(id,{tags}).then( model => {
      this.setState( { model: model.tags } );
    });
  },

  cancelEdit: function() {
    this.setState( { tags: this.state.orgTags.clone() } );
  },

  render: function() {
    var isDyn = this.props.store.model.head.isDynamic;
    var hasControls = this.state.isOwner && !isDyn;

    if( !this.state.tags.length && !hasControls ) {
      return null;
    }
    
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
          {hasControls
            ? this.editControls({title:'edit tags'})
            : null
          }
        </div>
      );
  }
});

module.exports = EditableTags;

//