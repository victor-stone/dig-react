'use strict';

import React      from 'react';
import Playlist   from './Playlist';
import PageHeader from './PageHeader';
import Paging     from './Paging';


const FeaturedPage = React.createClass({

  render: function() {

    var model    = this.props.model;
    var offset   = this.props.queryParams.offset || 0;
    var limit    = this.props.queryParams.limit  || 10;
    var icon     = this.props.icon;
    var title    = this.props.title;
    var subTitle = this.props.subTitle || null;

    return (
      <div className="playlist">
        <PageHeader icon={icon} title={title} subTitle={subTitle} />
        <Paging offset={offset}
                length={model.playlist.length}
                limit ={limit}
                total ={model.total} />
        <Playlist model={model} />
      </div>
    );
    
  },

});

module.exports = FeaturedPage;

