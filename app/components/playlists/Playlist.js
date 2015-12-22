import React          from 'react';
import Paging         from '../Paging';
import Info           from './Info';
import EditableTitle  from './EditableTitle';
import EditableTracks from './EditableTracks';

var PlaylistPage = React.createClass({

  render: function() {
    var store = this.props.store;
    var model = store.model;

    return (
        <div className="container-fluid playlist-detail-page">
          <EditableTitle store={store} />
          <div className="row">
            <div className="col-md-3 col-md-offset-1">
              {model.head.isDynamic
                ? <Paging store={model.tracks} disableBumping />
                : null
              }
              <Info store={store} />
            </div>
            <div className="col-md-6">
              <EditableTracks store={store} />
            </div>
          </div>
        </div>
      );
  }
});

module.exports = PlaylistPage;

//