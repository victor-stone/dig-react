import React                  from 'react';
import events                 from '../../models/events';
import lookup                 from '../../services';
import api                    from '../../services/ccmixter';
import { CurrentUserTracker } from '../../mixins';

import Link            from '../services/LinkToRoute';
import Glyph           from '../vanilla/Glyph';
import FeedBadge       from '../services/FeedBadge';
import LoadingGlyph    from '../services/LoadingGlyph';
import NavbarHeader    from '../vanilla/NavbarHeader';
import DeadLink        from '../vanilla/DeadLink';
import CurrentUserMenu from '../services/CurrentUserMenu';
import Alert           from '../services/Alert';
import Login           from './Login';

function homeLink(props) {
  return( <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={props.titles} /></Link> );
}

const UserMenu = React.createClass({

  mixins: [CurrentUserTracker],

  onLogout() {
    api.user.logout().then( () => {
      Alert.show('success', 'you are now logged out');
    });
  },

  onLogin() {
    Login.show( Login );
  },

  render() {

    var user    = this.state.user;
    var loading = this.state.userLoading;
    var id      = user && user.id;
    var playurl = '/people/' + id + '/playlists';

    return (
        <CurrentUserMenu feedbadge model={user} loading={loading} onLogin={this.onLogin} >
          <Link href={'/feed/' + id}><Glyph fixed icon="feed" />{" your feed "}<FeedBadge /></Link>
          <Link href={'/people/' + id}><Glyph fixed icon="circle" />{" your profile"}</Link>
          <a target="_blank" href="http://ccmixter.org/submit"><Glyph fixed icon="cloud-upload" />{" submit files"}</a>
          <CurrentUserMenu.Divider />
          <Link href={playurl}><Glyph fixed icon="music" />{" your playlists"}</Link>
          <Link href="/playlists/new"><Glyph fixed icon="bolt" />{" new dynamic playlist"}</Link>
          <CurrentUserMenu.Divider />
          <DeadLink onClick={this.onLogout}><Glyph fixed icon="circle-o" />{" log out"}</DeadLink>
        </CurrentUserMenu>
      );
  }
});

const Header = React.createClass({

  componentWillMount() {
    /*
        Ths is beta code -- we don't want crawlers digging 
        around the site for now
    */
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    lookup('router').on( events.NAVIGATE_TO, this.onNavigateTo );
  },
  
  onNavigateTo(specs) {
    var base = specs.path.match(/\/([a-z]+)(\/|$)/);
    if( base && base.length > 1 ) {
      /* global $ */
      var $e = $('#' + base[1] + '_menu_tab');
      if( $e && !$e.hasClass('active') ) {
        $('.top-navbar li').removeClass('active');
        $e.addClass('active');
      }
    }
  },

  render: function() {

    return  (        
        <nav className="navbar navbar-inverse top-navbar">
          <div className="container-fluid">
            <NavbarHeader title="ccMixter" homeLink={homeLink} />
            <div className="collapse navbar-collapse" id="dig-collapse">

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <DeadLink><LoadingGlyph /></DeadLink>
                </li>
                                <li><Link href="/workbench">{"workbench"}</Link></li>

                <li  id="tree_menu_tab" >
                  <Link href="/tree">{"remix tree"}</Link>
                </li>
                <li id="stems_menu_tab" className="hidden-xs hidden-sm">
                  <Link href="/stems">{"stems"}</Link>
                </li>
                <li id ="pells_menu_tab" className="hidden-xs hidden-sm">
                  <Link href="/pells">{"pells"}</Link>
                </li>
                <li id="playlists_menu_tab">
                  <Link href="/playlists/browse">{"playlists"}</Link>
                </li>
                <li id="licenses_menu_tab">
                  <Link href="/licenses">{"licenses"}</Link>
                </li>
                <UserMenu />
              </ul>
            </div>
          </div>
        </nav>
      );
  },

});

module.exports = Header;
