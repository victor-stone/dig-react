import React         from 'react';
import { DigDeep }   from '../../components';
import qc            from '../../models/query-configs';
import PlaylistStore from '../../stores/playlist';

import { mergeParams } from '../../unicorns';


var dig = React.createClass({

  render() {
    return (<DigDeep store={this.props.store}/>);
  }

});

dig.title = 'Dig Deep';

dig.path  = '/dig';

dig.store = function(params,queryParams) {
  var opts = mergeParams( { type: 'any' }, qc.remixes );
  var qparams = mergeParams( {}, opts, queryParams );
  return PlaylistStore.storeFromQuery(qparams, opts);
};

module.exports = dig;

