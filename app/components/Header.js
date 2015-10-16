var React          = require('react');
var ReactBootstrap = require('react-bootstrap');
var Glyph          = require('./Glyph');

var Nav            = ReactBootstrap.Nav;
var NavItem        = ReactBootstrap.NavItem;
var Navbar         = ReactBootstrap.Navbar;
var MenuItem       = ReactBootstrap.MenuItem;
var NavDropdown    = ReactBootstrap.NavDropdown;
var NavBrand       = ReactBootstrap.NavBrand;
var CollapsibleNav = ReactBootstrap.CollapsibleNav;
var Button         = ReactBootstrap.Button;
var Input          = ReactBootstrap.Input;

const LoadingGlyph = React.createClass({

  render: function() {
    if( this.props.loading ) {
      return <NavItem><Glyph icon="spinner" pulse/></NavItem>
    } else {
      return <NavItem></NavItem>
    }
  }  
});

const SearchButton = React.createClass({

  render: function() {
    return (
      <Button bsStyle="link">Go <Glyph icon="search" /></Button>
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
    //         groupClassName="form-group input-group input-group-small"

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
        <NavBrand><a href="/"><img src="images/logo.png" title="dig.ccMixter" /></a></NavBrand>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <LoadingGlyph loading={loading} />
          </Nav>
          <div className="navbar-form navbar-right">          
            <SearchBox />
          </div>
          <Nav navbar right>
            <NavItem eventKey={2} href="#">how it works</NavItem>
            <NavItem eventKey={3} href="#">licenses</NavItem>
            <NavItem eventKey={4} href="#">dig deep <Glyph icon="tags" /></NavItem>
            <NavDropdown eventKey={5} title="featured" id="basic-nav-dropdown">
              <MenuItem eventKey="1"><Glyph fixed icon="film" /> music for film </MenuItem>
              <MenuItem eventKey="2"><Glyph fixed icon="gamepad" /> music for games </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="3"><Glyph fixed icon="beer" /> free for commercial use</MenuItem>
              <MenuItem eventKey="4"><Glyph fixed icon="usd" /> royalty free licensed</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="5"><Glyph fixed icon="thumbs-o-up" /> editors picks</MenuItem>
            </NavDropdown>            
          </Nav>          
        </CollapsibleNav>
      </Navbar>
    );
  },

});

module.exports = Header;