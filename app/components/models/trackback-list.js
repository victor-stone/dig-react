import React       from 'react';
import Trackback   from './trackback';
import UploadStore from '../../stores/upload'; // for MAX_TRACKBACK_FETCH should be in app/models

var TracbackList = React.createClass({

  render: function() {
    var trackbacks = this.props.model || [];
    var tooManyTBs = !this.props.showAll && trackbacks.length >= UploadStore.MAX_TRACKBACK_FETCH;

    var tbs = trackbacks.length 
      ? trackbacks.map( tb => (<Trackback model={tb} key={tb.id} className="list-group-item" />) ) 
      : (<li><span className="light-color">{"No trackbacks yet. Add yours!"}</span></li>);

    return (
        <ul className="list-group remix-list">
          {tbs}
          {tooManyTBs ? <li key="toomany"><span className="light-color">{"too many to show here!"}</span></li> : null}
        </ul>
      );

  },
});

module.exports = TracbackList;

