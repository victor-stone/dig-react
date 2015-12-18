import React from 'react';
import CCMixter from '../stores/ccmixter';

const CurrentUserMenu = React.createClass({

  getInitialState: function() {
    return { user: null };
  },

  componentWillMount: function() {
    var ccm = new CCMixter();
    ccm.currentUser().then( user => this.setState( { user } ) );
  },

  render: function() {

    if( !this.state.user ) {
      return null;
    }

    var u = this.stateu.user;

    return (
        <div className="current-user">
          {"Hello "}{u.name}
        </div>
      );
  }

});

module.exports = CurrentUserMenu;