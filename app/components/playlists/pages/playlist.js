import React        from 'react';
import TrackList    from '../track-list';
import Name         from '../../properties/name';
import Info         from '../info';
import InlineCss    from '../../vanilla/inline-css';
import playlistCSS  from '../style/playlist';
import { bgColor }  from '../style/browse';

import { Row,
         FluidContainer,
         Column }     from '../../vanilla/grid';

function Playlist(props)
{
  var store = props.store;    
  return (
      <FluidContainer className="playlist-detail-page">
        <InlineCss css={playlistCSS + bgColor} id="playlist-detail-css" />
        <Name store={store} />
        <Row>
          <Column cols="3" offset="1">
            <Info store={store} />
          </Column>
          <Column cols="6">
            <TrackList store={store} />
          </Column>
        </Row>
      </FluidContainer>
    );
}

module.exports = Playlist;

//