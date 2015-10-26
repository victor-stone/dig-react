import React from 'react';
import Glyph from './Glyph';
import Link  from './Link';

const LoadingGlyph = React.createClass({

  render: function() {
    if( !this.props.loading ) {
      return null;
    }
    return( <Glyph icon="spinner" pulse /> );
  }  
});

var router = null;

const SearchBox = React.createClass({

 getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  onKey: function(e) {
    if( e.keyCode === 13 ) {
      this.submitSearch();
    }
  },

  submitSearch: function() {
    var text = this.state.value;
    if( !router ) { // avoid require() recursion
      router = require('../services/router');
    }
    router.navigateTo( '/search?searchp=' + text );
  },

  render: function() {

    return (
      <div className="form-group input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            value={this.state.value}
            placeholder="genre, instrument, etc."
            onChange={this.handleChange}
            onKeyDown={this.onKey}
            ref="input"
            size="30"
            id="searchText"
          />
        <span className="input-group-addon">              
          <a href="#" onClick={this.submitSearch} ><Glyph icon="search" /></a>
        </span>
      </div>      
    );
},

});

const NavbarHeader = (
  <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#dig-collapse" aria-expanded="false">
    <span className="sr-only">{"Toggle navigation"}</span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    <span className="icon-bar"></span>
    </button>
    <Link href="/" className="navbar-brand"><img src="/images/logo.png" title="dig.ccMixter" /></Link>
  </div>
);

const NavbarRight = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link href="/#howitworks">{"how it works"}</Link>
      </li>
      <li>
        <Link href="/licenses">{"licenses"}</Link>
      </li>
      <li className="hidden-xs hidden-sm">
        <Link href="/dig">{"dig deep "}<Glyph icon="tags" /></Link>
      </li>
      <li>
        <a  href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{"Featured "}<Glyph icon="chevron-down" /></a>
        <ul className="dropdown-menu">
          <li><Link href="/film"><Glyph fixed icon="film" />{" music for film"}</Link></li>
          <li><Link href="/games"><Glyph fixed icon="gamepad" /> {"music for games"}</Link></li>
          <li className="divider"></li>            
          <li><Link href="/free"><Glyph fixed icon="beer" />{" free for commercial use"}</Link></li>
          <li><Link href="/ccplus"><Glyph fixed icon="usd" /> {"royalty free licensed"}</Link></li>
          <li className="divider"></li>            
          <li><Link href="/edpicks"><Glyph fixed icon="thumbs-o-up" /> {" editors picks"}</Link></li>
        </ul>            
      </li>
    </ul>    
);

const Header = React.createClass({

 getInitialState() {
    return {
      isLoading: false
    };
  },

  render: function() {
    let loading = this.state.isLoading;

    return  ( 
<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    {NavbarHeader}
    <div className="collapse navbar-collapse" id="dig-collapse">
      <ul className="nav navbar-nav">
        <li><LoadingGlyph loading={loading} /></li>    
      </ul>
      <div role="search" className="navbar-form navbar-right">
        <SearchBox />
      </div>
      {NavbarRight}
    </div>
  </div>
</nav>
);
  },

});

module.exports = Header;

