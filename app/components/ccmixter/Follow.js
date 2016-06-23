import React   from 'react';
import events  from '../../models/events';
import {  ModelTracker,
          StoreEvents,
          CurrentUserTracker } from '../../mixins';

import PeopleList from '../models/PeopleList';

import Glyph from '../vanilla/Glyph';
import Form  from '../vanilla/Form';

import api from '../../services/ccmixter';          

var FormItem = Form.FormItem;

const FollowButton = React.createClass({

  mixins: [CurrentUserTracker,ModelTracker],

  stateFromStore(store) {
    var state = this._calcState(this.state && this.state.follower,store.model.artist);
    state.store = store;
    return state;
  },

  stateFromUser(user) {
    var store = this.state.store || this.props.store;
    return this._calcState(user,store.model.artist);
  },

  _calcState(follower,followee) {
    if( follower && followee && followee.id !== follower.id ) {
      return { show: true, 
               toggle: follower.social.following.findBy( 'id', followee.id ) !== null,
               follower: follower,
               followerId: follower.id,
               followeeId: followee.id };
    }
    return { show: false, follower: follower };
  },

  toggleFollow(e) {
    e.stopPropagation();
    e.preventDefault();
    api.user.follow(this.state.toggle ? 'unfollow' : 'follow',this.state.followerId,this.state.followeeId)
      .then( () => 
          this.state.store.followers(this.state.followeeId) 
        ); 
    this.setState( { toggle: !this.state.toggle } );
  },

  render() {
    if( !this.state.show ) {
      return null;
    }
    return (
      <button className="btn btn-sm follows" onClick={this.toggleFollow}>
          <Glyph icon={this.state.toggle ? 'check-square-o' : 'square-o'} />
          {' ' + (this.state.toggle ? 'following' : 'follow')}
      </button>
    );
  }

});

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
            <PeopleList className="follow" thumb model={this.state.model} />
          </FormItem>
        : null 
      );
  }
});


module.exports = {
  Followers,
  FollowButton
};

