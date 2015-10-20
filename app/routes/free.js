'use strict';

import React from 'react';
import { Playlist, PageHeader, Paging } from '../components';
import query from '../stores/query';

const free = React.createClass({

  render() {
    var offset = this.props.queryParams.offset || 0;
    var limit  = 10; // should come from config somewhere
    return (
      <div className="playlist">
        <PageHeader icon="beer" title="Free for Commercial Use" />
        <Paging offset={offset}
                length={this.props.model.playlist.length}
                limit ={limit}
                total ={this.props.model.total} />
        <Playlist model={this.props.model} />
      </div>
    );      
  },

});

free.model = function(params,queryParams) {
  var qparams = { lic: 'open', limit: queryParams.limit || 10  };
  if( 'offset' in queryParams && Number(queryParams.offset) > 0 ) {
    qparams.offset = queryParams.offset;
  }
  return query.playlistWithCount(qparams);
}

module.exports = free;

