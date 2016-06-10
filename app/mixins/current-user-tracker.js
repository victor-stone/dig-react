import api      from '../services/ccmixter';
import events   from '../models/events';

const CurrentUserTracker = {

  getInitialState() {
    return { user: null, userLoading: true };
  },

  componentWillMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    this.setState({_userMounting:true});
    api.on(events.USER_LOGIN,this.onUserLogin);
    this.checkForUser();
  },

  componentWillUnmount() {
    api.removeListener(events.USER_LOGIN,this.onUserLogin);
  },

  /*
  componentWillReceiveProps( props ) {
    if( this.state.user && this.stateFromUser ) {
      this.setState( this.stateFromUser( this.state.user, props ) );
    }
  },
  */

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

