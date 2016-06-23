import React            from 'react';
import { CurrentUserTracker,
          StoreEvents } from '../../mixins';
import events           from '../../models/events';
import UserFeed         from '../../services/userfeed';

var FeedBadge = React.createClass({

  mixins: [ CurrentUserTracker, StoreEvents ],

  getDefaultProps: function() {
    return { storeEvent: events.FEED_SEEN,
             store:  UserFeed() };
  },

  shouldComponentUpdate(nextProps,nextState) {
    return this.state.feedcount !== nextState.feedcount;
  },

  onFeedseen() {
    this.setState( { feedcount: 0 } );
  },

  onLastSeenCount(feedcount) {
    this.setState( {feedcount} );
  },

  stateFromUser(user) {
    if( user ) { 
      if( !this.state  || !this.state.user || user.id !== this.state.user.id ) {
        this.props.store.lastSeenCount(user.id).then( this.onLastSeenCount );
      }
    }
    return { user };
  },

  render() {
    if( this.state.feedcount ) {
      return <span className="feedbadge badge">{this.state.feedcount}</span>;
    }
    return null;
  }

});

module.exports = FeedBadge;

//
