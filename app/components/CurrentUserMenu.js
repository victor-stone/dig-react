import React         from 'react';
import Glyph         from './Glyph';
import { DeadLink }  from './ActionButtons';
import FeedBadge     from './FeedBadge';

const MAX_NAME_LEN = 15;

function MenuDivider() {
  return (<li className="divider"></li>);
}

const CurrentUserMenu = React.createClass({

  getInitialState() {
    return { loading: this.props.loading };
  },

  componentWillReceiveProps(props) {
    this.setState(props);
  },

  render() {

    if( this.state.loading) {
      return null;
    }

    if( !this.state.model ) {
      return (<li><DeadLink id="user-menu" onClick={this.props.onLogin}><Glyph icon="user" />{" log in"}</DeadLink></li>);
    }

    var u = this.state.model;
    var children = React.Children.map( this.props.children, c => c.type.name === 'MenuDivider' ? c : <li>{c}</li> );

    return (
      <li className="dropdown">
        <a href="#" id="user-menu" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Glyph icon="user" />{" "}{u.name.ellipse(MAX_NAME_LEN)}{" "}{this.props.feedbadge ? <FeedBadge />: null}{" "}<Glyph icon="chevron-down" />
        </a>
        <ul id="user-menu-items" className="dropdown-menu">{children}</ul>
      </li>
    );
  }

});

CurrentUserMenu.Divider = MenuDivider;

module.exports = CurrentUserMenu;


//