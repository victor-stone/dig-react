import React        from 'react';
import Link         from '../Link';
import SearchBox    from '../SearchBox';
import LoadingGlyph from '../LoadingGlyph';
import NavbarHeader from '../NavbarHeader';
import services     from '../../services';
import Glyph        from '../Glyph';

const Header = React.createClass({

  displayName: 'Header',

  submitSearch: function(text) {
    var router = services('router');
    router.navigateTo( '/search?search=' + text );
  },

  render: function() {

    return  (        
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <NavbarHeader title="playlists.ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">
              <div role="search" className="navbar-form navbar-right">
                <SearchBox submitSearch={this.submitSearch} placeholder="genre, title, etc." />
              </div>      
              <ul className="nav navbar-nav navbar-right">
                <li><LoadingGlyph /></li>    
                <li><a href="http://ccmixter.org/keep-ccmixter-open-and-free"><Glyph icon="heart" />{" donate"}</a></li>
                <li>
                  <Link href="/featured">{"featured"}</Link>
                </li>
                <li>
                  <Link href="/browse">{"latest"}</Link>
                </li>
                <li>
                  <Link href="/curators">{"curators"}</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;
