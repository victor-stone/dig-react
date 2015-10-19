import React from 'react';
import Glyph from './Glyph';
import { Link } from 'react-router';

import {
  Nav,
  NavItem,
  Navbar,
  MenuItem,
  NavDropdown,
  NavBrand,
  CollapsibleNav,
  Button,
  Input
} from 'react-bootstrap';

const MenuLink = React.createClass({

  render: function() {
    var to = this.props.to;
    return (
      <li role="presentation">
        <Link role="menuitem" href to={to}>{this.props.children}</Link>
      </li>
      );
  },

});

const LoadingGlyph = React.createClass({

  render: function() {
    if( this.props.loading ) {
      return <ul><Glyph icon="spinner" pulse /></ul>
    } else {
      return <ul></ul>
    }
  }  
});

const SearchButton = React.createClass({

  render: function() {
    return (
      <Button bsStyle="primary">Go <Glyph icon="search" /></Button>
      );
  },

});

const SearchBox = React.createClass({

 getInitialState() {
    return {
      value: ''
    };
  },

  render: function() {

    return (
     <Input
        type="text"
        value={this.state.value}
        placeholder="genre, instrument, etc."
        ref="input"
        bsSize="small"
        addonAfter={SearchButton}
     />
    );
},

});

const Header = React.createClass({

 getInitialState() {
    return {
      isLoading: false
    };
  },

  render: function() {
    let loading = this.state.isLoading;

    return  (
      <Navbar inverse fluid toggleNavKey={0}>
        <NavBrand><Link to="/"><img src="images/logo.png" title="dig.ccMixter" /></Link></NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LoadingGlyph loading={loading} />
          </Nav>
          <div className="navbar-form navbar-right">          
            <SearchBox />
          </div>
          <Nav navbar right>
            <MenuLink to="/#howitworks">how it works</MenuLink>
            <MenuLink to="/licenses">licenses</MenuLink>
            <MenuLink to="/dig">dig deep <Glyph icon="tags" /></MenuLink>
            <NavDropdown eventKey={5} title="featured" id="basic-nav-dropdown">
              <MenuLink to="/film"><Glyph fixed icon="film" /> music for film </MenuLink>
              <MenuLink to="/games"><Glyph fixed icon="gamepad" /> music for games </MenuLink>
              <MenuItem divider />
              <MenuLink to="/free"><Glyph fixed icon="beer" /> free for commercial use</MenuLink>
              <MenuLink to="/ccplus"><Glyph fixed icon="usd" /> royalty free licensed</MenuLink>
              <MenuItem divider />
              <MenuLink to="/edpicks"><Glyph fixed icon="thumbs-o-up" /> editors picks</MenuLink>
            </NavDropdown>            
          </Nav>          
        </CollapsibleNav>
      </Navbar>
    );
  },

});

module.exports = Header;

