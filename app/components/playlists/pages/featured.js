import React         from 'react';
import Browse        from '../browse';

function Featured(props) {
  var store = props.store;
  return (        
    <div className="container-fluid playlist-featured-page">
      <Browse store={store} />
    </div>
  );
}


module.exports = Featured;