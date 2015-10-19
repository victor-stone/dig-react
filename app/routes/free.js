'use strict';

import React from 'react';
import Playlist from '../components/Playlist';
import query from '../stores/query';

const free = React.createClass({

  render() {
    return (
      <div className="playlist">
        <h1>Free stuff</h1>
        <Playlist model={this.props.model} />
      </div>
    );      
  },

});

free.model = function(params,queryParams) {
   var qparams = { lic: 'open', limit: queryParams.limit || 10  };
   return query.playlistWithCount(qparams);
}

module.exports = free;

