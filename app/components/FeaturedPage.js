'use strict';

import React      from 'react';
import DigRemixes from './DigRemixes';
import PageHeader from './PageHeader';
import Paging     from './Paging';


const FeaturedPage = React.createClass({

  render: function() {

    var store    = this.props.store;
    var icon     = this.props.icon;
    var title    = this.props.title;
    var subTitle = this.props.subTitle || null;

    return (
      <div className="playlist">
        <PageHeader icon={icon} title={title} subTitle={subTitle} />
        <Paging store={store} />
        <DigRemixes store={store} />
        <DigRemixes.NotALotHere store={store} />
      </div>
    );
    
  },

});

module.exports = FeaturedPage;

