import React              from 'react';
import qc                 from '../../models/query-configs';
import Acappellas         from '../../stores/acappellas';
import { mergeParams }    from '../../unicorns';
import { Browse }         from '../../components/pells';
import { Paging,
         SearchHeader,
         DidYouMean }     from '../../components';

function NoHits() {
  return(<div ></div>);
}

function search(props) {
  var store = props.store;
  return (<div>
            <SearchHeader store={store} />
            <DidYouMean store={store} artists><NoHits /></DidYouMean>
            <div className="container pells-page">
              <div className="row">
                <div className="col-md-2 pell-paging">
                  <Paging store={store} disableBumping />
                </div>
                <div className="col-md-7 pell-browser">
                  <div className="tab-content">
                    <Browse.PellsListing store={store} />
                  </div>
                </div>
                <div className="col-md-3">
                  <Browse.PellDetail store={store} />
                </div>
              </div>
            </div>
          </div>);
}

search.title = 'Search';

search.store = function(params,queryParams) {
  
  var opts     = mergeParams( {}, qc.pells );
  var qparams  = mergeParams( {}, opts, queryParams );

  return Acappellas.storeFromQuery(qparams, opts);
};

module.exports = search;

