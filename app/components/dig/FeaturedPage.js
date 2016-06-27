import React        from 'react';
import Remixes      from '../Remixes';
import PageHeader   from '../vanilla/PageHeader';
import QueryOptions from './QueryOptions';
import SubNav       from './SubNav';

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

