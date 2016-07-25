import React                   from 'react';
import PlaylistList            from '../bound/playlist-list';
import InlineCss               from '../vanilla/inline-css';
import { browse as browseCSS,
         tags   as tagsCSS }   from './style/browse';
import { Row,
         Container,
         Column }     from '../vanilla/grid';


function BrowsePlaylists(props)
{
    const { store, skipUser } = props;
    return (
      <Container className="playlist-browser">
        <InlineCss css={browseCSS + tagsCSS} id="playlists-browse-css"/>
        <Row>
          <Column cols="8" offset="2">
            <PlaylistList store={store} skipUser={skipUser} />
          </Column>
        </Row>
      </Container>
    );      
}

module.exports = BrowsePlaylists;
