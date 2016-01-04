import React               from 'react';
import { PlaylistTracker } from '../../mixins';
import Glyph               from '../Glyph';

var PlayAllButton = React.createClass({

  mixins: [ PlaylistTracker ],

  render: function() {
    var icon    = this.state.playlistOn ? 'stop' : 'play';
    var caption = this.state.playlistOn ? '' : ' play all';
    return(<button className="play-all-button btn btn-sm btn-info" onClick={this.togglePlay}><Glyph icon={icon} />{caption}</button>);
  }
});

module.exports = PlayAllButton;

//