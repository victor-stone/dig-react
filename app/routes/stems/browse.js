import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from '../../unicorns';
import Browse           from '../../components/stems/Browse';

var browse = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container-fluid">
        <Browse store={store} />
      </div>
    );      
  },

});

browse.title = 'Samples Browser';

browse.store = function(params,queryParams) {
  var opts    = mergeParams( {type: 'any' }, qc.samples, qc.latest );
  var qparams = mergeParams( { }, opts, queryParams );
  return Samples.storeFromQuery(qparams,opts);
};

module.exports = browse;

