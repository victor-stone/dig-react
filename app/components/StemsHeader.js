import React        from 'react';
import Link         from './Link';
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
                  <Link href="/stems">{"browse"}</Link>
                </li>
                <li>
                  <Link href="/news/aboutFLAC">{"about FLAC"}</Link>
                </li>
                <li>
                  <Link href="/licenses">{"licenses"}</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = StemsHeader;
