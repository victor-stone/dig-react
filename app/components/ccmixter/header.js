/* global $ */
import React    from 'react';
import events   from 'models/events';
import lookup   from '../../services';

import AjaxLoadingGlyph    from '../services/ajax-loading-glyph';

import Link            from '../services/link-to-route';
import NavbarHeader    from '../vanilla/navbar-header';
import DeadLink        from '../vanilla/dead-link';

import UserMenu from './user-menu';

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
    const base = (Array.isArray(specs.path) ? specs.path[0] : specs.path).match(/\/[^\/]+/)[0];
    $('.top-navbar li').removeClass('active');
    base.length && $(`li[data-routeroot*='${base}']`).addClass('active');
  }

  render() {
    const homeLink = <Link href="/" className="navbar-brand"><img src="/images/logo.png" title={this.props.title} /></Link>;
    return  (        
        <nav className="navbar navbar-inverse top-navbar">
    <div className="hidden-xs hidden-sm" style={{
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
                <li  data-routeroot="/tree/files">
                  <Link href="/tree">{"remix tree"}</Link>
                </li>
                <li data-routeroot="/stems" className="hidden-xs hidden-sm">
                  <Link href="/stems">{"stems"}</Link>
                </li>
                <li data-routeroot="/pells" className="hidden-xs hidden-sm">
                  <Link href="/pells">{"pells"}</Link>
                </li>
                <li data-routeroot="/playlist">
                  <Link href="/playlists/browse">{"playlists"}</Link>
                </li>
                <li data-routeroot="/news/event">
                  <Link href="/events">{"events"}</Link>
                </li>
                <li data-routeroot="/license">
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
