import api      from '../services/ccmixter';
import events   from '../models/events';

const CurrentUserTracker = target => class extends target {
  constructor() {
    super(...arguments);
    this.onUserLogin = this.onUserLogin.bind(this);
    const myState = { user: undefined, userLoading: !global.IS_SERVER_REQUEST };
    if( this.state ) {
      Object.assign( this.state, myState );
    } else {
      this.state = myState;
    }
  }

  componentWillMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    api.on(events.USER_LOGIN,this.onUserLogin);
    this.checkForUser();
  }

  componentWillUnmount() {
    this.unMounted = true;
    api.removeListener(events.USER_LOGIN,this.onUserLogin);
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
        api.user.currentUserProfile().then( profileHandler );
      }
      return id;
    }.bind(this);

    const onReject = function() {
      profileHandler();
    }.bind(this);

    return  api.user.currentUser().then( onSuccess, onReject );
  }
};

module.exports = CurrentUserTracker;

