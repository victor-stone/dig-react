import React        from 'react';
import Link         from '../Link';
import SearchBox    from '../SearchBox';
import LoadingGlyph from '../LoadingGlyph';
import NavbarHeader from '../NavbarHeader';
import services     from '../../services';
import Glyph        from '../Glyph';

import { CurrentUserTracker }    from '../../mixins';
import CurrentUserMenu           from '../CurrentUserMenu';

var PlaylistUserMenu = React.createClass({

  mixins: [CurrentUserTracker],

  render: function() {

    var user    = this.state.user;
    var loading = this.state.userLoading;
    var id      = user && user.id;

    return (
        <li>
          <CurrentUserMenu model={user} loading={loading} >
            <Link href={'/people/' + id + '/playlists?minitems=0&dynamic=1'}><Glyph fixed icon="music" />{" your playlists"}</Link>
            <Link href="/new"><Glyph fixed icon="bolt" />{" new dynamic playlist"}</Link>
          </CurrentUserMenu>
        </li>
      );
  }

});


const Header = React.createClass({

  submitSearch(text) {
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
                <li><a href="#"><LoadingGlyph /></a></li>    
                <li><a href="/keep-ccmixter-open-and-free"><Glyph icon="heart" />{" donate"}</a></li>
                <li>
                  <Link href="/featured">{"featured"}</Link>
                </li>
                <li>
                  <Link href="/browse">{"latest"}</Link>
                </li>
                <li>
                  <Link href="/curators">{"curators"}</Link>
                </li>
                <PlaylistUserMenu />
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;
