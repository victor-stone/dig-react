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
    var profileHandler = function(profile) {
        var state = this.stateFromUser ? this.stateFromUser(profile,this.props) : { user: profile };
        state.userLoading = false;
        this.setState( state );
    }.bind(this);

    return  CCMixter.currentUser().then( id => {
      if( this.thisIsMounted ) {
        if( id ) {
            CCMixter.profile(id).then( profileHandler );
        } else {
          profileHandler(null);
        }
      }
      return id;
    });
  },

};


module.exports = CurrentUserTracker;

