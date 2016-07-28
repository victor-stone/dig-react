import React                from 'react';
import events               from '../../models/events';
import {  ModelTracker  }   from '../../mixins';
import FormItem             from '../vanilla/form-field';
import CollapsingPeopleList from '../models/collapsing-people-list';
import { FormControl }      from '../vanilla/form';

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
        ? <FormItem title={this.props.title} className="followers">
            <FormControl>
              <CollapsingPeopleList max={10} className="follow" model={this.state.model} />
              <p style={{margin:1}} />
            </FormControl>
          </FormItem>
        : null 
      );
  }
}


module.exports = Followers;

//