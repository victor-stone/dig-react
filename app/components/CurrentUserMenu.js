import React from 'react';
import Glyph from './Glyph';

const MAX_NAME_LEN = 15;

const CurrentUserMenuHead = React.createClass({

  getInitialState: function() {
    return { loading: true };
  },

  componentWillReceiveProps: function(props) {
    this.setState(props);
  },

  render: function() {

    if( this.state.loading) {
      return null;      
    }

    if( !this.state.model ) {
      return (<a href="http://ccmixter.org/login"><Glyph icon="user" />{" log in"}</a>);
    }

    var u = this.state.model;
    
    return (<a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <Glyph icon="user" />{" "}{u.name.ellipse(MAX_NAME_LEN)}{" "}<Glyph icon="chevron-down" />
            </a>);
  }

});

const CurrentUserMenu = React.createClass({

  getInitialState: function() {
    return { user: null };
  },

  componentWillReceiveProps: function(props) {
    this.setState(props);
  },

  render: function() {

    if( !this.state.model ) {
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