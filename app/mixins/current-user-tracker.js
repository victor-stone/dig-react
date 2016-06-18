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
    this.unMounted = true;
    api.removeListener(events.USER_LOGIN,this.onUserLogin);
  },

  onUserLogin( /*result */ ) {
    this.checkForUser();
  },

  checkForUser() {
    var profileHandler = function(profile) {
      if( !this.unMounted ) { 
        var state = this.stateFromUser ? this.stateFromUser(profile,this.props) : { user: profile };
        state.userLoading = false;
        this.setState( state );
      }
    }.bind(this);

    var onSuccess = function( id ) {
      if( !this.unMounted ) { // unclear where/when this needs to be protected from
        api.user.currentUserProfile().then( profileHandler );
      }
      return id;
    }.bind(this);

    var onReject = function() {
      profileHandler(null);
    }.bind(this);

    return  api.user.currentUser().then( onSuccess, onReject );
  },

};


module.exports = CurrentUserTracker;

