import React from 'react';

import TrackbackList   from '../../models/trackback-list';

class Trackbacks extends React.Component
{
  render() {
    const { model:{trackbacks} } = this.props;
    
    return (
      <div>
        <div className="center-text">
          <h3 className="inlined">{"Trackbacks"}</h3>
        </div>
        <TrackbackList model={trackbacks} />
      </div>
    );
  }
}

module.exports = Trackbacks;

