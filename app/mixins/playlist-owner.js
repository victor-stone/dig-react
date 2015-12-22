import CurrentUserTracker from './current-user-tracker';
import { oassign }        from '../unicorns';

var PlaylistOwner = oassign( {}, CurrentUserTracker, {

  stateFromUser: function(user) {
    var state = { user, isOwner: user.id === this.props.store.model.head.curator.id };
    return state;
  }

});

module.exports = PlaylistOwner;

//