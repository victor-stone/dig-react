import React         from 'react';
import ReactDOM      from 'react-dom';
import Glyph         from './Glyph';
import { DeadLink }  from './ActionButtons';

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

  componentDidMount() {
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    var children = React.Children.map( this.props.children, c => c.type.name === 'MenuDivider' ? c : <li>{c}</li> );
    var comp     = <ul className="dropdown-menu">{children}</ul>;
    var ph       = document.createElement('DIV');
    ReactDOM.render( comp,  ph );
    var usermenu = document.getElementById('user-menu');
    usermenu.parentNode.insertBefore( ph.firstChild, usermenu.nextSibling );
  },

  render() {

    if( this.state.loading) {
      return <a id="user-menu"></a>;      
    }

    if( !this.state.model ) {
      return (<DeadLink id="user-menu" onClick={this.props.onLogin}><Glyph icon="user" />{" log in"}</DeadLink>);
    }

    var u = this.state.model;

    return (
        <a href="#" id="user-menu" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Glyph icon="user" />{" "}{u.name.ellipse(MAX_NAME_LEN)}{" "}<Glyph icon="chevron-down" />
        </a>
    );
  }

});

CurrentUserMenu.Divider = MenuDivider;

module.exports = CurrentUserMenu;


//