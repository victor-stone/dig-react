import currentuser  from '../services/ccmixter/user';
import events       from 'models/events';

import { safeSetState } from 'unicorns';

const CurrentUserTracker = target => class extends target {
  constructor() {
    super(...arguments);
    this.onUserLogin = this.onUserLogin.bind(this);
    safeSetState( this, { user: undefined, userLoading: !global.IS_SERVER_REQUEST } );
  }

  componentWillMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    currentuser.on(events.USER_LOGIN,this.onUserLogin);
    this.checkForUser();
  }

  componentWillUnmount() {
    this.unMounted = true;
    currentuser.removeListener(events.USER_LOGIN,this.onUserLogin);
  }

  onUserLogin() {
    this.checkForUser();
  }

  checkForUser() {
    const profileHandler = function(profile) {
      if( !this.unMounted ) { 
        const state = this.stateFromUser ? this.stateFromUser(profile,this.props) : { user: profile };
        state.userLoading = false;
        this.setState( state );
      }
    }.bind(this);

    const onSuccess = function( id ) {
      if( !this.unMounted ) { // this can happen when the component goes away on user logout
        currentuser.currentUserProfile().then( profileHandler );
      }
      return id;
    }.bind(this);

    const onReject = function() {
      profileHandler();
    }.bind(this);

    return currentuser.currentUser().then( onSuccess, onReject );
  }
};

module.exports = CurrentUserTracker;

