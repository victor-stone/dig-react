import CCMixter from '../stores/ccmixter';
import events   from '../models/events';

const CurrentUserTracker = {

  getInitialState() {
    return { user: null, userLoading: true };
  },

  componentDidMount() {
    this.thisIsMounted = true;
    CCMixter.on(events.USER_LOGIN,this.onUserLogin);
    this.checkForUser();
  },

  componentWillUnmount() {
    CCMixter.removeListener(events.USER_LOGIN,this.onUserLogin);
    this.thisIsMounted = false;
  },

  componentWillReceiveProps( props ) {
    if( this.state.user && this.stateFromUser ) {
      this.setState( this.stateFromUser( this.state.user, props ) );
    }
  },

  onUserLogin( /*result */ ) {
    this.checkForUser();
  },

  checkForUser() {
    return  CCMixter.currentUser().then( user => {
      if( this.thisIsMounted ) {
        var state = this.stateFromUser ? this.stateFromUser(user,this.props) : { user };
        state.userLoading = false;
        this.setState( state );
      }
      return user;
    });
  },

};


module.exports = CurrentUserTracker;

