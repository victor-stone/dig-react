import React      from 'react';
import PageHeader from './vanilla/page-header';
import Remixes    from './dig/remixes';

class NowPlaying extends React.Component
{
 render() {
    var store  = this.props.store;

    return  (
      <div>
        <PageHeader icon="music" title="Now Playing" />
        <Remixes store={store} />
      </div>
    );
  }

}

module.exports = NowPlaying;

