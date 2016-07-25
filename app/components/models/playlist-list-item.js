import React                 from 'react';
import LinkToPlaylist        from '../services/link-to-playlist-route';
import LinkToPeople          from '../services/link-to-people-route';
import { StaticTagsList }    from './tags';
import PlayAllButton         from '../services/play-all-button';

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

