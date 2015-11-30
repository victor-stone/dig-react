import React            from 'react';
import StemsList        from './StemsList';
import Paging           from './Paging'; 
import ZIPContentViewer from './ZIPContentViewer';
import { SelectedTagSection,
       StemsTagList } from './StemsTags';

function StemsBrowser(props) {
    var store = props.store;

    return (
      <div className="stems-browser">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
              <SelectedTagSection store={store}  />
          </div>
        </div>
        <div className="row">
          <div  className="col-md-3">
            <StemsTagList store={store} />
          </div>
          <div className="col-md-6 stems-listing-widget">
            <Paging store={store} disableBumping />
            <StemsList store={store} />   
          </div>
          <div className="col-md-2">
            <ZIPContentViewer store={store} />
          </div>
        </div>
      </div>
    );
}

module.exports = StemsBrowser;

