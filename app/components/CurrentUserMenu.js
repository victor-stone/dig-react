import React from 'react';
import Glyph from './Glyph';

import { CurrentUserTracker } from '../mixins';

const MAX_NAME_LEN = 15;

const CurrentUserMenuHead = React.createClass({

  mixins: [CurrentUserTracker],

  render: function() {

    if( this.state.userLoading ) {
      return null;      
    }

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

  mixins: [CurrentUserTracker],

  render: function() {

    if( !this.state.user ) {
      return null;
    }

    return (
        <ul className="dropdown-menu">
          {this.props.children}
        </ul>
      );            
  }

});

module.exports = {
  CurrentUserMenu,
  CurrentUserMenuHead
};

//