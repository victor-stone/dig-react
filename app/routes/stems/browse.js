import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from '../../unicorns';
import { StemsBrowser } from '../../components';

var stems = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container-fluid">
        <StemsBrowser store={store} />
      </div>
    );      
  },

});

stems.title = 'Samples Browser';

stems.store = function(params,queryParams) {
  var qparams = mergeParams( { type: 'any' }, qc.samples, queryParams );
  return Samples.storeFromQuery(qparams,qc.samples);
};

module.exports = stems;

