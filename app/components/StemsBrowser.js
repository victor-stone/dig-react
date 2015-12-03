import React             from 'react';
import StemsList         from './StemsList';
import Paging            from './Paging'; 
import ZIPContentViewer  from './ZIPContentViewer';
import StemsQueryOptions from './StemsQueryOptions';

import { SelectedTagSection,
         StemsTagList }       from './StemsTags';

function StemsBrowser(props) {
    var store = props.store;

    return (
      <div className="stems-browser">
        <SelectedTagSection store={store}  />
        <div className="content-fluid" >
          <div className="row stems-browser-widget">
            <div  className="col-md-3">
              <div className="stems-tags-bumper"></div>
              <StemsTagList store={store} />
            </div>
            <div className="col-md-6 stems-listing-widget">
              <StemsList store={store} />   
            </div>
            <div className="col-md-2">
              <Paging store={store} disableBumping />
              <StemsQueryOptions store={store} />
              <ZIPContentViewer store={store} />
            </div>
          </div>
        </div>
      </div>
    );
}

module.exports = StemsBrowser;

