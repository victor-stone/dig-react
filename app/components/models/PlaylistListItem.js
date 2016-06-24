import React                 from 'react';
import LinkToPlaylist        from '../services/LinkToPlaylistRoute';
import LinkToPeople          from '../services/LinkToPeopleRoute';
import { StaticTagsList }    from './Tags';
import PlayAllButton         from '../services/PlayAllButton';

function CuratorLink(props) {
  const { model: {curator}} = props;
  return <div className="playlist-curator">{"curator: "}<LinkToPeople model={curator} suburl="playlists" /></div>;
}

function PlaylistListItem(props)
{
  const { model, skipUser, model: {tags} } = props;
    return (
        <li >
          <PlayAllButton playlist={model} />
          <LinkToPlaylist model={model} />
          {!skipUser && <CuratorLink model={model} />}
          <StaticTagsList floating model={tags} />
        </li>
      );
}

module.exports = PlaylistListItem;

