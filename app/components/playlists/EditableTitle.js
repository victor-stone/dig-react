import React  from 'react';
import Glyph  from '../Glyph';
import { ModelTracker,
        EditControls } from '../../mixins';

var EditableTitle = React.createClass({

  mixins: [ ModelTracker, EditControls ],

  stateFromStore(store) {
    var text = store.model.head.name;
    return { text, orgText: text, editing: false };
  },

  doneEdit() {
    var name = this.refs.ptitle.value;
    this.state.store.applyProperties({name});
  },

  cancelEdit() {
    this.setState( { text: this.state.orgText, editing: false } );
  },

  render() {

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
            {this.state.store.permissions.isOwner && !this.state.editing
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