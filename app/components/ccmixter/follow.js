import React                from 'react';
import events               from '../../models/events';
import {  ModelTracker  }   from '../../mixins';
import Form                 from '../vanilla/form';
import CollapsingPeopleList from '../models/collapsing-people-list';

var FormItem = Form.FormItem;

class Followers extends ModelTracker(React.Component)
{

  get storeEvents() {
    return [events.FOLLOW_CHANGED].concat(super.storeEvents);
  }

  stateFromStore(store) {
    return { store, model: store.model.artist.social[this.props.followType] };
  }

  onFollowChanged() {
    this.setState( this.stateFromStore(this.state.store) );
  }

  render() {
    return (
      this.state.model.length
        ? <FormItem title={this.props.title} wrap cls="followers">
            <CollapsingPeopleList max={10} className="follow"  model={this.state.model} />
          </FormItem>
        : null 
      );
  }
}


module.exports = Followers;

//