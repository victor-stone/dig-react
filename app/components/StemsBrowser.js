import React             from 'react';
import StemsList         from './StemsList';
import Paging            from './Paging'; 
import ZIPContentViewer  from './ZIPContentViewer';
import StemsQueryOptions from './StemsQueryOptions';

import { SelectedTagSection,
         StemsTagList }       from './StemsTags';

import { BoundingElement }    from '../mixins';

const StemsBrowserTools = React.createClass({

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
          <StemsQueryOptions store={store} />
          <ZIPContentViewer store={store} />
        </div>
      );    
  }

});

function StemsBrowser(props) {
    var store = props.store;

    return (
      <div className="stems-browser">
        <SelectedTagSection store={store} />
        <div className="content-fluid" >
          <div className="row stems-browser-widget">
            <div  className="col-md-3">
              <StemsTagList store={store} />
            </div>
            <div className="col-md-6 stems-listing-widget">
              <StemsList store={store} />   
            </div>
            <div className="col-md-2">
              <StemsBrowserTools store={store} />
            </div>
          </div>
        </div>
      </div>
    );
}

module.exports = StemsBrowser;

