import React            from 'react';
import Glyph            from '../vanilla/Glyph';
import InlineCSS        from '../vanilla/InlineCSS';
import DropdownMenu     from '../vanilla/DropdownMenu';
import css              from './style/upload-menu';

import AddToPlaylist    from '../playlists/AddToPlaylist';
import Share            from '../SharePopup';

import {CurrentUserTracker} from '../../mixins';

class UploadMenu extends CurrentUserTracker(React.Component)
{
  render() {
    const { userLoading, user, user:{isAdmin=false}  = {} } = this.state;

    if( userLoading ) {
      return null;
    }

    const { store, store:{model:{upload}} } = this.props;

    return (
      <div>
        <InlineCSS css={css} id="button-menu-css" />
        <DropdownMenu className="navbar-right" id="upload-menu" bars parentType="div">
            {user && <li><AddToPlaylist store={store} /></li>}
            <li><a href="#"><Glyph fixed icon="flag" />{" Report"}</a></li>
            <li><Share model={upload} bare caption fixed /></li>
            {isAdmin && <li><a href="#"><Glyph fixed icon="minus-circle" />{" Ban"}</a></li>}
        </DropdownMenu>
      </div>
     );
  }
}

module.exports = UploadMenu;

//