import React        from 'react';
import Link         from '../Link';
import Glyph        from '../Glyph';
import SearchBox    from '../SearchBox';
import LoadingGlyph from '../LoadingGlyph';
import NavbarHeader from '../NavbarHeader';
import services     from '../../services';


const Header = React.createClass({

  displayName: 'Header',

  submitSearch: function(text) {
    var router = services('router');
    router.navigateTo( '/search?searchp=' + text );
  },

  render: function() {

    return  (        
        <nav className="navbar navbar-inverse top-navbar">
          <div className="container-fluid">
            <NavbarHeader title="stems.ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">
              <div role="search" className="navbar-form navbar-right">
                <SearchBox submitSearch={this.submitSearch} placeholder="genre, instrument, etc." />
              </div>      
              <ul className="nav navbar-nav navbar-right">
                <li><Link href="#"><LoadingGlyph /></Link></li>
                <li>
                  <Link href="/tree">{"tree"}</Link>
                </li>
                <li>
                  <Link href="/licenses">{"licenses"}</Link>
                </li>
                <li>
                  <Link href="/aboutFLAC">{"about FLAC"}</Link>
                </li>
                <li>
                  <Link href="/stems"><Glyph icon="tags" />{" tag search"}</Link>
                </li>
      <li>
        <a  href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{"featured "}<Glyph icon="chevron-down" /></a>
        <ul className="dropdown-menu featured-menu">
          <li><Link href="/people/djvadim"><span className="imgh"><img src="/images/vadim.png" /></span>{" dj vadim"}</Link></li>
          <li><Link href="/people/buckyjonson"><span className="imgh"><img src="/images/bucky.png" /></span>{" bucky jonson"}</Link></li>
          <li><Link href="/news/152947"><span className="imgh"><img src="/images/ghostk.jpg" /></span>{" Ghost_k"}</Link></li>
          <li><Link href="/people/stateshirt"><span className="imgh"><img src="/images/statesh.jpg" /></span>{" state shirt"}</Link></li>
          <li><Link href="/news/38184"><span className="imgh"><img src="/images/trifonic.jpg" /></span>{" trifonic"}</Link></li>
        </ul>            
      </li>
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;
