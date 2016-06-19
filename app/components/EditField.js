import React       from 'react';

import { FormItem } from './Form';

import { ModelTracker,
        EditControls } from '../mixins';

var nextID = 0;

var EditField = React.createClass({

  mixins: [ ModelTracker, EditControls ],

  getDefaultProps() {
    return {focusId: 'editable_' + ++nextID};
  },

  stateFromStore(store) {
    var props = this.store.getProperties([this.props.propName]);
    var text = props[this.props.propName];
    return { text, orgText: text, store };
  },

  doneEdit() {
    var props = {};
    props[this.props.name] = this.refs.ptitle.value;
    this.state.store.applyProperties(props);
  },

  cancelEdit() {
    this.setState( { text: this.state.orgText, editing: false } );
  },

  render() {
    var text = this.state.text;
    var addOn = this.state.store.permissions.isOwner && this.editControls( {title: '', bare: true}  );
    return(
        <FormItem title={this.props.title} cls={this.props.cls} addOn={addOn}>
          {this.state.editing
            ? <input id={this.props.focusId} type="text" ref="ptitle" className="form-control" defaultValue={text} />
            : <span className="form-control">{text}</span>
          }
        </FormItem>
      );
  }
});


module.exports = EditField;

//