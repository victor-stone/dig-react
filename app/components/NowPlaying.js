import React      from 'react';
import PageHeader from './vanilla/PageHeader';
import Remixes    from './dig/Remixes';

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

