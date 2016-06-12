import api      from '../services/ccmixter';
import events   from '../models/events';

const CurrentUserTracker = {

  getInitialState() {
    return { user: null, userLoading: !global.IS_SERVER_REQUEST };
  },

  componentWillMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    api.on(events.USER_LOGIN,this.onUserLogin);
    this.checkForUser();
  },

  componentWillUnmount() {
    api.removeListener(events.USER_LOGIN,this.onUserLogin);
  },

  onUserLogin( /*result */ ) {
    this.checkForUser();
  },

  checkForUser() {
    var profileHandler = function(profile) {
        var state = this.stateFromUser ? this.stateFromUser(profile,this.props) : { user: profile };
        state.userLoading = false;
        this.setState( state );
    }.bind(this);

    return  api.user.currentUser().then( id => {
      if( id ) {
          api.user.currentUserProfile().then( profileHandler );
      } else {
        profileHandler(null);
      }
      return id;
    });
  },

};


module.exports = CurrentUserTracker;

