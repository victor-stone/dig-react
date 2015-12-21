import CCMixter from '../stores/ccmixter';

const CurrentUserTracker = {

  getInitialState: function() {
    return { user: null, userLoading: true };
  },

  componentWillMount: function() {
    if( global.IS_SERVER_REQUEST ) {
      this.setState( { userLoading: false } );
    } else {
      CCMixter.currentUser().then( user => {
        var state = this.stateFromUser ? this.stateFromUser(user) : { user };
        state.userLoading = false;
        this.setState( state );
        return user;
      });
    }
  },

};


module.exports = CurrentUserTracker;

