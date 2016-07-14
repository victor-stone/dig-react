import React              from 'react';
import DownloadPopup      from '../DownloadPopup';
import LinkToPeople       from '../services/LinkToPeopleRoute';
import { PlayButton }     from '../AudioPlayer';
import AudioPlayerService from '../../services/audio-player';
import { ModelTracker }   from '../../mixins';

import { ResetOptionsButton } from '../QueryOptions';
import LinkToUpload           from '../services/LinkToUploadRoute';
import { Row,
         Container,
         FluidContainer,
         Column }     from '../vanilla/Grid';

const MIN_LIMIT = 10;

var RemixLine = React.createClass({

  render: function() {
    const { upload, skipUser, onPlay, upload:{artist} } = this.props;

    return ( 
      <li className="clearfix" >
        <PlayButton model={upload} onPlay={onPlay}/>{" "}
        <DownloadPopup model={upload} />{" "} 
        <LinkToUpload className="song-title" model={upload} truncate />{" "}
        {!skipUser && <LinkToPeople className="artist-name light-color" model={artist} />}
      </li>
    );
  },

});

class NotALotHere extends ModelTracker(React.Component)
{

  stateFromStore(store) {
    var model = store.model;
    var showNotALot = model.total < MIN_LIMIT && store.paramsDirty();
    return { showNotALot };    
  }

  render() {

    if( !this.state.showNotALot ) {
      return null;
    }

    return (
      <FluidContainer className="no-hit-suggestion">
          <Row>
            <Column cols="6" offset="3">
              <div className="jumbotron empty-query">
                <h3>{"eh, not a lot here..."}</h3>
                  <ul>
                      <li>
                          {"You might consider resetting the options "}
                          <ResetOptionsButton store={this.props.store} />
                      </li>
                  </ul>
              </div>
            </Column>
          </Row>
        </FluidContainer>
      );
  }
}

class RemixContainer extends ModelTracker(React.Component)
{
  constructor() {
    super(...arguments);
    this.onPlay = this.onPlay.bind(this);
  }

  stateFromStore(store) {
    return { model: store.model };
  }

  onPlay() {
    AudioPlayerService.playlistURL = '/nowplaying';
    AudioPlayerService.playlist = this.state.model.items;
  }

  render() {
    const { model:{items} } = this.state;
    const { remixLine, skipUser } = this.props;

    const remixLines = items.map( (upload,index) =>
        React.createElement(remixLine,
                {
                  key: upload.id,
                  upload,
                  skipUser,
                  onPlay: this.onPlay,
                  index
                })
    );

    return <ul className="play-list">{remixLines}</ul>;
  }
}

RemixContainer.defaultProps = { skipUser: false };

var Remixes = React.createClass({

  render() {
    return( 
      <Container>
        <Row>
          <Column md={{cols:9,offset:2}} sm="12" >
            {this.props.children}
            <RemixContainer store={this.props.store} remixLine={RemixLine} />
          </Column>
        </Row>
      </Container>      
      );
  }
});

module.exports = Object.assign( Remixes, {
  NotALotHere,
  RemixContainer
});

