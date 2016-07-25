import React        from 'react';
import Remixes      from './remixes';
import PageHeader   from '../vanilla/page-header';
import QueryOptions from './query-options';
import SubNav       from './sub-nav';

const FeaturedPage = React.createClass({

  render: function() {

    const { store, icon, title, subTitle = null } = this.props;

    return (
      <div className="playlist">
        <PageHeader icon={icon} title={title} subTitle={subTitle} />
        <Remixes store={store}>
          <QueryOptions store={store} />
        </Remixes>
        <Remixes.NotALotHere store={store} />
      </div>
    );
    
  },

});

FeaturedPage.subnav = SubNav;

module.exports = FeaturedPage;

