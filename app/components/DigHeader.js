import React     from 'react';
import Link      from './Link';
import SearchBox from './SearchBox';

import Glyph        from './Glyph';
import LoadingGlyph from './LoadingGlyph';
import NavbarHeader from './NavbarHeader';


var router = null;

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
        <a  href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{"featured "}<Glyph icon="chevron-down" /></a>
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

  submitSearch: function(text) {
    if( !router ) { // avoid require() recursion
      router = require('../services/router');
    }
    router.navigateTo( '/search?searchp=' + text );
  },

  render: function() {
    return  ( 
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavbarHeader title="dig.ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">
              <ul className="nav navbar-nav">
                <li><LoadingGlyph /></li>    
              </ul>
              <div role="search" className="navbar-form navbar-right">
                <SearchBox submitSearch={this.submitSearch}/>
              </div>
              {NavbarRight}
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;

