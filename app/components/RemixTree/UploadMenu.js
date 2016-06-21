import React            from 'react';
import Glyph            from '../vanilla/Glyph';
import InlineCSS        from '../InlineCSS';
import css              from './style/upload-menu';
import AddToPlaylist    from './actions/AddToPlaylist';
import Share            from '../SharePopup';
import {CurrentUserTracker} from '../../mixins';

var UploadMenu = React.createClass({

  mixins: [CurrentUserTracker],

  render() {
    if( this.state.userLoading ) {
      return null;
    }
    var store = this.props.store;
    var user = this.state.user;

    return (
      <div>
        <InlineCSS css={css} id="button-menu-css" />
        <div className="navbar-right dropdown" id="upload-menu">
          <a href="#" id="upload-menu" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </a>
          <ul className="dropdown-menu">
            {user
              ? <li><AddToPlaylist store={store} /></li>
              : null
            }            
            <li><a href="#"><Glyph fixed icon="flag" />{" Report"}</a></li>
            <li><Share model={store.model.upload} bare caption fixed /></li>
            {user && user.isAdmin
              ? <li><a href="#"><Glyph fixed icon="minus-circle" />{" Ban"}</a></li>
              : null
            }            
          </ul>
        </div>
      </div>
     );
  }
});

module.exports = UploadMenu;

//