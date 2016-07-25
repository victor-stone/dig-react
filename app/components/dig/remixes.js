import React              from 'react';

import AudioPlayerService from '../../services/audio-player';

import { ModelTracker }   from '../../mixins';

import NotALotHere        from './not-a-lot-here';
import RemixLine          from './remix-line';

import { Row,
         Container,
         Column }      from '../vanilla/grid';

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

