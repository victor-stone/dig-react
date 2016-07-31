import React         from 'react';
import Glyph         from '../vanilla/glyph';
import DeadLink      from '../vanilla/dead-link';
import DropdownMenu  from '../vanilla/dropdown-menu';
import FeedBadge     from './feed-badge';
import { ellipse,
         dataProps } from 'unicorns';
import thumbStyle    from '../services/people-thumb-style';

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

    const { loading, model:user } = this.state;

    if( loading) {
      return null;
    }

    const { onLogin, feedbadge } = this.props;

    if( !user ) {
      return (<li><DeadLink id="user-menu" onClick={onLogin}><Glyph icon="user" />{" log in"}</DeadLink></li>);
    }

    const { name } = user;

    const children = React.Children.map( this.props.children, c => c.type.name === 'MenuDivider' ? c : <li>{c}</li> );

    const head = <span>{ellipse(name,MAX_NAME_LEN)}{" "}{feedbadge && <FeedBadge />}</span>;

    const data = dataProps(this.props);

    return (
      <DropdownMenu id="user-menu" style={thumbStyle(user)} head={head} {...data} >
        {children}
      </DropdownMenu>
    );
  }

});

CurrentUserMenu.Divider = MenuDivider;

module.exports = CurrentUserMenu;


//