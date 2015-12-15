/*eslint "react/no-danger":0 */
import React      from 'react';
import Tags       from './Tags';
import { Link }   from '../People';
import SharePopup from '../SharePopup';

function ShareLink(model) {
  return 'http://playlists.ccmixter.org/playlist/browse/' + model.id;
}

var Info = React.createClass({

  render: function() {
    var model       = this.props.store.model.head;
    var description = { __html: model.description ? model.description.replace(/http:\/\/ccmixter.org\/playlist\/browse/g,'/playlist/browse' ) : '' };

    return (
        <div className="playlist-info hidden-xs hidden-sm">
          <div className="playlist-curator">
            <span>{"curator: "}</span>
            <Link model={model.curator} avatar />
          </div>
          <SharePopup model={model} modelLink={ShareLink} />
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