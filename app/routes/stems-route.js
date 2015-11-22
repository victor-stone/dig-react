import React            from 'react';
import qc               from '../models/query-configs';
import Samples          from '../stores/samples';

import { mergeParams 
                     }  from '../unicorns';
import {  StemsBrowser,
          StemsQueryOptions,
          PageHeader }    from '../components';

var stems = React.createClass({

  render() {
    var store = this.props.store;

    
    return (
      <div>
        <StemsQueryOptions {...this.props} />
        <PageHeader icon="th" title="Samples" />
        <div className="container-fluid">
          <StemsBrowser store={store} />
        </div>
      </div>
    );      
  },

});

stems.title = 'Samples Browser';

stems.store = function(params,queryParams) {
  var qparams = mergeParams( {}, qc.samples, queryParams );
  return Samples.storeFromQuery(qparams);
};

module.exports = stems;

