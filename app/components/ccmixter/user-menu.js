import React                  from 'react';
import api                    from '../../services/ccmixter';
import { CurrentUserTracker } from '../../mixins';
import { bindAll }            from '../../unicorns';

import Link            from '../services/link-to-route';
import LinkToPeople    from '../services/link-to-people-route';
import Glyph           from '../vanilla/glyph';
import FeedBadge       from '../services/feed-badge';
import DeadLink        from '../vanilla/dead-link';
import CurrentUserMenu from '../services/current-user-menu';
import Alert           from '../services/alert';
import Login           from './login';

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
        <CurrentUserMenu feedbadge model={user} loading={userLoading} onLogin={this.onLogin} data-routeroot="/feed/people">
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

module.exports = UserMenu;
