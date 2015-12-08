import React      from 'react';
import Browse     from './Browse';
import PageHeader from '../PageHeader';
import Paging     from '../Paging';


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
        <Browse store={store} />
        <Browse.NotALotHere store={store} />
      </div>
    );
    
  },

});

module.exports = FeaturedPage;

