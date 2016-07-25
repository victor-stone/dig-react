import React        from 'react';
import Glyph        from '../vanilla/glyph';
import DeadLink     from '../vanilla/dead-link';
import { oassign }  from '../../unicorns';
import AudioService from '../../services/audio-player';
import env          from '../../services/env';

const PlayControls = React.createClass({

  getInitialState: function() {
    return oassign( {}, this.props.controls );
  },

  componentWillReceiveProps(props) {
    this.setState( oassign( {}, props.controls ) );
  },

  playPrevious() {
    AudioService.playPrevious();
  },

  togglePause() {
    AudioService.togglePause();
  },

  playNext() {
    AudioService.playNext();
  },

  render: function() {

    const { hasPrev, hasNext, isPlaying, isPaused } = this.state;

    var prevClass    = 'btn play-previous ' + ( hasPrev ? '' : 'disabled' );
    var nextClass    = 'btn play-next '     + ( hasNext ? '' : 'disabled' );
    var playIcon     = (isPlaying && !isPaused) ? 'pause' : 'play';
    var canPlaylist  = env.supportPlaylist;

    return (
      <div className="controls">
        {canPlaylist && <DeadLink onClick={this.playPrevious} className={prevClass} ><Glyph icon="backward" /></DeadLink>}
        <DeadLink onClick={this.togglePause}  className="btn play"  ><Glyph icon={playIcon} /></DeadLink>
        {canPlaylist && <DeadLink onClick={this.playNext} className={nextClass}><Glyph icon="forward" /></DeadLink>}
      </div>
    );
  },

});


module.exports = PlayControls;

