import React       from 'react';

import { FormItem } from '../../Form';

import { ModelTracker,
        EditControls } from '../../../mixins';

var BPM = React.createClass({

  mixins: [ ModelTracker, EditControls ],

  getDefaultProps() {
    return {focusId: 'ptitle'};
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.editing !== nextState.editing || this.state.text !== nextState.text;
  },

  stateFromStore(store) {
    var text = store.model.upload.bpm;
    return { text, orgText: text, store };
  },

  doneEdit() {
    this.state.store.applyProperties({bpm:this.refs.ptitle.value});
  },

  cancelEdit() {
    this.setState( { text: this.state.orgText, editing: false } );
  },

  render() {
    var text = this.state.text;
    var addOn = this.state.store.permissions.isOwner && this.editControls( {title: '', bare: true}  );
    return(
        <FormItem title="BPM" cls={this.props.cls} addOn={addOn}>
          {this.state.editing
            ? <input id={this.props.focusId} type="text" ref="ptitle" className="form-control" defaultValue={text} />
            : <span className="form-control">{text}</span>
          }
        </FormItem>
      );
  }
});


module.exports = BPM;

//