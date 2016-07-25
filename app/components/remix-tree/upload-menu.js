import React            from 'react';
import Glyph            from '../vanilla/glyph';
import InlineCss        from '../vanilla/inline-css';
import DropdownMenu     from '../vanilla/dropdown-menu';
import css              from './style/upload-menu';

import AddToPlaylist    from '../playlists/add-to-playlist';
import Share            from '../share-popup';

import {CurrentUserTracker} from '../../mixins';


class UploadMenu extends CurrentUserTracker(React.Component)
{
  constructor() {
    super(...arguments);
  }

  render() {
    const { userLoading, user, user:{isAdmin=false}  = {} } = this.state;

    if( userLoading ) {
      return null;
    }

    const { store, store:{model:{upload}} } = this.props;

    return (
      <div>
        <InlineCss css={css} id="button-menu-css" />
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