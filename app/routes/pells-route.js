import React            from 'react';
import qc               from '../models/query-configs';
import Acappellas       from '../stores/acappellas';

import {  QueryOptions,
          Paging  }       from '../components';
import { mergeParams }    from '../unicorns';

import {
          PellDetail,
          PellHeader,
          PellListing,
          PellTabs     } from '../components/PellsBrowser';

var pells = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container pells-page">
        <div className="filter-box-position">
          <QueryOptions store={store} />
        </div>
        <PellHeader store={store} />
        <div className="row">
          <div className="col-md-2 pell-paging">
            <Paging store={store} disableBumping />
          </div>
          <div className="col-md-7 pell-browser">
            <PellTabs store={store} />
            <div className="tab-content">
              <PellListing store={store} />
            </div>
          </div>
          <div className="col-md-3">
            <PellDetail store={store} />
          </div>
        </div>
      </div>
    );      
  },

});

pells.title = 'A Cappella Browser';

pells.path = '/pells';

pells.store = function(params,queryParams) {
  var featured = ('searchp' in queryParams) || ('u' in queryParams) ? {} : qc.pellsFeatured;
  var qparams = mergeParams( {}, qc.pells, queryParams, featured );
  return Acappellas.storeFromQuery(qparams);
};

module.exports = pells;

