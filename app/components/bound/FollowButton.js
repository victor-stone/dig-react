import React   from 'react';
import {  ModelTracker,
          CurrentUserTracker } from '../../mixins';

import Glyph from '../vanilla/Glyph';

import api from '../../services/ccmixter';   

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

module.exports = FollowButton;


