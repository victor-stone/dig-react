import React            from 'react';
import { CurrentUserTracker,
          StoreEvents } from '../../mixins';
import events           from 'models/events';
import UserFeed         from '../../services/userfeed';

class FeedBadge extends CurrentUserTracker(StoreEvents(React.Component))
{
  get store() {
    if( !this._store ) {
      this._store = UserFeed();
    }
    return this._store;
  }

  get storeEvents() {
    return [events.FEED_SEEN];
  }

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.feedcount !== nextState.feedcount;
  }

  onFeedseen() {
    this.setState( { feedcount: 0 } );
  }

  onLastSeenCount(feedcount) {
    // there's some bug in ccHost I can't find right now
    if( Array.isArray(feedcount) ) {
      feedcount = feedcount[0];
    }
    this.setState( {feedcount} );
  }

  stateFromUser(user) {
    if( user ) { 
      const { state:{user:{id = null} = {} } = {} } = this;
      if( user.id !== id ) {
        this.store.lastSeenCount(user.id).then( feedcount => this.onLastSeenCount(feedcount) );
      }
    }
    return { user };
  }

  render() {
    if( this.state.feedcount ) {
      return <span className="feedbadge badge">{this.state.feedcount}</span>;
    }
    return null;
  }

}

module.exports = FeedBadge;

//
