import React from 'react';
import CCMixter from '../stores/ccmixter';
import Glyph from './Glyph';
import Link from './Link';

const MAX_NAME_LEN = 15;

const CurrentUserMenuHead = React.createClass({

  getInitialState: function() {
    return { user: null };
  },

  componentWillMount: function() {
    CCMixter.currentUser().then( user => this.setState( { user } ) );
  },

  render: function() {

    if( !this.state.user ) {
      return (<a href="http://ccmixter.org/login"><Glyph icon="user" />{" log in"}</a>);
    }

    var u = this.state.user;
    
    return (<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Glyph icon="user" />{" "}{u.name.ellipse(MAX_NAME_LEN)}{" "}<Glyph icon="chevron-down" />
            </a>);
  }

});

const CurrentUserMenu = React.createClass({

  getInitialState: function() {
    return { user: null };
  },

  componentWillMount: function() {
    CCMixter.currentUser().then( user => this.setState( { user } ) );
  },

  render: function() {

    if( !this.state.user ) {
      return null;
    }

    var u = this.state.user;
    var phref  = '/people/' + u.id;

    return (
        <ul className="dropdown-menu">
          <li><Link href={phref}><Glyph fixed icon="music" />{" playlists"}</Link></li>
          <li><Link href="/new"><Glyph fixed icon="edit" />{" create new"}</Link></li>
        </ul>
      );            
  }

});

module.exports = {
  CurrentUserMenu,
  CurrentUserMenuHead
};

//