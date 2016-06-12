import React            from 'react';
import { UploadOwner }  from '../../mixins';
import Glyph            from '../Glyph';
import InlineCSS        from '../InlineCSS';
import css              from './style/upload-menu';
import AddToPlaylist    from './actions/AddToPlaylist';

var UploadMenu = React.createClass({

  mixins: [ UploadOwner ],

  render() {
    var o = this.state.owner;
    var store = o.store;

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
            {o.user
              ? <li><AddToPlaylist store={store} user={o.user}/></li>
              : null
            }            
            <li><a href="#"><Glyph fixed icon="flag" />{" Report"}</a></li>
            <li><a href="#"><Glyph fixed icon="share-alt" />{" Share"}</a></li>
            {o.isAdmin
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