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
  var opts    = mergeParams( {type: 'any' }, qc.samples );
  var qparams = mergeParams( { }, opts, queryParams );
  return Samples.storeFromQuery(qparams,opts);
};

module.exports = stems;

