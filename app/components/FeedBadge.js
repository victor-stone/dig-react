import React            from 'react';

import { CurrentUserTracker,
          StoreEvents } from '../mixins';
import events           from '../models/events';
import UserFeed         from '../services/userfeed';

var FeedBadge = React.createClass({

  mixins: [ CurrentUserTracker, StoreEvents ],

  getDefaultProps: function() {
    return { storeEvent: events.FEED_SEEN,
             store:  UserFeed() };
  },

  onFeedseen() {
    this.setState( { feedcount: 0 } );
  },

  stateFromUser(user) {
    if( user ) {
      this.props.store.lastSeenCount(user.id).then( feedcount => this.setState( {feedcount} ) );
    }
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
