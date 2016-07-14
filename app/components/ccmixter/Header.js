import React                  from 'react';
import events                 from '../../models/events';
import lookup                 from '../../services';
import api                    from '../../services/ccmixter';
import { CurrentUserTracker } from '../../mixins';
import { bindAll }            from '../../unicorns';

import AjaxLoadingGlyph    from '../services/AjaxLoadingGlyph';

import Link            from '../services/LinkToRoute';
import LinkToPeople    from '../services/LinkToPeopleRoute';
import Glyph           from '../vanilla/Glyph';
import FeedBadge       from '../services/FeedBadge';
import NavbarHeader    from '../vanilla/NavbarHeader';
import DeadLink        from '../vanilla/DeadLink';
import CurrentUserMenu from '../services/CurrentUserMenu';
import Alert           from '../services/Alert';
import Login           from './Login';

class UserMenu extends CurrentUserTracker(React.Component)
{
  constructor() {
    super(...arguments);
    bindAll(this,'onLogout','onLogin');
  }

  onLogout() {
    api.user.logout().then( () => {
      Alert.show('success', 'you are now logged out');
    });
  }

  onLogin() {
    Login.show( Login );
  }

  render() {

    const { user, userLoading } = this.state;

    return (
        <CurrentUserMenu feedbadge model={user} loading={userLoading} onLogin={this.onLogin} >
          {user && <Link href={LinkToPeople.feedUrl(user)}><Glyph fixed icon="feed" />{" your feed "}<FeedBadge /></Link>}
          {user && <LinkToPeople model={user}><Glyph fixed icon="circle" />{" your profile"}</LinkToPeople>}
          <a target="_blank" href="http://ccmixter.org/submit"><Glyph fixed icon="cloud-upload" />{" submit files"}</a>
          <CurrentUserMenu.Divider />
          {user && <Link href={LinkToPeople.playlistsUrl(user)}><Glyph fixed icon="music" />{" your playlists"}</Link>}
          <Link href="/playlists/new"><Glyph fixed icon="bolt" />{" new dynamic playlist"}</Link>
          <CurrentUserMenu.Divider />
          <DeadLink onClick={this.onLogout}><Glyph fixed icon="circle-o" />{" log out"}</DeadLink>
        </CurrentUserMenu>
      );
  }
}

class Header extends React.Component
{
  constructor() {
    super(...arguments);
    this.onNavigateTo = this.onNavigateTo.bind(this);
  }

  componentWillMount() {
    /*
        Ths is beta code -- we don't want crawlers digging 
        around the site for now
    */
    if( global.IS_SERVER_REQUEST ) {
      return;
    }
    lookup('router').on( events.NAVIGATE_TO, this.onNavigateTo );
  }
  
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
  }

  render() {
    const homeLink = <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={this.props.title} /></Link>;
    return  (        
        <nav className="navbar navbar-inverse top-navbar">
    <div style={{
      position: 'absolute',
      width: 100,
      top: 10,
      zIndex: 200,
      left: 300,
      padding: 6,
      background: 'white',
      textAlign: 'center',
      borderRadius: 8,
      letterSpacing: 2,
      fontWeight: 500}}
    >{"BETA"}</div>
          <div className="container-fluid">
            <NavbarHeader title="ccMixter" homeLink={homeLink} />
            <div className="collapse navbar-collapse" id="dig-collapse">

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <DeadLink><AjaxLoadingGlyph /></DeadLink>
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
                <li id="events_menu_tab">
                  <Link href="/events">{"events"}</Link>
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
  }

}

module.exports = Header;
