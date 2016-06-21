import React                 from 'react';
import LinkToPlaylist        from '../services/LinkToPlaylistRoute';
import LinkToPeople          from '../services/LinkToPeopleRoute';
import { StaticTagList }     from './Tags';
import PlayAllButton         from '../services/PlayAllButton';

function CuratorLink(props) {
  return <div className="playlist-curator">{"curator: "}<LinkToPeople model={props.model.curator} suburl="playlists" /></div>;
}

function PlaylistListItem(props)
{
    var model = props.model;
    return (
        <li >
          <PlayAllButton playlist={model} />
          <LinkToPlaylist model={model} />
          {!this.props.skipUser && <CuratorLink model={model} />}
          <StaticTagList model={model.tags} />
        </li>
      );
}

module.exports = PlaylistListItem;

