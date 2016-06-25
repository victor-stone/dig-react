import React                from 'react';
import events               from '../../models/events';
import {  ModelTracker,
          StoreEvents   }   from '../../mixins';
import Form                 from '../vanilla/Form';
import CollapsingPeopleList from '../models/CollapsingPeopleList';

var FormItem = Form.FormItem;

const Followers = React.createClass({

  mixins: [StoreEvents,ModelTracker],

  getDefaultProps: function() {
    return { storeEvent: events.FOLLOW_CHANGED };
  },

  stateFromStore(store) {
    return { store, model: store.model.artist.social[this.props.followType] };
  },

  onFollowChanged: function() {
    this.setState( this.stateFromStore(this.state.store) );
  } ,

  render() {
    return (
      this.state.model.length
        ? <FormItem title={this.props.title} wrap cls="followers">
            <CollapsingPeopleList max={10} className="follow"  model={this.state.model} />
          </FormItem>
        : null 
      );
  }
});


module.exports = Followers;

//