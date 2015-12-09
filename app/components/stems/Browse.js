import React        from 'react';
import Listing      from './Listing'  ;
import Paging       from '../Paging'; 
import QueryOptions from './QueryOptions';

import { SelectedTagSection,
         TagsList }       from './Tags';

import { BoundingElement }    from '../../mixins';

const Tools = React.createClass({

  mixins: [ BoundingElement ],

  getDefaultProps: function() {
    return { 
        keepAbove: '.footer',
        keepBelow: '.selected-tags'
      };
  },
  
  render: function() {
    var store = this.props.store;

    return (
        <div className="stems-fixed-column">
          <Paging store={store} disableBumping />
          <QueryOptions store={store} />
        </div>
      );    
  }

});

function Stems(props) {
    var store = props.store;

    return (
      <div className="stems-browser">
        <SelectedTagSection store={store} />
        <div className="content-fluid" >
          <div className="row stems-browser-widget">
            <div  className="col-md-3">
              <TagsList store={store} />
            </div>
            <div className="col-md-6 stems-listing-widget">
              <Listing   store={store} />   
            </div>
            <div className="col-md-2">
              <Tools store={store} />
            </div>
          </div>
        </div>
      </div>
    );
}

module.exports = Stems;

