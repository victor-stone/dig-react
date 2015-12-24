import React      from 'react';
import Glyph      from '../Glyph';

import { PlaylistOwner,
        EditControls } from '../../mixins';

var EditableTitle = React.createClass({

  mixins: [ PlaylistOwner, EditControls ],

  getInitialState: function() {
    var text = this.props.store.model.head.name;
    return { text, orgText: text };
  },

  doneEdit: function() {
    this.setState( { text: this.refs.ptitle.value, editing: false } );
  },

  cancelEdit: function() {
    this.setState( { text: this.state.orgText, editing: false } );
  },

  render: function() {

    var text = this.state.text;

    return (
        <div className="page-header"> 
          <h1 className="center-text">
            <Glyph icon="music" /> 
            {" "}
            {this.state.editing
              ? <div className="input-group-wrapper">
                  <div className="input-group">
                    <input type="text" ref="ptitle" className="form-control"  defaultValue={text} />
                    <span className="input-group-btn">
                      <button type="button" className="btn btn-success" onClick={this.doneEdit}  ><Glyph icon="check" /></button>
                      <button type="button" className="btn btn-danger"  onClick={this.cancelEdit}><Glyph icon="times" /></button>
                    </span>
                  </div> 
                </div>
              : <span>{text}</span>
            }
            {this.state.isOwner && !this.state.editing
              ? this.editControls( {title: 'edit name'} )
              : null
            }
          </h1>
        </div>
      );
  }
});


module.exports = EditableTitle;

//