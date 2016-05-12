import React        from 'react';
import Login        from './Login';
import Link         from '../Link';
import Glyph        from '../Glyph';
import LoadingGlyph from '../LoadingGlyph';
import NavbarHeader from '../NavbarHeader';
import events       from '../../models/events';
import lookup                    from '../../services';
import { CurrentUserTracker }    from '../../mixins';
import { DeadLink }              from '../ActionButtons';
import CurrentUserMenu           from '../CurrentUserMenu';

const UserMenu = React.createClass({

  mixins: [CurrentUserTracker],

  onLogout() {
    alert('logging out');
  },

  onLogin() {
    //this.setState( { showLogin: true } );
    lookup('env').emit( events.REQUEST_MODAL, Login );
  },

  render() {

    var user    = this.state.user;
    var loading = this.state.userLoading;
    var id      = user && user.id;
    var playurl = '/people/' + id + '/playlists';

    return (
        <li>
          <CurrentUserMenu model={user} loading={loading} onLogin={this.onLogin} >
            <Link href={'/people/' + id}><Glyph fixed icon="circle" />{" your profile"}</Link>
            <a target="_blank" href="http://ccmixter.org/submit"><Glyph fixed icon="cloud-upload" />{" submit files"}</a>
            <CurrentUserMenu.Divider />
            <Link href={playurl}><Glyph fixed icon="music" />{" your playlists"}</Link>
            <Link href="/playlists/new"><Glyph fixed icon="bolt" />{" new dynamic playlist"}</Link>
            <CurrentUserMenu.Divider />
            <DeadLink onClick={this.onLogout}><Glyph fixed icon="circle-o" />{" log out"}</DeadLink>
          </CurrentUserMenu>
        </li>
      );
  }
});

const Header = React.createClass({

  displayName: 'Header',

  componentWillMount() {
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
            <NavbarHeader title="ccMixter" />
            <div className="collapse navbar-collapse" id="dig-collapse">

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link href="#"><LoadingGlyph /></Link>
                </li>
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
