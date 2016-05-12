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
    var handler = function(user) {
        var state = this.stateFromUser ? this.stateFromUser(user,this.props) : { user };
        state.userLoading = false;
        this.setState( state );
    }.bind(this);

    return  CCMixter.currentUser().then( username => {
      if( this.thisIsMounted ) {
        if( username ) {
          CCMixter.profile(username).then( handler );
        } else {
          handler(null);
        }
      }
      return username;
    });
  },

};


module.exports = CurrentUserTracker;

