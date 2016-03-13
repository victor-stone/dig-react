import React        from 'react';
import Link         from '../Link';
import Glyph        from '../Glyph';
import LoadingGlyph from '../LoadingGlyph';
import NavbarHeader from '../NavbarHeader';

import { CurrentUserTracker }    from '../../mixins';
import { CurrentUserMenu,
         CurrentUserMenuHead }   from '../CurrentUserMenu';

var ccMixterUserMenu = React.createClass({

  mixins: [CurrentUserTracker],

  render: function() {

    var user    = this.state.user;
    var loading = this.state.userLoading;
    var id      = user && user.id;

    return (
        <li>
          <CurrentUserMenuHead model={user} loading={loading} />
          <CurrentUserMenu model={user} >
            <li><Link href={'/people/' + id}><Glyph fixed icon="music" />{" your profile"}</Link></li>
            <li><a target="_blank" href="http://ccmixter.org/submit"><Glyph fixed icon="bolt" />{" submit files"}</a></li>
          </CurrentUserMenu>
        </li>
      );
  }

});
const Header = React.createClass({

  displayName: 'Header',

  render: function() {

    return  (        
        <nav className="navbar navbar-inverse top-navbar">
          <div className="container-fluid">
            <NavbarHeader title="ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">

              <ul className="nav navbar-nav navbar-right">
                <li><Link href="#"><LoadingGlyph /></Link></li>
        <li>
          <Link href="/tree">{"remix tree"}</Link>
        </li>
                <li>
                  <Link href="/licenses">{"licenses"}</Link>
                </li>
                <ccMixterUserMenu />
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;
