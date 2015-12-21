/*eslint "react/no-danger":0 */
import React      from 'react';
import Tags       from './Tags';
import { Link }   from '../People';
import SharePopup from '../SharePopup';

import Glyph      from '../../components/Glyph';
import RLink      from '../../components/Link';

import { CurrentUserTracker } from '../../mixins';

var DeleteLink = React.createClass({

  mixins: [CurrentUserTracker],

  render: function() {
    var u     = this.state.user;
    var model = this.props.model;
    if( !u || model.curator.id !== u.id ) {
      return null;
    }

    var href = '/playlist/browse/' + model.id + '/delete';

    return (
        <RLink className="btn btn-danger" href={href}><Glyph icon="trash" />{" delete"}</RLink>
      );
  }
});


var EditLink = React.createClass({

  mixins: [CurrentUserTracker],

  render: function() {
    var u     = this.state.user;
    var model = this.props.model;
    if( !u || model.curator.id !== u.id ) {
      return null;
    }

    var href = '/playlist/browse/' + model.id + '/edit';

    return (
        <RLink className="btn btn-success" href={href}><Glyph icon="edit" />{" edit"}</RLink>
      );
  }
});

function ShareLink(model) {
  return 'http://playlists.ccmixter.org/playlist/browse/' + model.id;
}

var Info = React.createClass({

  render: function() {
    var model       = this.props.store.model.head;
    var description = { __html: model.description 
                                ? model.description.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' ) 
                                : '' };

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <div className="playlist-curator">
            <span>{"curator: "}</span>
            <Link model={model.curator} avatar />
          </div>
          <div className="action-btn-toolbar">
            <SharePopup model={model} modelLink={ShareLink} med />
            <EditLink model={model} />
            <DeleteLink model={model} />
          </div>
          <Tags model={model.tags} />
          {description
            ? <div className="playlist-description" dangerouslySetInnerHTML={description}></div>
            : null
          }
        </div>
      );
  }
});

module.exports = Info;

//