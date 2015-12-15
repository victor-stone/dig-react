import React from 'react';

var index = React.createClass({
  render: function() {

    return (
      <div>
        <div className="playlists-img container">
          <div className="row">
            <div className="col-md-8 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-12">
              <h1>{"The 21st-century Indie Music Curation Project"}</h1>
              <h3>{"Sharing the love one playlist at time."}</h3>
            </div>
          </div>
        </div>      
      </div>
      );
  }

});

index.title = 'Home';

index.path = '/';

module.exports = index;
