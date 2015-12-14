import React            from 'react';
import qc               from '../../models/query-configs';
import Samples          from '../../stores/samples';
import { mergeParams }  from '../../unicorns';
import { stems }        from '../../components';

var browse = React.createClass({

  render() {
    var store = this.props.store;
    return (
      <div className="container-fluid">
        <stems.Browse store={store} />
      </div>
    );      
  },

});

browse.title = 'Samples Browser';

browse.store = function(params,queryParams) {
  var opts    = mergeParams( {type: 'any' }, qc.samples, qc.recent );
  var qparams = mergeParams( { }, opts, queryParams );
  return Samples.storeFromQuery(qparams,opts);
};

module.exports = browse;

