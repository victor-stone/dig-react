import React        from 'react';
import Remixes      from '../Remixes';
import PageHeader   from '../PageHeader';
import Paging       from '../Paging';
import QueryOptions from './QueryOptions';

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
        <Remixes store={store}>
          <QueryOptions store={store} />
        </Remixes>
        <Remixes.NotALotHere store={store} />
      </div>
    );
    
  },

});

module.exports = FeaturedPage;

