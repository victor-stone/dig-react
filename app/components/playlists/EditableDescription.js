/*eslint "react/no-danger":0 */
import React from 'react';
import { ModelTracker, EditControls } from '../../mixins';

var EditableDescription = React.createClass({

  mixins: [ ModelTracker, EditControls ],

  stateFromStore(store) {
    function cleanLinks(str) {
      return str.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' );
    }

    var desc = store.model.head.description || '';
    var raw  = store.model.head.descriptionRaw || '';
    if( desc ) {
      desc = cleanLinks(desc);
    }
    if( raw ) {
      raw = cleanLinks(raw);
    }
    return { text: desc, orgText: desc, raw };

  },

  doneEdit() {
    this.state.store.applyProperties({ description: this.refs.description.value });
  },

  cancelEdit() {
    this.setState( { text: this.state.orgText } );
  },

  render() {

    var desc = this.state.text;
    var isOwner = this.state.store.permissions.isOwner;

    if( !this.state.editing && !desc && !isOwner ) {
      return null;
    }

    return (
        <div className="playlist-description playlist-bg-color"> 
        {this.state.editing
          ? <textarea ref="description" defaultValue={this.state.raw}></textarea>
          : <span dangerouslySetInnerHTML={{ __html: desc }}></span>
        }
        {isOwner && this.editControls( {title: 'edit description'})}
        </div>
      );
  }
});

module.exports = EditableDescription;

//