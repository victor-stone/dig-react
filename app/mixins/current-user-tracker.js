import api      from '../services/ccmixter';
import events   from '../models/events';

const _methods = {

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
      if( !this.unMounted ) { // this can happen when the component goes away on user logout
        api.user.currentUserProfile().then( profileHandler );
      }
      return id;
    }.bind(this);

    var onReject = function() {
      profileHandler();
    }.bind(this);

    return  api.user.currentUser().then( onSuccess, onReject );
  },

};

const CurrentUserTracker = Object.assign({

  getInitialState() {
    return { user: undefined, userLoading: !global.IS_SERVER_REQUEST };
  },
}, _methods);

const _classMixin = target => class extends target {
  constructor() {
    super(...arguments);
    Object.assign(this,_methods);
    this.state = { user: undefined, userLoading: !global.IS_SERVER_REQUEST };
  }
};

CurrentUserTracker.cut = _classMixin;

module.exports = CurrentUserTracker;

