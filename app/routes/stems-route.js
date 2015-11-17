import React            from 'react';
import qc               from '../models/query-configs';
import Samples  from '../stores/samples';
import { mergeParams } from '../unicorns';

var stems = React.createClass({

  render() {
    //var store = this.props.store;
    return (
      <div className="container stems-page">
      <h1>{"yea, nothing here"}</h1>
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

