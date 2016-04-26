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
        var state = this.stateFromUser ? this.stateFromUser(user,this.props) : { user };
        state.userLoading = false;
        this.setState( state );
        return user;
      });
    }
  },

  componentWillReceiveProps: function( props ) {
    if( this.state.user && this.stateFromUser ) {
      this.setState( this.stateFromUser( this.state.user, props ) );
    }
  },

};


module.exports = CurrentUserTracker;

