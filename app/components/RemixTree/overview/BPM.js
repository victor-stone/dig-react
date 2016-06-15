import React       from 'react';

import api from '../../../services/ccmixter';
import env from '../../../services/env';
import { FormItem } from '../../Form';

import { UploadOwner,
        EditControls } from '../../../mixins';

var BPM = React.createClass({

  mixins: [ UploadOwner, EditControls ],

  getDefaultProps() {
    return {focusId: 'ptitle'};
  },

  getInitialState: function() {
    var text = this.props.store.model.upload.bpm;
    return { text, orgText: text };
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.owner.isOwner !== nextState.owner.isOwner || this.state.editing !== nextState.editing || this.state.text !== nextState.text;
  },

  doneEdit: function() {
    this.setState({editing:false});
    var bpm = this.refs.ptitle.value;
    var id   = this.props.store.model.upload.id;    
    api.upload.update(id,{bpm}).then( props => {
        if( props.bpm + '' === bpm ) {
          env.alert('success','bpm value saved');
          this.setState({text:bpm});
        }
      });
  },

  cancelEdit: function() {
    this.setState( { text: this.state.orgText, editing: false } );
  },

  render() {
    var text = this.state.text;
    var addOn = this.state.owner.isOwner && this.editControls( {title: '', bare: true}  );
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