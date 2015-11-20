import React        from 'react';
import Glyph        from '../Glyph';
import { oassign }  from '../../unicorns';
import AudioService from '../../services/audio-player';

const PlayControls = React.createClass({

  getInitialState: function() {
    return oassign( {}, this.props.controls );
  },

  componentWillReceiveProps: function(props) {
    this.setState( oassign( {}, props.controls ) );
  },

  playPrevious: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioService.playPrevious();
  },

  togglePause: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioService.togglePause();
  },

  playNext: function(e) {
    e.stopPropagation();
    e.preventDefault();
    AudioService.playNext();
  },

  render: function() {

    var prevClass    = 'btn play-previous ' + ( this.state.hasPrev ? '' : 'disabled' );
    var nextClass    = 'btn play-next '     + ( this.state.hasNext ? '' : 'disabled' );
    var playIcon     = (this.state.isPlaying && !this.state.isPaused) ? 'pause' : 'play';
    var canPlaylist  = AudioService.supportPlaylist;

    return (
      <div className="btn-group pull-left">
        {canPlaylist
          ? <a href="#" onClick={this.playPrevious} className={prevClass} >
              <Glyph icon="backward" />
            </a>
          : null
        }
          <a href="#" onClick={this.togglePause}  className="btn play"  >
            <Glyph icon={playIcon} />
          </a>
        {canPlaylist
          ? <a href="#" onClick={this.playNext}     className={nextClass}>
              <Glyph icon="forward" />
            </a>
          : null
        }
      </div>
    );
  },

});


module.exports = PlayControls;

