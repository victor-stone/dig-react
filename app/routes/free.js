'use strict';

import React from 'react';
import Playlist from '../components/Playlist';
import QueryMixin from '../mixins/queryMixin';

const free = React.createClass({

  mixins: [QueryMixin],

  componentDidMount: function() {
   var params = { lic: 'open', limit: 10  };
   this.getPlaylist(params);
  },

  render() {
    return (
      <div className="playlist">
        <h1>Free stuff</h1>
        <Playlist model={this.state.model} />
      </div>
    );      
  },

});

module.exports = free;

