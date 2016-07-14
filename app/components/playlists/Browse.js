import React                   from 'react';
import PlaylistList            from '../bound/PlaylistList';
import InlineCSS               from '../vanilla/InlineCSS';
import { browse as browseCSS,
         tags   as tagsCSS }   from './style/browse';
import { Row,
         Container,
         Column }     from '../vanilla/Grid';


function BrowsePlaylists(props)
{
    const { store, skipUser } = props;
    return (
      <Container className="playlist-browser">
        <InlineCSS css={browseCSS + tagsCSS} id="playlists-browse-css"/>
        <Row>
          <Column cols="8" offset="2">
            <PlaylistList store={store} skipUser={skipUser} />
          </Column>
        </Row>
      </Container>
    );      
}

module.exports = BrowsePlaylists;
