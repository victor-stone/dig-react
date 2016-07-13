import React     from 'react';
import Link      from '../services/LinkToRoute';
import SearchBox from '../SearchBox';

import Glyph        from '../vanilla/Glyph';
import DeadLink     from '../vanilla/DeadLink';
import NavbarHeader from '../vanilla/NavbarHeader';
import DropdownMenu from '../vanilla/DropdownMenu';

import AjaxLoadingGlyph from '../services/AjaxLoadingGlyph';

const NavbarRight = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link href="/keep-ccmixter-open-and-free"><i className="fa fa-heart"></i>{" donate"}</Link>
      </li>
      <li>
        <Link href="/#howitworks">{"how it works"}</Link>
      </li>
      <li>
        <Link href="/licenses">{"licenses"}</Link>
      </li>
      <li className="hidden-xs hidden-sm">
        <Link href="/dig"><Glyph icon="tags" />{" tag search"}</Link>
      </li>
      <DropdownMenu head="featured">
          <li><Link href="/film"><Glyph fixed icon="film" />{" music for film"}</Link></li>
          <li><Link href="/games"><Glyph fixed icon="gamepad" /> {"music for games"}</Link></li>
          <li className="divider"></li>            
          <li><Link href="/free"><Glyph fixed icon="beer" />{" free for commercial use"}</Link></li>
          <li><Link href="/ccplus"><Glyph fixed icon="usd" /> {"royalty free licensed"}</Link></li>
      </DropdownMenu>            
    </ul>    
);


// function homeLink() {
//   return( <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={this.props.titles} /></Link> );
// }

const Header = React.createClass({

  submitSearch(text) {
    Link.navigateTo( '/search?searchp=' + text );
  },

  render: function() {
    var homeLink = <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={this.props.title} /></Link>;

    return  ( 
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavbarHeader title="dig.ccMixter" homeLink={homeLink}/>
            <div className="collapse navbar-collapse" id="dig-collapse">
              <ul className="nav navbar-nav">
                <li><DeadLink><AjaxLoadingGlyph /></DeadLink></li>    
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

