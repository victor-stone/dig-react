import React        from 'react';
import Link         from './Link';
import Glyph        from './Glyph';
import SearchBox    from './SearchBox';
import LoadingGlyph from './LoadingGlyph';
import NavbarHeader from './NavbarHeader';
import services     from '../services';


const StemsHeader = React.createClass({

  displayName: 'StemsHeader',

  submitSearch: function(text) {
    var router = services('router');
    router.navigateTo( '/search?searchp=' + text );
  },

  render: function() {

    return  (        
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavbarHeader title="stems.ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">
              <div role="search" className="navbar-form navbar-right">
                <SearchBox submitSearch={this.submitSearch} placeholder="genre, instrument, etc." />
              </div>      
              <ul className="nav navbar-nav navbar-right">
                <li><Link href="#"><LoadingGlyph /></Link></li>
                <li>
                  <Link href="/licenses">{"licenses"}</Link>
                </li>
                <li>
                  <Link href="/aboutFLAC">{"about FLAC"}</Link>
                </li>
                <li>
                  <Link href="/stems">{"browse"}</Link>
                </li>
      <li>
        <a  href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{"featured "}<Glyph icon="chevron-down" /></a>
        <ul className="dropdown-menu">
          <li><Link href="/people/djvadim"><Glyph fixed icon="th-large" />{" dj vadim"}</Link></li>
          <li><Link href="/people/buckyjonson"><Glyph fixed icon="th-large" /> {"bucky jonson"}</Link></li>
          <li><Link href="/news/152947"><Glyph fixed icon="th-large" />{" _ghost collective"}</Link></li>
          <li><Link href="/people/stateshirt"><Glyph fixed icon="th-large" /> {"state shirt"}</Link></li>
          <li><Link href="/news/38184"><Glyph fixed icon="th-large" /> {" trifonic"}</Link></li>
        </ul>            
      </li>
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = StemsHeader;
